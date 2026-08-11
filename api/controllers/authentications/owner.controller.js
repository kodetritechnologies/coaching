import mongoose from "mongoose";
import { adminsLogsHelper } from "../../helpers/adminsLogsHelper.js";
import { fileUploads } from "../../helpers/fileUploads.js";
import { generateHashPassword } from "../../helpers/hashPassword.js";
import { generateToken } from "../../helpers/JWT.js";
import Owner from "../../models/authentications/owner.schema.js";
import File from "../../models/file.schema.js";

export const ownerSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

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

    const isExistOwner = await Owner.findOne({ email: email });
    if (isExistOwner) {
      return res
        .status(409)
        .json({ status: "error", message: "Email is already registered" });
    }

    await Owner.create({ name, email, password });

    return res
      .status(201)
      .json({ status: "success", message: "Owner created successfully" });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const ownerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isExistOwner = await Owner.findOne({ email });

    if (!isExistOwner) {
      return res.status(404).json({
        status: "error",
        message: "Owner with this email address was not found",
      });
    }

    const isMatch = await isExistOwner.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid password. Please try again",
      });
    }

    const checkPermition = await Owner.findOne({
      email,
      deletedAt: null,
      // status: process.env.ACTIVE,
    });
    if (!checkPermition) {
      return res.status(403).json({
        status: "error",
        message: `Access Denied`,
      });
    }

    const payload = {
      _id: isExistOwner._id,
      name: isExistOwner.name,
      email: isExistOwner.email,
      mobile: isExistOwner.mobile,
      profileImage: isExistOwner.profileImage || "",
    };

    const token = generateToken(payload);

    res.cookie("ownerAccessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    await adminsLogsHelper(req, "Owner logged in successfully");
    return res.status(200).json({
      status: "success",
      message: "Owner logged in successfully",
      data: isExistOwner,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Something went wrong on the server",
      error: error.message,
    });
  }
};

export const getOwnerData = async (req, res) => {
  try {
    const { _id } = req.owner;
    const response = await Owner.findById(_id);
    if (!response) {
      return res
        .status(404)
        .json({ status: "error", message: "Owner not found" });
    }
    return res.status(200).json({
      status: "success",
      message: "Owner data fetched successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const ownerCreate = async (req, res) => {
  try {
    const payload = req.body;
    const isExistOwner = await Owner.findOne({
      email: payload.email,
    });

    if (isExistOwner) {
      return res
        .status(409)
        .json({ status: "error", message: "Owner already exists" });
    }

    const response = new Owner(payload);
    await response.save();

    return res
      .status(201)
      .json({ status: "success", message: "Owner created successfully" });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const ownerUpdate = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    let isExistCustomer = await Owner.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
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
      await File.deleteOne({
        _id: new mongoose.Types.ObjectId(isExistCustomer?.featured_image),
      });
      data.featured_image = null;
    }

    const response = await Owner.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id),
      {
        ...data,
        status: data?.status
          ? mongoose.Types.ObjectId(data?.status)
          : undefined,
      }
    );
    if (!response) {
      return res
        .status(404)
        .json({ status: "error", message: "Owner not found" });
    }
    return res
      .status(200)
      .json({ status: "success", message: "Owner updated successfully" });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const ownerLogOut = async (req, res) => {
  try {
    const ownerAccessToken = req.cookies?.ownerAccessToken;

    if (!ownerAccessToken) {
      return res
        .status(401)
        .json({ status: "error", message: "No active session found" });
    }

    res.clearCookie("ownerAccessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res
      .status(200)
      .json({ status: "success", message: "Owner logged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};
