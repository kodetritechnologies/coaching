import SupportTicket from "../../models/support/support-ticket.schema.js";
import {
  generateOptions,
  GenerateSearchQuery,
} from "../../helpers/mongooseHelper.js";
import { adminsLogsHelper } from "../../helpers/adminsLogsHelper.js";
import { fileUploads } from "../../helpers/fileUploads.js";
import { generateId } from "../../helpers/generateId.js";
import mongoose from "mongoose";

export const getSupportTicketAdmin = async (req, res) => {
  try {
    const query = GenerateSearchQuery(req, {
      deletedAt: null,
    });

    const options = {
      ...generateOptions(req),
      sort: {
        createdAt: -1,
      },
    };
    const result = await SupportTicket.paginate(query, options);
    return res.status(200).json({
      status: "success",
      message: "Support Ticket fetch successfully",
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

export const getAllAdminCustomerSupportTicket = async (req, res) => {
  try {
    const query = GenerateSearchQuery(req, {
      type: "customer",
      deletedAt: null,
    });

    const options = {
      ...generateOptions(req),
      sort: {
        createdAt: -1,
      },
    };
    const result = await SupportTicket.paginate(query, options);
    return res.status(200).json({
      status: "success",
      message: "Customer Support Ticket fetch successfully",
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

export const generateSupportTicketAdmin = async (req, res) => {
  try {
    const body = req.body;

    let galleryIds = [];

    if (req.files?.gallery && req.files.gallery.length > 0) {
      const { gallery } = await fileUploads(req);
      galleryIds = gallery?.map((file) => file?._id) || [];
    }

    const payload = {
      subject: body.subject,
      priority: body.priority,
      customer: body.customer,
      type: "admin",
      ticket_no: `TCK-${generateId()}`,
      message: [
        {
          from: "admin",
          message: body.message,
          gallery: galleryIds,
        },
      ],
    };

    const response = await SupportTicket.create(payload);

    return res.status(201).json({
      status: "success",
      message: "Request send successfully",
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

export const getSupportTicketByIdAdmin = async (req, res) => {
  try {
    const {} = req.admin;
    const { id } = req.params;
    const query = {
      _id: id,
      deletedAt: null,
    };

    const result = await SupportTicket.findOne(query);
    return res.status(200).json({
      status: "success",
      message: "Support Ticket fetch successfully",
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

export const replySupportTicketAdmin = async (req, res) => {
  try {
    let data = req.body;
    const { id } = req.params;

    const query = {
      _id: id,
      deletedAt: null,
    };
    let galleryIds = [];

    if (req.files?.gallery && req.files.gallery.length > 0) {
      const { gallery } = await fileUploads(req);
      galleryIds = gallery?.map((file) => {
        return file?._id;
      });
    }

    if (galleryIds?.length > 0) {
      data.gallery = galleryIds;
    } else {
      delete data.gallery;
    }

    const message = {
      from: "admin",
      message: data?.message,
      gallery: data?.gallery || [],
    };

    const payload = {
      $set: { status: data.status },
      $push: { message: message },
    };

    await SupportTicket.updateOne(query, payload);
    return res.status(201).json({
      status: "success",
      message: "Message send successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteSupportTicketAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const {} = req.admin;
    const query = { _id: id, deletedAt: null };
    const deleteSupportTicket = await SupportTicket.deleteOne(query);

    if (!deleteSupportTicket) {
      return res.status(404).json({
        status: "error",
        message: "Support Ticket not found",
      });
    }
    await adminsLogsHelper(req, "Support Ticket deleted successfully");
    return res.status(200).json({
      status: "success",
      message: "Support Ticket deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const multiDeleteSupportTicketAdmin = async (req, res) => {
  try {
    const ids = req.body;
    const query = {
      deletedAt: null,
      _id: { $in: ids },
    };
    const AllSupportTicket = await SupportTicket.find(query);

    if (!AllSupportTicket.length > 0) {
      return res.status(404).json({
        status: "error",
        message: "Support Ticket not found",
      });
    }

    await SupportTicket.deleteMany(query);
    await adminsLogsHelper(req, "All Support Ticket deleted successfully");
    return res.status(200).json({
      status: "success",
      message: "All Support Ticket deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Admin Customer Support

export const getAdminCustomerSupport = async (req, res) => {
  try {
    const { id } = req.params;
    const {} = req.admin;
    const query = {
      customer: new mongoose.Types.ObjectId(id),
      type: "customer",
    };
    const options = generateOptions(req);
    const result = await SupportTicket.paginate(query, options);
    return res.status(200).json({
      status: "success",
      message: "Support Ticket fetch successfully",
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

// public customer support

export const getAllSupportTicketCustomer = async (req, res) => {
  try {
    const query = GenerateSearchQuery(req, {
      customer: req.customer._id,
      deletedAt: null,
    });

    const options = {
      ...generateOptions(req),
      sort: {
        createdAt: -1,
      },
    };
    const result = await SupportTicket.paginate(query, options);
    return res.status(200).json({
      status: "success",
      message: "Customer Support Ticket fetch successfully",
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

export const createSupportTicketCustomer = async (req, res) => {
  try {
    const { _id } = req.customer;
    const body = req.body;
    let galleryIds = [];

    if (req.files?.gallery && req.files.gallery.length > 0) {
      const { gallery } = await fileUploads(req);
      galleryIds = gallery?.map((file) => file?._id) || [];
    }

    const payload = {
      subject: body.subject,
      priority: body.priority,
      customer: _id,
      type: "customer",
      ticket_no: `TCK-${generateId()}`,
      message: [
        {
          from: "customer",
          message: body.message,
          gallery: galleryIds,
        },
      ],
    };

    await SupportTicket.create(payload);
    return res.status(201).json({
      status: "success",
      message: "Support Ticket Created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const replySupportTicketCustomer = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    const query = {
      _id: id,
      deletedAt: null,
    };

    let galleryIds = [];

    if (req.files?.gallery && req.files.gallery.length > 0) {
      const { gallery } = await fileUploads(req);
      galleryIds = gallery?.map((file) => file?._id) || [];
    }

    if (galleryIds?.length > 0) {
      data.gallery = galleryIds;
    } else {
      delete data.gallery;
    }

    const message = {
      from: "customer",
      message: data?.message,
      gallery: data?.gallery || [],
    };

    const payload = {
      $set: { status: data.status },
      $push: { message: message },
    };

    await SupportTicket.updateOne(query, payload);
    return res.status(201).json({
      status: "success",
      message: "Message send successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteSupportTicketCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.customer;
    const query = { _id: id, customer: _id, deletedAt: null };
    const deleteSupportTicket = await SupportTicket.deleteOne(query);

    if (!deleteSupportTicket) {
      return res.status(404).json({
        status: "error",
        message: "Support Ticket not found",
      });
    }
    await adminsLogsHelper(req, "Support Ticket deleted successfully");
    return res.status(200).json({
      status: "success",
      message: "Support Ticket deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getSupportTicketByIdCustomer = async (req, res) => {
  try {
    const { _id } = req.customer;
    const { id } = req.params;
    const query = {
      _id: id,
      customer: _id,
      deletedAt: null,
    };

    const result = await SupportTicket.findOne(query);
    if (!result) {
      return res.status(404).json({
        status: "error",
        message: "Support Ticket not found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Support Ticket fetch successfully",
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

export const multiDeleteSupportTicketCustomer = async (req, res) => {
  try {
    const ids = req.body;
    const { _id } = req.customer;
    const query = {
      deletedAt: null,
      _id: { $in: ids },
      customer: _id,
    };
    const AllSupportTicket = await SupportTicket.find(query);

    if (!AllSupportTicket.length > 0) {
      return res.status(404).json({
        status: "error",
        message: "Support Ticket not found",
      });
    }

    await SupportTicket.deleteMany(query);
    await adminsLogsHelper(req, "Support Ticket Multi deleted successfully");
    return res.status(200).json({
      status: "success",
      message: "Support Ticket deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};


