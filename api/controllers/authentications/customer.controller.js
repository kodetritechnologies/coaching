import { adminsLogsHelper } from "../../helpers/adminsLogsHelper.js";
import { fileUploads } from "../../helpers/fileUploads.js";

import { generateHashPassword } from "../../helpers/hashPassword.js";
import { generateToken } from "../../helpers/JWT.js";
import {
  generateOptions,
  GenerateSearchQuery,
} from "../../helpers/mongooseHelper.js";
import Customer from "../../models/authentications/customer.schema.js";
import File from "../../models/file.schema.js";
import Order from "../../models/ecommerce/order.schema.js";
import Wishlist from "../../models/ecommerce/wishlist.schema.js";
import SupportTicket from "../../models/support/support-ticket.schema.js";
import Review from "../../models/ecommerce/review.schema.js";
import Cart from "../../models/ecommerce/cart.schema.js";

export const customerSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ status: "error", message: "Email is required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ status: "error", message: "Password is required" });
    }

    const isExistCustomer = await Customer.findOne({ email: email });
    if (isExistCustomer) {
      return res
        .status(409)
        .json({ status: "error", message: "Email is already registered" });
    }

    await Customer.create({ name, email, password });

    return res
      .status(201)
      .json({ status: "success", message: "Customer Signup successfully" });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const customerLogin = async (req, res) => {
  try {
    const { email, password, remember_me } = req.body;
    const isExistCustomer = await Customer.findOne({ email });

    if (!isExistCustomer) {
      return res.status(404).json({
        status: "error",
        message: "Customer with this email address was not found",
      });
    }

    const isMatch = await isExistCustomer.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid password. Please try again",
      });
    }

    const checkPermition = await Customer.findOne({
      email,
      deletedAt: null,
    });
    if (!checkPermition) {
      return res.status(403).json({
        status: "error",
        message: `Customer is ${isExistCustomer?.status} by Admin`,
      });
    }

    const payload = {
      _id: isExistCustomer._id,
      name: isExistCustomer.name,
      email: isExistCustomer.email,
      mobile: isExistCustomer.mobile,
      profileImage: isExistCustomer.profileImage || "",
    };

    const token = generateToken(payload);

    if (remember_me || remember_me == undefined) {
      res.cookie("customerAccessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
    } else {
      res.cookie("customerAccessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
    }

    await adminsLogsHelper(req, "Customer logged in successfully");

    // Sync Cart Data if provided
    const { cartData } = req.body;
    if (cartData && Array.isArray(cartData)) {
      for (const item of cartData) {
        try {
          const query = {
            customer: isExistCustomer._id,
            itemId: item.itemId,
            variantId: item.variantId || null,
          };

          const update = {
            $inc: { quantity: item.quantity || 1 },
            $setOnInsert: { price: item.price },
          };

          await Cart.findOneAndUpdate(query, update, { upsert: true });
        } catch (syncError) {
          console.error("Cart sync error:", syncError);
          // We don't want to fail the login if cart sync fails, 
          // but we could log it.
        }
      }
    }

    return res.status(200).json({
      status: "success",
      message: "Customer logged in successfully",
      data: isExistCustomer,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Something went wrong on the server",
      error: error.message,
    });
  }
};

export const CustomerUpdate = async (req, res) => {
  try {
    const data = req.body;
    const { _id } = req.customer;

    let isExistCustomer = await Customer.findOne({ _id: _id });

    if (data?.featured_image && typeof data.featured_image === "object") {
      data.featured_image = data.featured_image._id;
    } else if (data?.featured_image) {
      data.featured_image = data.featured_image;
    } else if (
      req?.files?.featured_image &&
      req.files.featured_image.length > 0
    ) {
      const image = await fileUploads(req);
      data.featured_image = image?.featured_image?._id;
    } else {
      await File.deleteOne({ _id: isExistCustomer?.featured_image });
      data.featured_image = null;
    }

    const response = await Customer.findByIdAndUpdate(
      { _id: _id },
      { ...data },
    );
    if (!response) {
      return res
        .status(404)
        .json({ status: "error", message: "Customer not found" });
    }
    return res
      .status(200)
      .json({ status: "success", message: "Profile updated successfully" });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const getCustomerProfile = async (req, res) => {
  try {
    const { _id } = req.customer;

    const result = await Customer.findById(_id).select(" -password");
    if (!result) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "User profile get successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Something went wrong on the server",
      error: error.message,
    });
  }
};

export const customerLogOut = async (req, res) => {
  try {
    const customerAccessToken = req.cookies?.customerAccessToken;

    if (!customerAccessToken) {
      return res
        .status(401)
        .json({ status: "error", message: "No active session found" });
    }

    res.clearCookie("customerAccessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res
      .status(200)
      .json({ status: "success", message: "Customer logged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};


export const adminCustomerCreate = async (req, res) => {
  try {
    const { name, email, password, featured_image } = req.body;
    const { _id } = req.admin;

    if (!name) {
      return res
        .status(400)
        .json({ status: "error", message: "Name is required" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ status: "error", message: "Email is required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ status: "error", message: "Password is required" });
    }

    const isExistAdminCustomer = await Customer.findOne({ email: email });
    if (isExistAdminCustomer) {
      return res
        .status(409)
        .json({ status: "error", message: "Email is already registered" });
    }

    if (featured_image == null) {
      delete req.body.featured_image;
    } else if (req.files.featured_image[0]) {
      const image = await fileUploads(req);
      req.body.featured_image = image?.featured_image?._id;
    } else {
      req.body.featured_image = null;
    }

    const result = await Customer.create({
      ...req.body,
      admin: _id,
    });

    return res.status(201).json({
      status: "success",
      message: "Customer created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAdminCustomers = async (req, res) => {
  try {
    const query = GenerateSearchQuery(req, {
      deletedAt: null,
    });
    const options = generateOptions(req);
    const response = await Customer.paginate(query, options);
    if (!response) {
      return res
        .status(404)
        .json({ status: "error", message: "Customers not found" });
    }
    return res.status(200).json({
      status: "success",
      message: "Customers fetched successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const getAdminCustomersTrash = async (req, res) => {
  try {
    const query = GenerateSearchQuery(req, {
      deletedAt: { $ne: null },
    });
    const options = generateOptions(req);
    const response = await Customer.paginate(query, options);
    if (!response) {
      return res
        .status(404)
        .json({ status: "error", message: "Customers not found" });
    }
    return res.status(200).json({
      status: "success",
      message: "Customers fetched successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const getAdminCustomerById = async (req, res) => {
  try {
    const { _id } = req.admin;
    const { id } = req.params;
    const query = {
      _id: id,
      $or: [{ admin: _id }],
      deletedAt: null,
    };
    const response = await Customer.findOne(query);
    if (!response) {
      return res
        .status(404)
        .json({ status: "error", message: "Customer not found" });
    }
    return res.status(200).json({
      status: "success",
      message: "Customer fetched successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const adminCustomerUpdate = async (req, res) => {
  try {
    let data = req.body;
    const { id } = req.params;
    let isExistCustomer = await Customer.findOne({ _id: id });
    const isMatch = data.password === isExistCustomer?.password;

    if (!isMatch) {
      data.password = await generateHashPassword(data.password);
    } else {
      delete data?.password;
    }

    if (data?.featured_image && typeof data.featured_image === "object") {
      data.featured_image = data.featured_image._id;
    } else if (
      req?.files?.featured_image &&
      req.files.featured_image.length > 0
    ) {
      const image = await fileUploads(req);
      data.featured_image = image?.featured_image?._id;
    } else {
      await File.deleteOne({ _id: isExistCustomer?.featured_image });
      data.featured_image = null;
    }

    const response = await Customer.findByIdAndUpdate({ _id: id }, { ...data });
    if (!response) {
      return res
        .status(404)
        .json({ status: "error", message: "Customer not found" });
    }
    return res
      .status(200)
      .json({ status: "success", message: "Customer updated successfully" });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const adminCustomerDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Customer.findByIdAndUpdate(id, {
      $set: {
        pendingDelete: true,
      },
    });

    if (!response) {
      return res
        .status(404)
        .json({ status: "error", message: "Customer not found" });
    }

    return res
      .status(200)
      .json({ status: "success", message: "Customer deleted successfully" });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const adminCustomerMultiDelete = async (req, res) => {
  try {
    const { _id } = req.admin;
    const ids = req.body;
    const query = {
      $or: [{ admin: _id }],
      deletedAt: { $ne: null },
      _id: { $in: ids },
    };
    const AllCustomer = await Customer.find(query);

    if (!AllCustomer.length > 0) {
      return res.status(404).json({
        status: "error",
        message: "Customers not found",
      });
    }

    await Customer.deleteMany(query);

    return res.status(200).json({
      status: "success",
      message: "All Customers deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const adminCustomerTrash = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.admin;
    const query = {
      _id: id,
      $or: [{ admin: _id }],
      deletedAt: null,
    };
    const trashCustomer = await Customer.findOne(query);

    if (!trashCustomer) {
      return res.status(404).json({
        status: "error",
        message: "Customer not found",
      });
    }

    await Customer.findByIdAndUpdate(
      { _id: id },
      { deletedAt: new Date() },
      {
        new: true,
      },
    );

    return res.status(200).json({
      status: "success",
      message: "Customer trash successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const adminCustomerMultiTrash = async (req, res) => {
  try {
    const { _id } = req.admin;
    const ids = req.body;
    const query = {
      $or: [{ admin: _id }],
      deletedAt: null,
      _id: { $in: ids },
    };
    const AllCustomer = await Customer.find(query);

    if (!AllCustomer.length > 0) {
      return res.status(404).json({
        status: "error",
        message: "Customers not found",
      });
    }

    await Customer.updateMany(query, {
      $set: { deletedAt: new Date(), updatedAt: new Date() },
    });

    return res.status(200).json({
      status: "success",
      message: "All Customers trashed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const adminCustomerRestoreTrash = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.admin;
    const query = {
      _id: id,
      $or: [{ admin: _id }],
      deletedAt: { $ne: null },
    };
    const customers = await Customer.findOne(query);
    if (!customers) {
      return res.status(404).json({
        status: "error",
        message: "Customer not found",
      });
    }

    await Customer.updateOne(query, { $set: { deletedAt: null } });
    return res.status(200).json({
      status: "success",
      message: "Customer restore successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getCustomerDashboardStats = async (req, res) => {
  try {
    const { _id } = req.customer;

    const [
      wishlistCount,
      supportTicketCount,
      reviewCount,
      totalOrderCount,
      recentOrders,
    ] = await Promise.all([
      Wishlist.countDocuments({ customer: _id, deletedAt: null }),
      SupportTicket.countDocuments({ customer: _id, deletedAt: null }),
      Review.countDocuments({ customer: _id, deletedAt: null }),
      Order.countDocuments({ customer: _id, deletedAt: null }),
      Order.find({ customer: _id, deletedAt: null })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate({
          path: "items",
          populate: [
            { path: "featured_image", model: "File" },
            { path: "categories", model: "Categories" },
          ],
        }),
    ]);

    return res.status(200).json({
      status: "success",
      message: "Customer dashboard stats fetched successfully",
      data: {
        wishlistCount,
        supportTicketCount,
        reviewCount,
        totalOrderCount,
        recentOrders,
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
