import mongoose from "mongoose";
import Categories from "../../../models/configuration/master/categories.schema.js";
import { slugGenerator } from "../../../helpers/slugGenerator.js";
import { adminsLogsHelper } from "../../../helpers/adminsLogsHelper.js";
import { fileUploads } from "../../../helpers/fileUploads.js";

export const createCategories = async (req, res) => {
  try {
    let { name, type, parent } = req.body;
    let data = req?.body

    if (!Array.isArray(name) || name.length === 0) {
      name = name?.split(",")
    }

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
      data.featured_image = null;
    }

    const createdCategories = [];

    for (const singleName of name) {
      const slug = await slugGenerator(singleName, Categories);

      const payload = {
        name: singleName,
        slug,
        type,
        featured_image: data.featured_image,
        parent: parent || null,
      };

      const newCategory = await Categories.create(payload);
      createdCategories.push(newCategory);

      if (parent) {
        await Categories.findByIdAndUpdate(parent, {
          $push: { children: newCategory._id },
        });
      }
    }
    await adminsLogsHelper(req, "Categories create successfully");
    return res.status(201).json({
      status: "success",
      message: "Categories created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const categoriesTypes = async (req, res) => {
  try {

    const query = {
      deletedAt: null,
      parent: null,
    };

    const response = await Categories.aggregate([
      { $match: query },
      {
        $group: {
          _id: "$type",
          categories: { $push: "$$ROOT" },
        },
      },
      { $unwind: "$categories" },
      {
        $lookup: {
          from: "categories",
          localField: "categories.children",
          foreignField: "_id",
          as: "categories.children",
        },
      },
      {
        $group: {
          _id: "$_id",
          categories: { $push: "$categories" },
        },
      },
    ]);

    if (!response || response.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Categories Types not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Fetch categories types successfully",
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

export const getCategoryByType = async (req, res) => {
  try {
    const { type } = req.params;
    const query = {
      type: type,
      deletedAt: null,
      parent: null,
    };

    const response = await Categories.find(query);
    return res.status(200).json({
      status: "success",
      message: "categories by type fetch successfully",
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

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Categories.findOne({
      _id: new mongoose.Types.ObjectId(id),
      deletedAt: null,
    }).populate("parent", "name _id");

    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    let { name, type, parent, featured_image } = req.body;

    if (featured_image && typeof featured_image === "object") {
      featured_image = featured_image._id;
    } else if (featured_image) {
      featured_image = featured_image;
    } else if (
      req?.files?.featured_image &&
      req.files.featured_image.length > 0
    ) {
      const image = await fileUploads(req);
      featured_image = image?.featured_image?._id;
    } else {
      featured_image = null;
    }


    const category = await Categories.findOne({
      _id: id,
      deletedAt: null,
    });

    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    }

    let finalName = name;
    if (Array.isArray(name)) {
      finalName = name[0];
    }

    let slug = category.slug;
    if (finalName && finalName !== category.name) {
      slug = await slugGenerator(finalName, Categories);
      category.name = finalName;
      category.slug = slug;
    }

    if (type) category.type = type;
    category.parent = parent || null;
    category.featured_image = featured_image || null;

    await category.save();
    await adminsLogsHelper(req, "Category updated successfully");
    return res.status(200).json({
      status: "success",
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Categories.findOne({
      _id: id,
    });

    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    }

    if (category.parent) {
      await Categories.findByIdAndUpdate(category.parent, {
        $pull: { children: category._id },
      });
    }

    if (category.children && category.children.length > 0) {
      await Categories.updateMany(
        { _id: { $in: category.children } },
        { $set: { parent: null } }
      );
    }

    await Categories.deleteOne({ _id: category._id });
    await adminsLogsHelper(req, "Category deleted successfully");
    return res.status(200).json({
      status: "success",
      message: "Category permanently deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
