import mongoose from "mongoose";
import { adminsLogsHelper } from "../../../helpers/adminsLogsHelper.js";
import Regions from "../../../models/configuration/master/regions.schema.js";
import { slugGenerator } from "../../../helpers/slugGenerator.js";
import { generateOptions } from "../../../helpers/mongooseHelper.js";

export const createRegions = async (req, res) => {
  try {
    let { name, type, parent } = req.body;
    if (typeof name === "string") {
      name = [name];
    }

    if (!Array.isArray(name) || name.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Name must be a non-empty array",
      });
    }

    const createdRegions = [];

    for (const singleName of name) {
      const slug = await slugGenerator(singleName, Regions);

      const payload = {
        name: singleName,
        slug,
        type,
        parent: parent || null,
      };

      const newRegions = await Regions.create(payload);
      createdRegions.push(newRegions);

      if (parent) {
        await Regions.findByIdAndUpdate(parent, {
          $push: { children: newRegions._id },
        });
      }
    }
    await adminsLogsHelper(req, "Regions create successfully");
    return res.status(201).json({
      status: "success",
      message: "Regions created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const regionsTypes = async (req, res) => {
  try {

    const query = {
      deletedAt: null,
      parent: null,
    };

    const response = await Regions.aggregate([
      { $match: query },
      {
        $group: {
          _id: "$type",
          regions: { $push: "$$ROOT" },
        },
      },
      { $unwind: "$regions" },
      {
        $lookup: {
          from: "regions",
          localField: "regions.children",
          foreignField: "_id",
          as: "regions.children",
        },
      },
      {
        $group: {
          _id: "$_id",
          regions: { $push: "$regions" },
        },
      },
    ]);

    if (!response || response.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Regions Types not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Fetch Regions types successfully",
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

export const getRegionsById = async (req, res) => {
  try {
    const { id } = req.params;

    const region = await Regions.findOne({
      _id: new mongoose.Types.ObjectId(id),
      deletedAt: null,
    }).populate("parent", "name _id");

    if (!region) {
      return res.status(404).json({
        status: "error",
        message: "Regions not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Regions fetched successfully",
      data: region,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const regionsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const query = {
      type: type,
      deletedAt: null,
    };

    const options = generateOptions(req);

    const result = await Regions.paginate(query, options);

    return res.status(200).json({
      status: "success",
      message: `${type} fetched successfully`,
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

export const updateRegions = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, parent } = req.body;

    const region = await Regions.findOne({
      _id: id,
      deletedAt: null,
    });

    if (!region) {
      return res.status(404).json({
        status: "error",
        message: "Regions not found",
      });
    }

    let finalName = name;
    if (Array.isArray(name)) {
      finalName = name[0];
    }

    let slug = region.slug;
    if (finalName && finalName !== region.name) {
      slug = await slugGenerator(finalName, Regions);
      region.name = finalName;
      region.slug = slug;
    }

    if (type) region.type = type;
    region.parent = parent || null;

    await region.save();
    await adminsLogsHelper(req, "Regions updated successfully");
    return res.status(200).json({
      status: "success",
      message: "Regions updated successfully",
      data: region,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteRegions = async (req, res) => {
  try {
    const { id } = req.params;

    const region = await Regions.findOne({
      _id: id,
    });

    if (!region) {
      return res.status(404).json({
        status: "error",
        message: "Regions not found",
      });
    }

    if (region.parent) {
      await Regions.findByIdAndUpdate(region.parent, {
        $pull: { children: region._id },
      });
    }

    if (region.children && region.children.length > 0) {
      await Regions.updateMany(
        { _id: { $in: region.children } },
        { $set: { parent: null } }
      );
    }

    await Regions.deleteOne({ _id: region._id });
    await adminsLogsHelper(req, "region deleted successfully");
    return res.status(200).json({
      status: "success",
      message: "region permanently deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getRegionsPublicByType = async (req, res) => {
  try {
    const { type } = req.params;
    const { parent } = req.query;

    const query = {
      type: type,
      deletedAt: null,
    };

    if (parent) {
      query.parent = parent;
    }

    const options = generateOptions(req);
    const result = await Regions.paginate(query, {
      ...options,
      select: "name _id parent type",
    });

    return res.status(200).json({
      status: "success",
      message: `${type} regions fetched successfully`,
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

