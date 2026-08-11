import mongoose from "mongoose";
import crypto from "crypto";
import Store from "../../models/configuration/setting/store.schema.js";
import Cart from "../../models/ecommerce/cart.schema.js";
import Order from "../../models/ecommerce/order.schema.js";
import Payment from "../../models/configuration/setting/payment.schema.js";
import CoupanClaim from "../../models/ecommerce/couponClaim.js";
import Currency from "../../models/configuration/setting/currency.schema.js";
import { generateOptions } from "../../helpers/mongooseHelper.js";

export const getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await Payment.find({ status: "active" }).select("-key_secret").lean();
    
    // Check if COD is enabled in global Store configurations
    const codConfig = await Store.findOne({ type: "cod" }).lean();
    const isCodEnabled = codConfig ? (codConfig.value && codConfig.value.cod === true) : true;
    
    const hasCOD = paymentMethods.some(
      (m) => m.gatway && m.gatway.toLowerCase() === "cod"
    );
    
    // Only inject COD fallback if not already in paymentMethods and cod is enabled in global Store settings
    if (!hasCOD && isCodEnabled) {
      paymentMethods.push({
        _id: "cod_fallback_id",
        gatway: "COD",
        status: "active",
      });
    }

    return res.status(200).json({
      status: "success",
      data: paymentMethods,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};


export const placeOrder = async (req, res) => {
  try {
    const customerId = req.query.customerId || req.body.customerId || "6945fa14ba3f1cfc95b588fa";

    let customerObjectId;
    if (mongoose.Types.ObjectId.isValid(customerId)) {
      customerObjectId = new mongoose.Types.ObjectId(customerId);
    } else {
      customerObjectId = new mongoose.Types.ObjectId("6945fa14ba3f1cfc95b588fa");
    }

    const shippingData = Store.findOne({ type: "shipping" });
    const taxData = Store.findOne({ type: "tax" });
    const cartData = Cart.find({ customer: customerObjectId, deletedAt: null });

    const [shipping, tax, cartItems] = await Promise.all([
      shippingData,
      taxData,
      cartData,
    ]);

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Your cart is empty. Please add items to your cart first.",
      });
    }

    const { transactionId, paymentGateway, addressId, couponCode } = req.body;

    if (paymentGateway?.toUpperCase() === "COD") {
      const codConfig = await Store.findOne({ type: "cod" }).lean();
      const isCodEnabled = codConfig ? (codConfig.value && codConfig.value.cod === true) : true;
      if (!isCodEnabled) {
        return res.status(400).json({
          status: "error",
          message: "Cash on Delivery is currently disabled.",
        });
      }
    }

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxRate = tax?.value?.tax ? Number(tax.value.tax) : 0;
    const shippingCost = shipping?.value?.shipping ? Number(shipping.value.shipping) : 0;

    let discountAmount = 0;
    let couponClaim = null;
    if (couponCode) {
      couponClaim = await CoupanClaim.findOne({
        couponCode,
        customer: customerObjectId,
        deletedAt: null,
      }).populate("coupanId");

      if (couponClaim && couponClaim.coupanId) {
        const coupon = couponClaim.coupanId;
        const now = new Date();
        if (now >= coupon.start_date && now <= coupon.end_date) {
          if (!coupon.min_amount || subtotal >= coupon.min_amount) {
            let eligibleAmount = 0;
            if (coupon.type === "cart") {
              eligibleAmount = subtotal;
            } else if (coupon.type === "category") {
              for (const item of cartItems) {
                const itemDoc = await mongoose.model("Item").findById(item.itemId);
                const itemCategories = itemDoc?.categories || [];
                const hasMatchingCategory = itemCategories.some(
                  (itemCatId) => coupon.categories.some(
                    (couponCat) => couponCat.toString() === itemCatId.toString()
                  )
                );
                if (hasMatchingCategory) {
                  eligibleAmount += item.price * item.quantity;
                }
              }
            } else if (coupon.type === "product") {
              for (const item of cartItems) {
                if (coupon.items.some((p) => p.toString() === item.itemId.toString())) {
                  eligibleAmount += item.price * item.quantity;
                }
              }
            }

            if (eligibleAmount > 0) {
              if (coupon.discount_type === "percentage") {
                discountAmount = (eligibleAmount * coupon.max_amount) / 100;
              } else if (coupon.discount_type === "fixed") {
                discountAmount = coupon.max_amount;
              }
              discountAmount = Math.min(discountAmount, eligibleAmount);
            }
          }
        }
      }
    }

    const finalSubtotal = subtotal - discountAmount;
    const taxAmount = (finalSubtotal * taxRate) / 100;
    const total = finalSubtotal + taxAmount + shippingCost;

    // Fetch the default currency from the DB
    const defaultCurrency = await Currency.findOne({ is_default: true, deletedAt: null }).lean();
    const currency_Symbol = defaultCurrency?.symbol || process.env.CURRENCY_SYMBOL || "₹";
    const currency_code = defaultCurrency?.code || process.env.CURRENCY_CODE || "INR";

    // Generate a unique order number
    const order_no = "ORD-" + Math.floor(100000 + Math.random() * 900000);

    const defaultOrderStatus = await mongoose.model("Status").findOne({ name: { $regex: /^pending$/i }, type: { $regex: /order/i }, deletedAt: null });
    // Use the ID directly instead of a string query
    const paymentStatusId = transactionId 
      ? (process.env.PAYMENT_PAID || "6a12c05c82ba8b7eb5af74af") 
      : (process.env.PAYMENT_UNPAID || "6a12c06782ba8b7eb5af74b6");

    const orderPayload = {
      order_no,
      currency: defaultCurrency ? defaultCurrency._id : null,
      subtotal,
      tax: taxRate,
      shipping: shippingCost,
      total,
      coupan: couponClaim ? couponClaim.coupanId._id : undefined,
      discountAmount,
      order_status: defaultOrderStatus ? defaultOrderStatus._id : null,
      payment_status: paymentStatusId,
      paymentGatway: paymentGateway || "direct",
      transiction_id: transactionId || null,
      customer: customerObjectId,
      items: cartItems.map(item => item.itemId),
      address: addressId || undefined,
    };


    // Create the order in the database
    const newOrder = await Order.create(orderPayload);
    await newOrder.populate("currency");

    // Clear the cart for this customer (hard delete)
    await Cart.deleteMany({ customer: customerObjectId });

    return res.status(200).json({
      status: "success",
      message: "Order placed successfully!",
      data: newOrder,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to place order",
      error: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { orderId, transactionId, paymentGateway } = req.body;
    if (!orderId || !transactionId) {
      return res.status(400).json({
        status: "error",
        message: "orderId and transactionId are required.",
      });
    }
    const paidPaymentStatus = await mongoose.model("Status").findOne({ name: { $regex: /^paid$/i }, type: { $regex: /payment/i }, deletedAt: null });

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        payment_status: paidPaymentStatus ? paidPaymentStatus._id : null,
        transiction_id: transactionId,
        paymentGatway: paymentGateway || "razorpay"
      },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({
        status: "error",
        message: "Order not found.",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Payment verified and order updated successfully!",
      data: updatedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to verify payment",
      error: error.message,
    });
  }
};

export const razorpayWebhook = async (req, res) => {
  try {
    const signature = req.headers["x-razorpay-signature"];
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (webhookSecret && signature) {
      const bodyStr = JSON.stringify(req.body);
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(bodyStr)
        .digest("hex");

      if (expectedSignature !== signature) {
        console.error("Razorpay webhook signature verification failed.");
        return res.status(400).json({
          status: "error",
          message: "Invalid webhook signature",
        });
      }
    }

    const event = req.body.event;
    console.log(`Received payment webhook event: ${event}`);

    if (event === "payment.captured") {
      const paymentEntity = req.body.payload?.payment?.entity;
      if (paymentEntity) {
        const transactionId = paymentEntity.id;
        const orderNo = paymentEntity.notes?.order_no;
        const orderId = paymentEntity.notes?.order_id;
        
        console.log(`Payment captured. Txn ID: ${transactionId}, Order No: ${orderNo}, Order ID: ${orderId}`);

        let order = null;
        if (orderId && mongoose.Types.ObjectId.isValid(orderId)) {
          order = await Order.findById(orderId);
        }
        if (!order && orderNo) {
          order = await Order.findOne({ order_no: orderNo });
        }

        if (order) {
          const paidPaymentStatus = await mongoose.model("Status").findOne({ name: { $regex: /^paid$/i }, type: { $regex: /payment/i }, deletedAt: null });
          if (order.payment_status?.name?.toLowerCase() !== "paid") {
            order.payment_status = paidPaymentStatus ? paidPaymentStatus._id : null;
            order.transiction_id = transactionId;
            order.paymentGatway = "razorpay";
            await order.save();
            console.log(`Order ${order.order_no} status updated to Paid via webhook.`);
          } else {
            console.log(`Order ${order.order_no} was already Paid.`);
          }
        } else {
          console.warn(`No matching order found for Order ID: ${orderId} / Order No: ${orderNo}`);
        }
      }
    }

    return res.status(200).json({
      status: "success",
      message: "Webhook event processed",
    });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return res.status(500).json({
      status: "error",
      message: "Webhook processing failed",
      error: error.message,
    });
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "error",
        message: "A valid order ID is required.",
      });
    }

    const order = await Order.findById(id)
      .populate("address")
      .populate("customer")
      .populate({
        path: "items",
        populate: [
          { path: "featured_image", model: "File" },
          { path: "gallery", model: "File" }
        ]
      });

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Order not found.",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Order details fetched successfully",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getPublicStoreSettings = async (req, res) => {
  try {
    const [shipping, tax] = await Promise.all([
      Store.findOne({ type: "shipping" }),
      Store.findOne({ type: "tax" }),
    ]);

    return res.status(200).json({
      status: "success",
      message: "Store settings fetched successfully",
      data: {
        shipping: shipping?.value?.shipping ? Number(shipping.value.shipping) : 0,
        tax: tax?.value?.tax ? Number(tax.value.tax) : 0,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getCustomerOrders = async (req, res) => {
  try {
    const { _id } = req.customer;
    const options = generateOptions(req);
    options.sort = { createdAt: -1 };
    options.populate = [
      { path: "currency" },
      { path: "order_status" },
      { path: "payment_status" },
      { 
        path: "items", 
        populate: { path: "featured_image", model: "File" } 
      }
    ];
    
    const query = { customer: _id, deletedAt: null };
    const response = await Order.paginate(query, options);

    return res.status(200).json({
      status: "success",
      message: "Customer orders fetched successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

