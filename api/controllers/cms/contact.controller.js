import Contact from "../../models/cms/contact.schema.js";

import {
  generateOptions,
  GenerateSearchQuery,
} from "../../helpers/mongooseHelper.js";
import { adminsLogsHelper } from "../../helpers/adminsLogsHelper.js";
import mongoose from "mongoose";

// Admin
export const getContactAdmin = async (req, res) => {
  try {
    const query = GenerateSearchQuery(req, {
      deletedAt: null,
    });
    const option = generateOptions(req);
    const contacts = await Contact.paginate(query, {
      ...option,
      sort: { createdAt: -1 },
    });
    return res.status(200).json({
      status: "success",
      message: "Contact fetch successfully",
      data: contacts,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getTrashContactAdmin = async (req, res) => {
  try {
    const query = GenerateSearchQuery(req, {
      deletedAt: { $ne: null },
    });
    const options = generateOptions(req);
    const Contacts = await Contact.paginate(query, options);

    return res.status(200).json({
      status: "success",
      message: "fetch Trash Contact successfully",
      data: Contacts,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getContactByIdAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: id, deletedAt: null };

    const Contacts = await Contact.findOne(query);

    return res.status(200).json({
      status: "success",
      message: "fetch Contacts successfully",
      data: Contacts,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteContactAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: id, deletedAt: { $ne: null } };
    const deleteContact = await Contact.deleteOne(query);

    if (!deleteContact) {
      return res.status(404).json({
        status: "error",
        message: "Contact not found",
      });
    }
    await adminsLogsHelper(req, "Contact deleted successfully");
    return res.status(200).json({
      status: "success",
      message: "Contact deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const trashContactAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: id, deletedAt: null };
    const deleteContact = await Contact.findOne(query);

    if (!deleteContact) {
      return res.status(404).json({
        status: "error",
        message: "Contact not found",
      });
    }

    await Contact.findByIdAndUpdate(
      { _id: id },
      { deletedAt: new Date() },
      {
        new: true,
      },
    );
    await adminsLogsHelper(req, "Contact trash successfully");
    return res.status(200).json({
      status: "success",
      message: "Contact trash successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const multiDeleteContactAdmin = async (req, res) => {
  try {
    const ids = req.body;
    const query = {
      deletedAt: { $ne: null },
      _id: { $in: ids },
    };
    const AllContact = await Contact.find(query);

    if (!AllContact.length > 0) {
      return res.status(404).json({
        status: "error",
        message: "Contact not found",
      });
    }

    await Contact.deleteMany(query);
    await adminsLogsHelper(req, "All Contact deleted successfully");
    return res.status(200).json({
      status: "success",
      message: "All Contact deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const multiTrashContactAdmin = async (req, res) => {
  try {
    const ids = req.body;
    const query = {
      deletedAt: null,
      _id: { $in: ids },
    };
    const AllContact = await Contact.find(query);

    if (!AllContact.length > 0) {
      return res.status(404).json({
        status: "error",
        message: "Contact not found",
      });
    }

    await Contact.updateMany(query, {
      $set: { deletedAt: new Date(), updatedAt: new Date() },
    });
    await adminsLogsHelper(req, "All Contact trashed successfully");
    return res.status(200).json({
      status: "success",
      message: "All Contact trashed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const restoreTrashContactAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: id, deletedAt: { $ne: null } };
    const Contacts = await Contact.findOne(query);
    if (!Contacts) {
      return res.status(404).json({
        status: "error",
        message: "Contact not found",
      });
    }

    await Contact.updateOne(query, { $set: { deletedAt: null } });
    await adminsLogsHelper(req, "Contact restore successfully");
    return res.status(200).json({
      status: "success",
      message: "Contact restore successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Frontend
export const createContact = async (req, res) => {
  try {
    const data = req.body;
    const payload = {
      values: data,
    };
    if (data?.customer) {
      payload.customer = new mongoose.Types.ObjectId(data.customer);
    }
    await Contact.create(payload);
    return res.status(201).json({
      status: "success",
      message: "Thank you! Your message has been sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
