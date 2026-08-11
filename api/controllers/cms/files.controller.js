import { adminsLogsHelper } from "../../helpers/adminsLogsHelper.js";
import { fileUploads } from "../../helpers/fileUploads.js";
import {
  generateOptions,
  GenerateSearchQuery,
} from "../../helpers/mongooseHelper.js";
import File from "../../models/file.schema.js";

export const getFiles = async (req, res) => {
  try {
    const { _id } = req.admin;
    const query = GenerateSearchQuery(req, {
      admin: _id,
      deletedAt: null,
    });
    const options = generateOptions(req);
    const files = await File.paginate(query, options);

    return res.status(200).json({
      status: "success",
      message: "fetch Files successfully",
      data: files,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const createFiles = async (req, res) => {
  try {
    const response = await fileUploads(req);
    return res.status(201).json({
      status: "success",
      message: "Files create successfully",
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

export const deleteFiles = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.admin;
    const query = { _id: id, admin: _id, deletedAt: { $ne: null } };
    const deleteFile = await File.deleteOne(query);

    if (!deleteFile) {
      return res.status(404).json({
        status: "error",
        message: "File not found",
      });
    }
    await adminsLogsHelper(req, "File delete successfully");
    return res.status(200).json({
      status: "success",
      message: "File deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const multiDeleteFiles = async (req, res) => {
  try {
    const { _id } = req.admin;
    const ids = req.body;
    const query = {
      admin: _id,
      deletedAt: null,
      _id: { $in: ids },
    };
    const AllFiles = await File.find(query);

    if (!AllFiles.length > 0) {
      return res.status(404).json({
        status: "error",
        message: "File not found",
      });
    }

    await File.deleteMany(query);
    await adminsLogsHelper(req, "All File delete successfully");
    return res.status(200).json({
      status: "success",
      message: "All File deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
