import { adminsLogsHelper } from "../../helpers/adminsLogsHelper.js";
import {
  generateOptions,
  GenerateSearchQuery,
} from "../../helpers/mongooseHelper.js";
import { slugGenerator } from "../../helpers/slugGenerator.js";
import Faq from "../../models/cms/faq.schema.js";

export const getFaq = async (req, res) => {
  try {
    const { _id } = req.admin;

    const query = GenerateSearchQuery(req, {
      admin: _id,
      deletedAt: null,
      type: "faq",
    });
    const options = generateOptions(req);
    const Faqs = await Faq.paginate(query, options);

    return res.status(200).json({
      status: "success",
      message: "fetch faqs successfully",
      data: Faqs,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getTrashFaq = async (req, res) => {
  try {
    const { _id } = req.admin;
    const query = GenerateSearchQuery(req, {
      admin: _id,
      deletedAt: { $ne: null },
      type: "faq",
    });
    const options = generateOptions(req);
    const Faqs = await Faq.paginate(query, options);

    return res.status(200).json({
      status: "success",
      message: "fetch Trash faqs successfully",
      data: Faqs,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getFaqById = async (req, res) => {
  try {
    const { _id } = req.admin;
    const { id } = req.params;
    const query = {
      _id: id,
      admin: _id,
      type: "faq",
      deletedAt: null,
    };

    const Faqs = await Faq.findOne(query);

    return res.status(200).json({
      status: "success",
      message: "fetch faqs successfully",
      data: Faqs,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const createFaq = async (req, res) => {
  try {
    const { _id } = req.admin;
    const data = req.body;
    const slug = await slugGenerator(data.title, Faq);
    const payload = {
      ...data,
      admin: _id,
      slug,
    };

    const result = await Faq.create(payload);
    await adminsLogsHelper(req, "Faq create successfully");
    return res.status(201).json({
      status: "success",
      message: "Faq create successfully",
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

export const updateFaq = async (req, res) => {
  try {
    const { _id } = req.admin;
    const { id } = req.params;
    const payload = req.body;
    const query = {
      _id: id,
      admin: _id,
    };

    const response = await Faq.findOneAndUpdate(query, payload);
    await adminsLogsHelper(req, "Faq update successfully");
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

export const deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.admin;
    const query = { _id: id, admin: _id, deletedAt: { $ne: null } };
    const deleteFaq = await Faq.deleteOne(query);

    if (!deleteFaq) {
      return res.status(404).json({
        status: "error",
        message: "Faq not found",
      });
    }
    await adminsLogsHelper(req, "Faq delete successfully");
    return res.status(200).json({
      status: "success",
      message: "Faq deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const trashFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.admin;
    const query = { _id: id, admin: _id, deletedAt: null };
    const deleteFaq = await Faq.findOne(query);

    if (!deleteFaq) {
      return res.status(404).json({
        status: "error",
        message: "Faq not found",
      });
    }

    await Faq.findByIdAndUpdate(
      { _id: id },
      { deletedAt: new Date() },
      {
        new: true,
      }
    );
    await adminsLogsHelper(req, "Faq trash successfully");
    return res.status(200).json({
      status: "success",
      message: "Faq trash successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const multiDelete = async (req, res) => {
  try {
    const { _id } = req.admin;
    const ids = req.body;
    const query = {
      admin: _id,
      deletedAt: { $ne: null },
      _id: { $in: ids },
    };
    const AllFaq = await Faq.find(query);

    if (!AllFaq.length > 0) {
      return res.status(404).json({
        status: "error",
        message: "Faq not found",
      });
    }

    await Faq.deleteMany(query);
    await adminsLogsHelper(req, "All Faq delete successfully");
    return res.status(200).json({
      status: "success",
      message: "All faq deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const multiTrash = async (req, res) => {
  try {
    const { _id } = req.admin;
    const ids = req.body;
    const query = {
      admin: _id,
      deletedAt: null,
      _id: { $in: ids },
    };
    const AllFaq = await Faq.find(query);

    if (!AllFaq.length > 0) {
      return res.status(404).json({
        status: "error",
        message: "Faq not found",
      });
    }

    await Faq.updateMany(query, {
      $set: { deletedAt: new Date(), updatedAt: new Date() },
    });
    await adminsLogsHelper(req, "All Faq trashed successfully");
    return res.status(200).json({
      status: "success",
      message: "All faq trashed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const restoreTrash = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.admin;
    const query = { _id: id, admin: _id, deletedAt: { $ne: null } };
    const faq = await Faq.findOne(query);
    if (!faq) {
      return res.status(404).json({
        status: "error",
        message: "Faq not found",
      });
    }

    await Faq.updateOne(query, { $set: { deletedAt: null } });
    await adminsLogsHelper(req, "Faq restore successfully");
    return res.status(200).json({
      status: "success",
      message: "Faq restore successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Frontend Controller

export const getFrontendFaqBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const query = { slug, deletedAt: null };
    const options = generateOptions(req);
    const Faqs = await Faq.paginate(query, options);
    return res.status(200).json({
      status: "success",
      message: "fetch faqs successfully",
      data: Faqs,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getFrontendAllFaqs = async (req, res) => {
  try {
    const query = { deletedAt: null };
    const options = generateOptions(req);
    const faqs = await Faq.paginate(query, options);
    return res.status(200).json({
      status: "success",
      message: "fetch all faqs successfully",
      data: faqs,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
