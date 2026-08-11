import mongoose from "mongoose";
import { generateOptions } from "../../helpers/mongooseHelper.js";
import Wishlist from "../../models/ecommerce/wishlist.schema.js";
import { adminsLogsHelper } from "../../helpers/adminsLogsHelper.js";

export const getAdminCustomerWishlist = async (req, res) => {
  try {
    const {  } = req.admin;
    const { id } = req.params;
    const query = {
      customer: new mongoose.Types.ObjectId(id),
    };
    const options = generateOptions(req);
    const wishlists = await Wishlist.paginate(query, options);
    res.status(200).json({
      status: "success",
      data: wishlists,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteAdminCustomerWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const {  } = req.admin;
    const query = { _id: id,  deletedAt: null };
    const deletedWishlists = await Wishlist.deleteOne(query);

    if (!deletedWishlists) {
      return res.status(404).json({
        status: "error",
        message: "Wishlists not found",
      });
    }
    await adminsLogsHelper(req, "Wishlists deleted successfully");
    return res.status(200).json({
      status: "success",
      message: "Wishlists deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const multiDeleteAdminCustomerWishlist = async (req, res) => {
  try {
    const {  } = req.admin;
    const ids = req.body;
    const query = {
      
      deletedAt: null,
      _id: { $in: ids },
    };
    const AllWishlists = await Wishlist.find(query);

    if (!AllWishlists.length > 0) {
      return res.status(404).json({
        status: "error",
        message: "Wishlists not found",
      });
    }
    await Wishlist.deleteMany(query);
    await adminsLogsHelper(req, "All Wishlists deleted successfully");
    return res.status(200).json({
      status: "success",
      message: "All Wishlists deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Frontend Controllers

export const getCustomerWishlist = async (req, res) => {
  try {
    const { _id,  } = req.customer;
    const query = {
      customer: _id,
    };
    const options = generateOptions(req);
    const wishlists = await Wishlist.paginate(query, options);
    res.status(200).json({
      status: "success",
      data: wishlists,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { _id } = req.customer;
    const { item, varient_id } = req.body;

    const payload = {
      customer: _id,
      item,
      varient_id: varient_id && varient_id !== "" ? varient_id : null,
    };

    const isExist = await Wishlist.findOne(payload);

    if (isExist) {
      return res.status(400).json({
        status: "error",
        message: "Item already in wishlist",
      });
    }

    await Wishlist.create(payload);
    res.status(201).json({
      status: "success",
      message: "Item added to wishlist successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { _id,  } = req.customer;
    const { id } = req.params;
    const payload = {
      _id: new mongoose.Types.ObjectId(id),
      customer: new mongoose.Types.ObjectId(_id),
      
    };

    const isExist = await Wishlist.findOne(payload);
    if (!isExist) {
      return res.status(404).json({
        status: "error",
        message: "Item not found in wishlist",
      });
    }
    await Wishlist.deleteOne(payload);
    res.status(200).json({
      status: "success",
      message: "Item removed from wishlist successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
export const toggleWishlist = async (req, res) => {
  try {
    const { _id } = req.customer;
    const { item, varient_id } = req.body;

    const payload = {
      customer: _id,
      item,
      varient_id: varient_id && varient_id !== "" ? varient_id : null,
    };

    const isExist = await Wishlist.findOne(payload);

    if (isExist) {
      await Wishlist.deleteOne({ _id: isExist._id });
      return res.status(200).json({
        status: "success",
        message: "Item removed from wishlist successfully",
        action: "removed",
      });
    }

    await Wishlist.create(payload);
    res.status(201).json({
      status: "success",
      message: "Item added to wishlist successfully",
      action: "added",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
