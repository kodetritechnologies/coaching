import mongoose from "mongoose";
import {
  generateOptions,
  GenerateSearchQuery,
} from "../../../helpers/mongooseHelper.js";
import Status from "../../../models/configuration/master/status.schema.js";
import { adminsLogsHelper } from "../../../helpers/adminsLogsHelper.js";
import { fileUploads } from "../../../helpers/fileUploads.js";
import File from "../../../models/file.schema.js";

export const getStatus = async (req, res) => {
  try {
    const query = GenerateSearchQuery(req, {
      deletedAt: null,
    });

    const options = generateOptions(req);

    const StatusType = await Status.aggregate([
      {
        $match: {
          deletedAt: null,
        },
      },
      {
        $group: {
          _id: "$type",
        },
      },
    ]);

    const response = await Status.paginate(query, options);
    return res.status(200).json({
      status: "success",
      message: "Status fetched successfully",
      data: response,
      type: StatusType,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, } = req.admin;
    const query = { _id: id, admin: _id, deletedAt: null };

    const getStatus = await Status.findOne(query);
    if (!getStatus) {
      return res.status(404).json({
        status: "error",
        message: "Status not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Status fetched successfully",
      data: getStatus,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getStatusByType = async (req, res) => {
  try {
    const { type } = req.params;
    const statusType = await Status.find({
      type,
      deletedAt: null,
    }).populate("featured_image", "_id name")

    if (!statusType || statusType.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No status found for this type",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Status fetched successfully by type",
      data: statusType,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const createStatus = async (req, res) => {
  try {
    const { name, type } = req.body;
    const { _id, } = req.admin;

    const { featured_image } = await fileUploads(req);

    const response = new Status({
      name,
      type,
      admin: _id,
      featured_image: featured_image?._id || null,
    });
    await response.save();
    await adminsLogsHelper(req, "Status created successfully");
    return res.status(201).json({
      status: "success",
      message: "Status created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    let isExistStatus = await Status.findOne({ _id: id });
    let data = req.body;

    if (data?.featured_image && typeof data.featured_image === "object") {
      data.featured_image = data.featured_image._id;
    } else if (
      req?.files?.featured_image &&
      req.files.featured_image.length > 0
    ) {
      const image = await fileUploads(req);
      data.featured_image = image?.featured_image?._id;
    } else {
      await File.deleteOne({ _id: isExistStatus?.featured_image });
      data.featured_image = null;
    }

    const updatedStatus = await Status.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedStatus) {
      return res.status(404).json({
        status: "error",
        message: "Status not found",
      });
    }
    await adminsLogsHelper(req, "Status updated successfully");
    return res.status(200).json({
      status: "success",
      message: "Status updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, } = req.admin;
    const query = { _id: id, admin: _id, deletedAt: null };
    const deletedStatus = await Status.deleteOne(query);

    if (!deletedStatus) {
      return res.status(404).json({
        status: "error",
        message: "Status not found",
      });
    }
    await adminsLogsHelper(req, "Status deleted successfully");
    return res.status(200).json({
      status: "success",
      message: "Status deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const multiDeleteStatus = async (req, res) => {
  try {
    const { _id, } = req.admin;
    const ids = req.body;
    const query = {
      admin: _id,
      deletedAt: null,
      _id: { $in: ids },
    };
    const AllStatus = await Status.find(query);

    if (!AllStatus.length > 0) {
      return res.status(404).json({
        status: "error",
        message: "Status not found",
      });
    }
    await Status.deleteMany(query);
    await adminsLogsHelper(req, "All status deleted successfully");
    return res.status(200).json({
      status: "success",
      message: "All Status deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
