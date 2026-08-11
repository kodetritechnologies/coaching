import { generateOptions } from "../../helpers/mongooseHelper.js";
import AdminLogs from "../../models/dashboardlogs/adminlogs.schema.js";

export const getAdminLogs = async (req, res) => {
  try {
    const { _id } = req.admin;
    const query = { admin: _id, deletedAt: null };
    const options = {
      ...generateOptions(req),
      sort: { createdAt: -1 },
    };
    const logs = await AdminLogs.paginate(query, options);
    return res.status(200).json({
      status: "success",
      message: "Admin logs fetch successfully",
      data: logs,
    });
  } catch (error) {
    return res.status(500).json({
      status: "success",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteAllAdminLogs = async (req, res) => {
  try {
    const { _id } = req.admin;
    const ids = req.body;
    const query = { admin: _id, deletedAt: null };

    const response = await AdminLogs.updateMany(query, {
      $set: { deletedAt: new Date() },
    });
    return res.status(200).json({
      status: "success",
      message: "All Admin logs delete successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
