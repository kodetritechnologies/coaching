import { adminsLogsHelper } from "../../helpers/adminsLogsHelper.js";
import { fileUploads } from "../../helpers/fileUploads.js";
import { generateHashPassword } from "../../helpers/hashPassword.js";
import { generateToken } from "../../helpers/JWT.js";
import Admin from "../../models/authentications/admin.schema.js";
import File from "../../models/file.schema.js";

export const adminSignup = async (req, res) => {
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

    const isExistAdmin = await Admin.findOne({ email: email });
    if (isExistAdmin) {
      return res
        .status(409)
        .json({ status: "error", message: "Email is already registered" });
    }

    await Admin.create({ name, email, password });

    return res
      .status(201)
      .json({ status: "success", message: "Admin created successfully" });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isExistAdmin = await Admin.findOne({ email: email });

    if (!isExistAdmin) {
      return res.status(404).json({
        status: "error",
        message: "Admin with this email address was not found",
      });
    }

    const isMatch = await isExistAdmin.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid password. Please try again",
      });
    }

    const checkPermition = await Admin.findOne({
      email,
      deletedAt: null,
    });

    if (!checkPermition) {
      return res.status(403).json({
        status: "error",
        message: "admin not found",
      });
    }

    const payload = {
      _id: isExistAdmin._id,
      name: isExistAdmin.name,
      email: isExistAdmin.email,
      mobile: isExistAdmin.mobile,
      profileImage: isExistAdmin.profileImage || "",
    };

    const token = generateToken(payload);

    res.cookie("adminAccessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    await adminsLogsHelper(req, "Admin logged in successfully");
    return res.status(200).json({
      status: "success",
      message: "Admin logged in successfully",
      data: isExistAdmin,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Something went wrong on the server",
      error: error.message,
    });
  }
};

export const getAdminData = async (req, res) => {
  try {
    const { _id } = req.admin;
    const response = await Admin.findById(_id);
    if (!response) {
      return res
        .status(404)
        .json({ status: "error", message: "Admin not found" });
    }
    return res.status(200).json({
      status: "success",
      message: "Admin data fetched successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const adminCreate = async (req, res) => {
  try {
    const payload = req.body;
    const isExistAdmin = await Admin.findOne({
      email: payload.email,
    });

    if (isExistAdmin) {
      return res
        .status(409)
        .json({ status: "error", message: "Admin already exists" });
    }

    const response = new Admin(payload);
    await response.save();

    return res
      .status(201)
      .json({ status: "success", message: "Admin created successfully" });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const adminUpdate = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    let isExistCustomer = await Admin.findOne({ _id: id });
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

    const response = await Admin.findByIdAndUpdate({ _id: id }, { ...data });
    if (!response) {
      return res
        .status(404)
        .json({ status: "error", message: "Admin not found" });
    }
    return res
      .status(200)
      .json({ status: "success", message: "Admin updated successfully" });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const adminLogOut = async (req, res) => {
  try {
    const adminAccessToken = req.cookies?.adminAccessToken;

    if (!adminAccessToken) {
      return res
        .status(401)
        .json({ status: "error", message: "No active session found" });
    }

    res.clearCookie("adminAccessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res
      .status(200)
      .json({ status: "success", message: "Admin logged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};
