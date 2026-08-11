import mongoose from "mongoose";
import { adminsLogsHelper } from "../../helpers/adminsLogsHelper.js";

import {
  generateOptions,
  GenerateSearchQuery,
} from "../../helpers/mongooseHelper.js";
import { slugGenerator } from "../../helpers/slugGenerator.js";
import Coupan from "../../models/ecommerce/coupan.schema.js";
import CoupanClaim from "../../models/ecommerce/couponClaim.js";
import Cart from "../../models/ecommerce/cart.schema.js";
import Order from "../../models/ecommerce/order.schema.js";

export const getCoupan = async (req, res) => {
  try {
    const { _id } = req.admin;
    const query = GenerateSearchQuery(req, {
      admin: _id,

      deletedAt: null,
    });
    const options = generateOptions(req);
    const coupan = await Coupan.paginate(query, {
      ...options,
      sort: { createdAt: -1 },
    });

    return res.status(200).json({
      status: "success",
      message: "fetch Coupan successfully",
      data: coupan,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getTrashCoupan = async (req, res) => {
  try {
    const { _id } = req.admin;
    const query = { admin: _id, deletedAt: { $ne: null } };
    const options = generateOptions(req);
    const Coupans = await Coupan.paginate(query, options);

    return res.status(200).json({
      status: "success",
      message: "fetch Trash Coupans successfully",
      data: Coupans,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getCoupanById = async (req, res) => {
  try {
    const { _id } = req.admin;
    const { id } = req.params;
    const query = { _id: id, admin: _id, deletedAt: null };

    const Coupans = await Coupan.findOne(query);

    return res.status(200).json({
      status: "success",
      message: "fetch Coupans successfully",
      data: Coupans,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const createCoupan = async (req, res) => {
  try {
    const { _id } = req.admin;
    const data = req.body;
    const slug = await slugGenerator(data.name, Coupan);
    const items = data?.items?.map((item) => item.value);
    const categories = data?.categories.map((cat) => cat.id);

    const payload = {
      ...data,
      slug,
      admin: _id,
      items: items || null,
      categories: categories || null,
    };

    const coupan = await Coupan.create(payload);
    await adminsLogsHelper(req, "Coupan create successfully");
    return res.status(201).json({
      status: "success",
      message: "Coupan create successfully",
      data: coupan,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateCoupan = async (req, res) => {
  try {
    const { _id } = req.admin;
    const { id } = req.params;
    let payload = req.body;
    const items = payload?.items?.map((item) => item.value);
    const categories = payload?.categories.map((cat) => cat.id);
    payload.items = items || null;
    payload.categories = categories || null;
    const query = {
      _id: id,
      admin: _id,
    };

    const response = await Coupan.findOneAndUpdate(query, payload);
    await adminsLogsHelper(req, "Coupan updated successfully");
    if (response) {
      return res.status(200).json({
        status: "success",
        message: "update successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteCoupan = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.admin;
    const query = { _id: id, admin: _id, deletedAt: null };
    const deleteCoupan = await Coupan.deleteOne(query);

    if (!deleteCoupan) {
      return res.status(404).json({
        status: "error",
        message: "Coupan not found",
      });
    }
    await adminsLogsHelper(req, "Coupan deleted successfully");
    return res.status(200).json({
      status: "success",
      message: "Coupan deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const multiDeleteCoupan = async (req, res) => {
  try {
    const { _id } = req.admin;
    const ids = req.body;
    const query = {
      admin: _id,
      deletedAt: null,
      _id: { $in: ids },
    };
    const AllCoupan = await Coupan.find(query);

    if (!AllCoupan.length > 0) {
      return res.status(404).json({
        status: "error",
        message: "Coupan not found",
      });
    }

    await Coupan.deleteMany(query);
    await adminsLogsHelper(req, "All Coupan deleted successfully");
    return res.status(200).json({
      status: "success",
      message: "All Coupan deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Admin customer
export const adminCustomerclaimCoupan = async (req, res) => {
  try {
    const { id } = req.params;
    const {} = req.admin;
    const query = {
      customer: new mongoose.Types.ObjectId(id),
      deletedAt: null,
    };

    const options = generateOptions(req);
    const response = await CoupanClaim.paginate(query, options);
    return res.status(200).json({
      status: "success",
      message: "fetch all customer claim coupan",
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

// Frontend APIs

export const getAllCoupan = async (req, res) => {
  try {
    const query = {
      deletedAt: null,
    };

    const options = generateOptions(req);
    const response = await Coupan.paginate(query, {
      ...options,
      sort: { createdAt: -1 },
    });
    return res.status(200).json({
      status: "success",
      message: "fetch all public coupan",
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

export const getCustomerCoupan = async (req, res) => {
  try {
    const { _id } = req.customer;
    const query = {
      customer: _id,
      deletedAt: null,
    };

    const options = generateOptions(req);
    const response = await CoupanClaim.paginate(query, {
      ...options,
      sort: { createdAt: -1 },
    });
    return res.status(200).json({
      status: "success",
      message: "fetch user coupan",
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

export const claimCoupan = async (req, res) => {
  try {
    const { couponCode, coupanId } = req.body;
    const { _id } = req.customer;

    await CoupanClaim.create({
      coupanId: coupanId,
      couponCode: couponCode,
      customer: _id,
    });
    return res.status(200).json({
      status: "success",
      message: "Coupon claimed successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// export const verifyCoupon = async (req, res) => {
//   try {
//     const { couponCode } = req.body;
//     // const { _id } = req.customer;

//     const coupon = await CoupanClaim.findOne({
//       couponCode: couponCode,
//       deletedAt: null,
//     });

//     if (!coupon) {
//       return res.status(400).json({
//         status: false,
//         message: "Invalid coupon code",
//       });
//     }

//     if (coupon?.one_time) {
//       const orders = await Order.find({
//         customer: new mongoose.Types.ObjectId("6945fa14ba3f1cfc95b588fa"),
//         status: { $ne: "unpaid" },
//       });

//       if (orders.length > 0) {
//         return res.status(400).json({
//           message: "This coupon is only for first-time users",
//         });
//       }
//     }

//     const now = new Date();
//     if (now < coupon.start_date || now > coupon.end_date) {
//       return res.status(400).json({
//         status: false,
//         message: "Coupon expired or inactive",
//       });
//     }

//     const cartAmount = await Cart.aggregate([
//       {
//         $match: {
//           customer: new mongoose.Types.ObjectId("6945fa14ba3f1cfc95b588fa"),
//           deletedAt: null,
//         },
//       },
//       {
//         $addFields: {
//           itemTotal: { $multiply: ["$price", "$quantity"] },
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           totalAmount: { $sum: "$itemTotal" },
//         },
//       },
//     ]);

//     const totalAmount = cartAmount[0]?.totalAmount || 0;

//     if (totalAmount === 0) {
//       return res.status(400).json({
//         status: false,
//         message: "Cart is empty",
//       });
//     }

//     if (coupon.min_amount && totalAmount < coupon.min_amount) {
//       return res.status(400).json({
//         status: false,
//         message: `Minimum cart value should be ₹${coupon.min_amount}`,
//       });
//     }

//     let discountAmount = 0;

//     if (coupon.discount_type === "percentage") {
//       discountAmount = (totalAmount * coupon.max_amount) / 100;
//     }

//     if (coupon.discount_type === "fixed") {
//       discountAmount = coupon.max_amount;
//     }

//     const finalAmount = Math.max(totalAmount - discountAmount, 0);

//     return res.json({
//       status: true,
//       message: "Coupon applied successfully",
//       data: {
//         couponCode: coupon.code,
//         discountType: coupon.discount_type,
//         discountAmount,
//         cartTotal: totalAmount,
//         finalAmount,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: false,
//       message: "Internal server error",
//     });
//   }
// };

export const verifyCoupon = async (req, res) => {
  try {
    const { couponCode } = req.body;
    const customerId = new mongoose.Types.ObjectId(
      req.customer?._id || "6945fa14ba3f1cfc95b588fa"
    );

    /* ------------------------------------
       1️⃣ Find coupon claim
    ------------------------------------ */
    const couponClaim = await CoupanClaim.findOne({
      couponCode,
      customer: customerId,
      deletedAt: null,
    });

    if (!couponClaim) {
      return res.status(400).json({
        status: "error",
        message: "Invalid coupon code",
      });
    }

    const coupon = couponClaim.coupanId;

    /* ------------------------------------
       2️⃣ One-time coupon check
    ------------------------------------ */
    if (coupon.one_time) {
      const orderCount = await Order.countDocuments({
        customer: customerId,
        status: { $ne: "unpaid" },
      });

      if (orderCount > 0) {
        return res.status(400).json({
          status: "error",
          message: "This coupon is only for first-time users",
        });
      }
    }

    /* ------------------------------------
       3️⃣ Date validation
    ------------------------------------ */
    const now = new Date();
    if (now < coupon.start_date || now > coupon.end_date) {
      return res.status(400).json({
        status: "error",
        message: "Coupon expired or inactive",
      });
    }

    /* ------------------------------------
       4️⃣ Fetch cart items
    ------------------------------------ */
    const cartItems = await Cart.aggregate([
      {
        $match: {
          customer: customerId,
          deletedAt: null,
        },
      },
      {
        $lookup: {
          from: "items",
          localField: "itemId",
          foreignField: "_id",
          as: "item",
        },
      },
      { $unwind: "$item" },
      {
        $addFields: {
          itemTotal: { $multiply: ["$price", "$quantity"] },
        },
      },
    ]);

    console.log("cartItems", cartItems);

    if (!cartItems.length) {
      return res.status(400).json({
        status: "error",
        message: "Cart is empty",
      });
    }

    /* ------------------------------------
       5️⃣ Cart total
    ------------------------------------ */
    const cartTotal = cartItems.reduce((sum, i) => sum + i.itemTotal, 0);

    if (coupon.min_amount && cartTotal < coupon.min_amount) {
      return res.status(400).json({
        status: "error",
        message: `Minimum cart value should be ₹${coupon.min_amount}`,
      });
    }

    /* ------------------------------------
       6️⃣ Calculate eligible amount
    ------------------------------------ */
    let eligibleAmount = 0;

    // 🟢 CART LEVEL
    if (coupon.type === "cart") {
      eligibleAmount = cartTotal;
    }

    // 🟢 CATEGORY LEVEL
    if (coupon.type === "category") {
      cartItems.forEach((item) => {
        const itemCategories = item.item.categories || [];
        const hasMatchingCategory = itemCategories.some(
          (itemCatId) => coupon.categories.some(
            (couponCat) => couponCat._id.toString() === itemCatId.toString()
          )
        );
        if (hasMatchingCategory) {
          eligibleAmount += item.itemTotal;
        }
      });
    }

    // 🟢 PRODUCT / ITEM LEVEL
    if (coupon.type === "product") {
      cartItems.forEach((item) => {
        if (
          coupon.items.some(
            (p) => p._id.toString() === item.item._id.toString()
          )
        ) {
          eligibleAmount += item.itemTotal;
        }
      });
    }

    if (eligibleAmount === 0) {
      return res.status(400).json({
        status: "error",
        message: "Coupon not applicable on selected items",
      });
    }

    /* ------------------------------------
       7️⃣ Discount calculation
    ------------------------------------ */
    let discountAmount = 0;

    if (coupon.discount_type === "percentage") {
      discountAmount = (eligibleAmount * coupon.max_amount) / 100;
    }

    if (coupon.discount_type === "fixed") {
      discountAmount = coupon.max_amount;
    }

    discountAmount = Math.min(discountAmount, eligibleAmount);

    /* ------------------------------------
       8️⃣ Final amount
    ------------------------------------ */
    const finalAmount = cartTotal - discountAmount;

    return res.json({
      status: "success",
      message: "Coupon applied successfully",
      data: {
        couponCode: coupon.code,
        couponType: coupon.type,
        discountType: coupon.discount_type,
        cartTotal,
        eligibleAmount,
        discountAmount,
        finalAmount,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
