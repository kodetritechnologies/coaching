import mongoose from "mongoose";
import { generateOptions } from "../../helpers/mongooseHelper.js";
import Notification from "../../models/ecommerce/notification.schema.js";
import { adminsLogsHelper } from "../../helpers/adminsLogsHelper.js";
export const getNotifications = async (req, res) => {
  try {
    const { _id,  } = req.admin;
    const query = {
      admin: _id,

      deletedAt: null,
    };
    const options = generateOptions(req);

    const NotificationsType = await Notification.aggregate([
      {
        $match: {
          admin: new mongoose.Types.ObjectId(_id),
          deletedAt: null,
        },
      },
      {
        $group: {
          _id: "$type",
        },
      },
    ]);

    const response = await Notification.paginate(query, options);
    return res.status(200).json({
      status: "success",
      message: "Notifications fetched successfully",
      data: response,
      type: NotificationsType,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getNotificationsById = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id,  } = req.admin;
    const query = { _id: id, admin: _id, deletedAt: null };

    const getNotifications = await Notification.findOne(query);
    if (!getNotifications) {
      return res.status(404).json({
        status: "error",
        message: "Notifications not found",
      });
    }

    return res.status(200).json({
      ststus: "success",
      message: "Notifications fetched successfully",
      data: getNotifications,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getNotificationsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const { _id,  } = req.admin;
    const NotificationsType = await Notification.find({
      type,
      admin: _id,

      deletedAt: null,
    });

    if (!NotificationsType || NotificationsType.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No Notifications found for this type",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Notifications fetched successfully by type",
      data: NotificationsType,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const createNotifications = async (req, res) => {
  try {
    const data = req.body;
    const { _id,  } = req.admin;

    const response = new Notification({ ...data, admin: _id,  });
    await response.save();
    await adminsLogsHelper(req, "Notifications created successfully");
    return res.status(201).json({
      status: "success",
      message: "Notifications created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateNotifications = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedNotifications = await Notification.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      }
    );

    if (!updatedNotifications) {
      return res.status(404).json({
        status: "error",
        message: "Notifications not found",
      });
    }
    await adminsLogsHelper(req, "Notifications updated successfully");
    return res.status(200).json({
      status: "success",
      message: "Notifications updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteNotifications = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id,  } = req.admin;
    const query = { _id: id, admin: _id, deletedAt: null };
    const deletedNotifications = await Notification.deleteOne(query);

    if (!deletedNotifications) {
      return res.status(404).json({
        status: "error",
        message: "Notifications not found",
      });
    }
    await adminsLogsHelper(req, "Notifications deleted successfully");
    return res.status(200).json({
      status: "success",
      message: "Notifications deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const multiDeleteNotifications = async (req, res) => {
  try {
    const { _id,  } = req.admin;
    const ids = req.body;
    const query = {
      admin: _id,

      deletedAt: null,
      _id: { $in: ids },
    };
    const AllNotifications = await Notification.find(query);

    if (!AllNotifications.length > 0) {
      return res.status(404).json({
        status: "error",
        message: "Notifications not found",
      });
    }
    await Notification.deleteMany(query);
    await adminsLogsHelper(req, "All Notifications deleted successfully");
    return res.status(200).json({
      status: "success",
      message: "All Notifications deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
