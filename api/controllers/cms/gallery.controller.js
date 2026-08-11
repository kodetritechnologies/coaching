import { adminsLogsHelper } from "../../helpers/adminsLogsHelper.js";
import { fileUploads } from "../../helpers/fileUploads.js";

import {
  generateOptions,
  GenerateSearchQuery,
} from "../../helpers/mongooseHelper.js";
import { slugGenerator } from "../../helpers/slugGenerator.js";
import Gallery from "../../models/cms/gallery.schema.js";
import File from "../../models/file.schema.js";

export const getGallery = async (req, res) => {
  try {
    const { _id } = req.admin;
    const query = GenerateSearchQuery(req, {
      admin: _id,
      deletedAt: null,
    });
    const options = generateOptions(req);
    const gallery = await Gallery.paginate(query, options);

    return res.status(200).json({
      status: "success",
      message: "fetch Gallery successfully",
      data: gallery,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getTrashGallery = async (req, res) => {
  try {
    const { _id } = req.admin;
    const query = GenerateSearchQuery(req, {
      admin: _id,

      deletedAt: { $ne: null },
    });
    const options = generateOptions(req);
    const Gallerys = await Gallery.paginate(query, options);

    return res.status(200).json({
      status: "success",
      message: "fetch Trash Gallerys successfully",
      data: Gallerys,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getGalleryById = async (req, res) => {
  try {
    const { _id } = req.admin;
    const { id } = req.params;
    const query = { _id: id, admin: _id, deletedAt: null };

    const Gallerys = await Gallery.findOne(query);

    return res.status(200).json({
      status: "success",
      message: "fetch Gallerys successfully",
      data: Gallerys,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const createGallery = async (req, res) => {
  try {
    const { _id } = req.admin;
    const body = req.body;
    const slug = await slugGenerator(body.name, Gallery);

    if (req?.body.gallery?.length > 0) {
      const payload = {
        name: body.name,
        slug: slug,
        gallery: body.gallery,
        admin: _id,
      };

      const response = await Gallery.create(payload);
      res.status(201).json({
        status: "success",
        message: "Gallery create successfully",
        data: response,
      });
      await adminsLogsHelper(req, "Gallery create successfully");
    } else {
      return res
        .status(500)
        .json({ status: "error", message: "at least one image is required !" });
    }
  } catch (error) {
    return res.status(500).json({
      status: "erorr",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateGallery = async (req, res) => {
  try {
    const { _id } = req.admin;
    const { id } = req.params;
    const body = req.body;

    const query = { _id: id, admin: _id };

    body.gallery = body?.gallery?.map((data) => {
      return {
        _id: data?._id || data?._id?._id,
        name: data.name,
        desc: data.desc,
        link: data.link,
      };
    });

    await Gallery.findOneAndUpdate(
      query,
      {
        name: body.name,
        slug: body.slug,
        gallery: body.gallery,
      },
      { new: true }
    );

    await adminsLogsHelper(req, "Gallery updated successfully");

    res.status(200).json({
      status: "success",
      message: "Gallery updated successfully",
    });
  } catch (error) {
    console.error("Update Gallery Error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const data = req.body;
    const response = await File.deleteMany({ _id: { $in: data } });
    return res.status(200).json({
      status: "success",
      message: "Gallery file deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.admin;
    const query = { _id: id, admin: _id, deletedAt: { $ne: null } };
    const deleteGallery = await Gallery.deleteOne(query);

    if (!deleteGallery) {
      return res.status(404).json({
        status: "error",
        message: "Gallery not found",
      });
    }
    await adminsLogsHelper(req, "Gallery deleted successfully");
    return res.status(200).json({
      status: "success",
      message: "Gallery deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const trashGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.admin;
    const query = { _id: id, admin: _id, deletedAt: null };
    const deleteGallery = await Gallery.findOne(query);

    if (!deleteGallery) {
      return res.status(404).json({
        status: "error",
        message: "Gallery not found",
      });
    }

    await Gallery.findByIdAndUpdate(
      { _id: id },
      { deletedAt: new Date() },
      {
        new: true,
      }
    );
    await adminsLogsHelper(req, "Gallery trash successfully");
    return res.status(200).json({
      status: "success",
      message: "Gallery trash successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const multiDeleteGallery = async (req, res) => {
  try {
    const { _id } = req.admin;
    const ids = req.body;
    const query = {
      admin: _id,

      deletedAt: { $ne: null },
      _id: { $in: ids },
    };
    const AllGallery = await Gallery.find(query);

    if (!AllGallery.length > 0) {
      return res.status(404).json({
        status: "error",
        message: "Gallery not found",
      });
    }

    await Gallery.deleteMany(query);
    await adminsLogsHelper(req, "All Gallery deleted successfully");
    return res.status(200).json({
      status: "success",
      message: "All Gallery deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const multiTrashGallery = async (req, res) => {
  try {
    const { _id } = req.admin;
    const ids = req.body;
    const query = {
      admin: _id,

      deletedAt: null,
      _id: { $in: ids },
    };
    const AllGallery = await Gallery.find(query);

    if (!AllGallery.length > 0) {
      return res.status(404).json({
        status: "error",
        message: "Gallery not found",
      });
    }

    await Gallery.updateMany(query, {
      $set: { deletedAt: new Date(), updatedAt: new Date() },
    });
    await adminsLogsHelper(req, "All Gallery trashed successfully");
    return res.status(200).json({
      status: "success",
      message: "All Gallery trashed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const restoreTrashGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.admin;
    const query = { _id: id, admin: _id, deletedAt: { $ne: null } };
    const Gallerys = await Gallery.findOne(query);
    if (!Gallerys) {
      return res.status(404).json({
        status: "error",
        message: "Gallery not found",
      });
    }

    await Gallery.updateOne(query, { $set: { deletedAt: null } });
    await adminsLogsHelper(req, "Gallery restore successfully");
    return res.status(200).json({
      status: "success",
      message: "Gallery restore successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Frontend Gallery controller
export const getFrontendGalleryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const query = { slug: slug, deletedAt: null };
    const gallery = await Gallery.findOne(query);
    return res.status(200).json({
      status: "success",
      message: "fetch Gallery successfully",
      data: gallery,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
