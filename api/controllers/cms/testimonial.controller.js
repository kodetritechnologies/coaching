import { adminsLogsHelper } from "../../helpers/adminsLogsHelper.js";
import { fileUploads } from "../../helpers/fileUploads.js";

import {
  generateOptions,
  GenerateSearchQuery,
} from "../../helpers/mongooseHelper.js";
import { slugGenerator } from "../../helpers/slugGenerator.js";
import Testimonial from "../../models/cms/testimonial.schema.js";
import File from "../../models/file.schema.js";

export const getTestimonial = async (req, res) => {
  try {
    const { _id } = req.admin;
    const query = GenerateSearchQuery(req, {
      admin: _id,

      deletedAt: null,
    });
    const options = generateOptions(req);
    const Testimonials = await Testimonial.paginate(query, options);

    return res.status(200).json({
      status: "success",
      message: "fetch testimonials successfully",
      data: Testimonials,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getTrashTestimonial = async (req, res) => {
  try {
    const { _id } = req.admin;
    const query = GenerateSearchQuery(req, {
      admin: _id,

      deletedAt: { $ne: null },
    });
    const options = generateOptions(req);
    const Testimonials = await Testimonial.paginate(query, options);

    return res.status(200).json({
      status: "success",
      message: "fetch Trash testimonial successfully",
      data: Testimonials,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getTestimonialById = async (req, res) => {
  try {
    const { _id } = req.admin;
    const { id } = req.params;
    const query = { _id: id, admin: _id, deletedAt: null };

    const Testimonials = await Testimonial.findOne(query);

    return res.status(200).json({
      status: "success",
      message: "fetch testimonials successfully",
      data: Testimonials,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const { _id } = req.admin;
    const data = req.body;
    const slug = await slugGenerator(data.name, Testimonial);

    if (req?.files?.featured_image && req?.files?.featured_image.length > 0) {
      const { featured_image } = await fileUploads(req);
      data.featured_image = featured_image?._id;
    } else {
      delete data.featured_image;
    }

    const payload = {
      ...data,
      admin: _id,

      slug,
    };

    const result = await Testimonial.create(payload);
    await adminsLogsHelper(req, "Testimonial create successfully");
    return res.status(201).json({
      status: "success",
      message: "Testimonial create successfully",
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

export const updateTestimonial = async (req, res) => {
  try {
    const { _id } = req.admin;
    const { id } = req.params;
    const query = {
      _id: id,
      admin: _id,
    };

    let isExistTestimonial = await Testimonial.findOne({ _id: id });
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
      await File.deleteOne({ _id: isExistTestimonial?.featured_image });
      data.featured_image = null;
    }

    const response = await Testimonial.findOneAndUpdate(query, data);
    await adminsLogsHelper(req, "Testimonial update successfully");
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

export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.admin;
    const query = { _id: id, admin: _id, deletedAt: { $ne: null } };
    const deleteTestimonial = await Testimonial.deleteOne(query);

    if (!deleteTestimonial) {
      return res.status(404).json({
        status: "error",
        message: "Testimonial not found",
      });
    }
    await adminsLogsHelper(req, "Testimonial delete successfully");
    return res.status(200).json({
      status: "success",
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const trashTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.admin;
    const query = { _id: id, admin: _id, deletedAt: null };
    const deleteTestimonial = await Testimonial.findOne(query);

    if (!deleteTestimonial) {
      return res.status(404).json({
        status: "error",
        message: "Testimonial not found",
      });
    }

    await Testimonial.findByIdAndUpdate(
      { _id: id },
      { deletedAt: new Date() },
      {
        new: true,
      }
    );
    await adminsLogsHelper(req, "Testimonial trash successfully");
    return res.status(200).json({
      status: "success",
      message: "Testimonial trash successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const multiDeleteTestimonial = async (req, res) => {
  try {
    const { _id } = req.admin;
    const ids = req.body;
    const query = {
      admin: _id,

      deletedAt: { $ne: null },
      _id: { $in: ids },
    };
    const AllTestimonial = await Testimonial.find(query);

    if (!AllTestimonial.length > 0) {
      return res.status(404).json({
        status: "error",
        message: "Testimonial not found",
      });
    }

    await Testimonial.deleteMany(query);
    await adminsLogsHelper(req, "All Testimonial delete successfully");
    return res.status(200).json({
      status: "success",
      message: "All Testimonial deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const multiTrashTestimonial = async (req, res) => {
  try {
    const { _id } = req.admin;
    const ids = req.body;
    const query = {
      admin: _id,

      deletedAt: null,
      _id: { $in: ids },
    };
    const AllTestimonial = await Testimonial.find(query);

    if (!AllTestimonial.length > 0) {
      return res.status(404).json({
        status: "error",
        message: "Testimonial not found",
      });
    }

    await Testimonial.updateMany(query, {
      $set: { deletedAt: new Date(), updatedAt: new Date() },
    });
    await adminsLogsHelper(req, "All Testimonial trashed successfully");
    return res.status(200).json({
      status: "success",
      message: "All Testimonial trashed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const restoreTrashTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.admin;
    const query = { _id: id, admin: _id, deletedAt: { $ne: null } };
    const testimonial = await Testimonial.findOne(query);
    if (!testimonial) {
      return res.status(404).json({
        status: "error",
        message: "Testimonial not found",
      });
    }

    await Testimonial.updateOne(query, { $set: { deletedAt: null } });
    await adminsLogsHelper(req, "Testimonial restore successfully");
    return res.status(200).json({
      status: "success",
      message: "Testimonial restore successfully",
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

export const getFrontendTestimonialByType = async (req, res) => {
  try {
    const { type } = req.params;
    const query = { type, deletedAt: null };
    const options = generateOptions(req);
    const Testimonials = await Testimonial.paginate(query, options);
    return res.status(200).json({
      status: "success",
      message: "fetch testimonials successfully",
      data: Testimonials,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
