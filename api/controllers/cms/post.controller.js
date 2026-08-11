import { adminsLogsHelper } from "../../helpers/adminsLogsHelper.js";
import { fileUploads } from "../../helpers/fileUploads.js";

import {
  generateOptions,
  GenerateSearchQuery,
} from "../../helpers/mongooseHelper.js";
import { slugGenerator } from "../../helpers/slugGenerator.js";
import Post from "../../models/cms/post.schema.js";
import File from "../../models/file.schema.js";
import Categories from "../../models/configuration/master/categories.schema.js";
import Tages from "../../models/configuration/master/tages.schema.js";

export const getPost = async (req, res) => {
  try {
    const query = GenerateSearchQuery(req, { deletedAt: null });
    const options = generateOptions(req);
    const post = await Post.paginate(query, options);

    return res.status(200).json({
      status: "success",
      message: "fetch Post successfully",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getTrashPost = async (req, res) => {
  try {

    const query = GenerateSearchQuery(req, {


      deletedAt: { $ne: null },
    });
    const options = generateOptions(req);
    const Posts = await Post.paginate(query, options);

    return res.status(200).json({
      status: "success",
      message: "fetch Trash Posts successfully",
      data: Posts,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getPostById = async (req, res) => {
  try {

    const { id } = req.params;
    const query = { _id: id, deletedAt: null };

    const Posts = await Post.findOne(query);

    return res.status(200).json({
      status: "success",
      message: "fetch Posts successfully",
      data: Posts,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const createPost = async (req, res) => {
  try {

    const data = req.body;
    const { featured_image } = await fileUploads(req);
    const slug = await slugGenerator(data.title, Post);

    const payload = {
      ...data,
      slug,


      featured_image: featured_image?._id || null,
    };
    await adminsLogsHelper(req, "Post create successfully");
    const post = await Post.create(payload);
    return res.status(201).json({
      status: "success",
      message: "Post create successfully",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  try {

    const { id } = req.params;
    const query = {
      _id: id,

    };

    let isExistPost = await Post.findOne({ _id: id });
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
      await File.deleteOne({ _id: isExistPost?.featured_image });
      data.featured_image = null;
    }

    const response = await Post.findOneAndUpdate(query, data);
    if (response) {
      await adminsLogsHelper(req, "Post update successfully");
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

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const query = { _id: id, deletedAt: { $ne: null } };
    const deletePost = await Post.deleteOne(query);

    if (!deletePost) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    }
    await adminsLogsHelper(req, "Post deleted successfully");
    return res.status(200).json({
      status: "success",
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const trashPost = async (req, res) => {
  try {
    const { id } = req.params;

    const query = { _id: id, deletedAt: null };
    const deletePost = await Post.findOne(query);

    if (!deletePost) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    }

    await Post.findByIdAndUpdate(
      { _id: id },
      { deletedAt: new Date() },
      {
        new: true,
      }
    );
    await adminsLogsHelper(req, "Post trash successfully");
    return res.status(200).json({
      status: "success",
      message: "Post trash successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const multiDeletePost = async (req, res) => {
  try {

    const ids = req.body;
    const query = {


      deletedAt: { $ne: null },
      _id: { $in: ids },
    };
    const AllPost = await Post.find(query);

    if (!AllPost.length > 0) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    }

    await Post.deleteMany(query);
    await adminsLogsHelper(req, "All Post deleted successfully");
    return res.status(200).json({
      status: "success",
      message: "All Post deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const multiTrashPost = async (req, res) => {
  try {

    const ids = req.body;
    const query = {


      deletedAt: null,
      _id: { $in: ids },
    };
    const AllPost = await Post.find(query);

    if (!AllPost.length > 0) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    }

    await Post.updateMany(query, {
      $set: { deletedAt: new Date(), updatedAt: new Date() },
    });
    await adminsLogsHelper(req, "All Post trashed successfully");
    return res.status(200).json({
      status: "success",
      message: "All Post trashed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const restoreTrashPost = async (req, res) => {
  try {
    const { id } = req.params;

    const query = { _id: id, deletedAt: { $ne: null } };
    const Posts = await Post.findOne(query);
    if (!Posts) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    }

    await Post.updateOne(query, { $set: { deletedAt: null } });
    await adminsLogsHelper(req, "Post restore successfully");
    return res.status(200).json({
      status: "success",
      message: "Post restore successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Frontend posts Controller

export const getPostsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const { category, tag, search } = req.query;
    let query = { type: type, deletedAt: null };

    if (search) {
      query = GenerateSearchQuery(req, query);
    }

    if (category) {
      const categoryDoc = await Categories.findOne({
        slug: category,
        deletedAt: null,
      });
      if (categoryDoc) {
        query.categories = categoryDoc._id;
      }
    }

    if (tag) {
      const tagDoc = await Tages.findOne({ slug: tag, deletedAt: null });
      if (tagDoc) {
        query.tags = tagDoc._id;
      }
    }

    const options = generateOptions(req);
    const posts = await Post.paginate(query, options);
    return res.status(200).json({
      status: "success",
      message: "fetch posts successfully",
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getPostsBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const query = { slug: slug, deletedAt: null };
    const post = await Post.findOne(query);
    return res.status(200).json({
      status: "success",
      message: "fetch post successfully",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getRecentPostsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const query = { type: type, deletedAt: null };

    const options = {
      ...generateOptions(req),
      sort: { publish_date: -1, createdAt: -1 },
    };

    const posts = await Post.paginate(query, options);

    return res.status(200).json({
      status: "success",
      message: "fetch recent posts successfully",
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getRelatedPosts = async (req, res) => {
  try {
    const { slug } = req.params;
    const { count = 3 } = req.query;

    const currentPost = await Post.findOne({ slug: slug, deletedAt: null });
    if (!currentPost) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    }

    let query = {
      _id: { $ne: currentPost._id },
      type: currentPost.type,
      deletedAt: null,
    };

    if (
      (currentPost.categories && currentPost.categories.length > 0) ||
      (currentPost.tags && currentPost.tags.length > 0)
    ) {
      query.$or = [];
      if (currentPost.categories && currentPost.categories.length > 0) {
        query.$or.push({ categories: { $in: currentPost.categories } });
      }
      if (currentPost.tags && currentPost.tags.length > 0) {
        query.$or.push({ tags: { $in: currentPost.tags } });
      }
    }

    const options = {
      ...generateOptions(req),
      limit: parseInt(count),
      sort: { publish_date: -1, createdAt: -1 },
    };

    const posts = await Post.paginate(query, options);
    return res.status(200).json({
      status: "success",
      message: "fetch related posts successfully",
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
