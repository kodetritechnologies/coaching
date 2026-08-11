import { adminsLogsHelper } from "../../helpers/adminsLogsHelper.js";

import {
  generateOptions,
  GenerateSearchQuery,
} from "../../helpers/mongooseHelper.js";
import { slugGenerator } from "../../helpers/slugGenerator.js";
import Slider from "../../models/cms/slider.schema.js";
import File from "../../models/file.schema.js";

export const getSlider = async (req, res) => {
  try {
    const { _id } = req.admin;
    const query = GenerateSearchQuery(req, {
      admin: _id,

      deletedAt: null,
    });
    const options = generateOptions(req);
    const gallery = await Slider.paginate(query, options);

    return res.status(200).json({
      status: "success",
      message: "fetch Slider successfully",
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

export const getTrashSlider = async (req, res) => {
  try {
    const { _id } = req.admin;
    const query = GenerateSearchQuery(req, {
      admin: _id,

      deletedAt: { $ne: null },
    });
    const options = generateOptions(req);
    const Sliders = await Slider.paginate(query, options);

    return res.status(200).json({
      status: "success",
      message: "fetch Trash Sliders successfully",
      data: Sliders,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getSliderById = async (req, res) => {
  try {
    const { _id } = req.admin;
    const { id } = req.params;
    const query = { _id: id, admin: _id, deletedAt: null };

    const Sliders = await Slider.findOne(query);

    return res.status(200).json({
      status: "success",
      message: "fetch Sliders successfully",
      data: Sliders,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const createSlider = async (req, res) => {
  try {
    const { _id } = req.admin;
    const body = req.body;
    const slug = await slugGenerator(body.name, Slider);

    if (req?.body.gallery?.length > 0) {
      const payload = {
        name: body.name,
        slug: slug,
        gallery: body.gallery,
        admin: _id,
      };

      const response = await Slider.create(payload);
      res.status(201).json({
        status: "success",
        message: "Slider create successfully",
        data: response,
      });
      await adminsLogsHelper(req, "Slider create successfully");
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

export const updateSlider = async (req, res) => {
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

    await Slider.findOneAndUpdate(
      query,
      {
        name: body.name,
        slug: body.slug,
        gallery: body.gallery,
      },
      { new: true }
    );

    await adminsLogsHelper(req, "Slider updated successfully");

    res.status(200).json({
      status: "success",
      message: "Slider updated successfully",
    });
  } catch (error) {
    console.error("Update Slider Error:", error);
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
      message: "Slider file deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.admin;
    const query = { _id: id, admin: _id, deletedAt: { $ne: null } };
    const deleteSlider = await Slider.deleteOne(query);

    if (!deleteSlider) {
      return res.status(404).json({
        status: "error",
        message: "Slider not found",
      });
    }
    await adminsLogsHelper(req, "Slider deleted successfully");
    return res.status(200).json({
      status: "success",
      message: "Slider deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const trashSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.admin;
    const query = { _id: id, admin: _id, deletedAt: null };
    const deleteSlider = await Slider.findOne(query);

    if (!deleteSlider) {
      return res.status(404).json({
        status: "error",
        message: "Slider not found",
      });
    }

    await Slider.findByIdAndUpdate(
      { _id: id },
      { deletedAt: new Date() },
      {
        new: true,
      }
    );
    await adminsLogsHelper(req, "Slider trash successfully");
    return res.status(200).json({
      status: "success",
      message: "Slider trash successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const multiDeleteSlider = async (req, res) => {
  try {
    const { _id } = req.admin;
    const ids = req.body;
    const query = {
      admin: _id,

      deletedAt: { $ne: null },
      _id: { $in: ids },
    };
    const AllSlider = await Slider.find(query);

    if (!AllSlider.length > 0) {
      return res.status(404).json({
        status: "error",
        message: "Slider not found",
      });
    }

    await Slider.deleteMany(query);
    await adminsLogsHelper(req, "All Slider deleted successfully");
    return res.status(200).json({
      status: "success",
      message: "All Slider deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const multiTrashSlider = async (req, res) => {
  try {
    const { _id } = req.admin;
    const ids = req.body;
    const query = {
      admin: _id,

      deletedAt: null,
      _id: { $in: ids },
    };
    const AllSlider = await Slider.find(query);

    if (!AllSlider.length > 0) {
      return res.status(404).json({
        status: "error",
        message: "Slider not found",
      });
    }

    await Slider.updateMany(query, {
      $set: { deletedAt: new Date(), updatedAt: new Date() },
    });
    await adminsLogsHelper(req, "All Slider trashed successfully");
    return res.status(200).json({
      status: "success",
      message: "All Slider trashed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const restoreTrashSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.admin;
    const query = { _id: id, admin: _id, deletedAt: { $ne: null } };
    const Sliders = await Slider.findOne(query);
    if (!Sliders) {
      return res.status(404).json({
        status: "error",
        message: "Slider not found",
      });
    }

    await Slider.updateOne(query, { $set: { deletedAt: null } });
    await adminsLogsHelper(req, "Slider restore successfully");
    return res.status(200).json({
      status: "success",
      message: "Slider restore successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Frontend slider controller

export const getFrontendSlidersBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const query = { slug: slug, deletedAt: null };
    const sliders = await Slider.findOne(query);
    return res.status(200).json({
      status: "success",
      message: "fetch Slider successfully",
      data: sliders,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
