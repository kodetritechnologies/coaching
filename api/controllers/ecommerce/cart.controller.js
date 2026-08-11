import mongoose from "mongoose";
import Cart from "../../models/ecommerce/cart.schema.js";
import { generateOptions } from "../../helpers/mongooseHelper.js";

// Frontend Controller

export const getCustomerCart = async (req, res) => {
  try {
    const { _id } = req.customer;
    const query = {
      customer: new mongoose.Types.ObjectId(_id),
      deletedAt: null,
    };

    const items = await Cart.find(query);
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return res.status(200).json({
      status: "success",
      message: "Customer cart fetched successfully",
      data: [
        {
          items,
          totalAmount,
        }
      ],
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const addTocartCustomer = async (req, res) => {
  try {
    const { _id } = req.customer;
    const body = req.body;

    const payload = {
      customer: _id,
      itemId: body.itemId,
      variantId: body.variantId || null,
      price: body.price,
      quantity: body.quantity,
    };

    const alreadyExists = await Cart.findOne({
      customer: _id,
      itemId: body.itemId,
      variantId: body.variantId || null,
      deletedAt: null,
    });

    if (alreadyExists) {
      const addedQuantity = Number(body.quantity) || 1;
      await Cart.updateOne(
        { _id: alreadyExists._id },
        { $inc: { quantity: addedQuantity } }
      );
      return res.status(200).json({
        status: "success",
        message: "Item quantity updated in cart successfully",
      });
    }

    await Cart.create(payload);
    return res.status(201).json({
      status: "success",
      message: "Item added to cart successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateCartCustomer = async (req, res) => {
  try {
    const { _id } = req.customer;
    const { id } = req.params;
    const { quantity } = req.body;

    const query = {
      _id: id,
      customer: _id,
      deletedAt: null,
    };

    const cart = await Cart.findOne(query);
    if (!cart) {
      return res.status(404).json({
        status: "error",
        message: "Cart item not found",
      });
    }

    if (cart.quantity + quantity < 1) {
      return res.status(400).json({
        status: "error",
        message: "Quantity cannot be less than 1",
      });
    }

    await Cart.updateOne(query, {
      $inc: { quantity },
    });

    return res.status(200).json({
      status: "success",
      message: "Cart updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const removeToCartCustomer = async (req, res) => {
  try {
    const { _id } = req.customer;
    const { id } = req.params;
    const query = {
      _id: id,
      customer: _id,
    };

    await Cart.deleteOne(query);
    return res.status(201).json({
      status: "success",
      message: "Item removed from cart successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// admin

export const getAllAdminCustomerCart = async (req, res) => {
  try {
    const { id } = req.params;
    const query = {
      customer: id,
      deletedAt: null,
    };

    const options = generateOptions(req);
    const response = await Cart.paginate(query, options);
    return res.status(200).json({
      status: "success",
      message: "Customer cart fetched successfully",
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
