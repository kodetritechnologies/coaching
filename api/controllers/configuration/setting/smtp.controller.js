import { adminsLogsHelper } from "../../../helpers/adminsLogsHelper.js";
import Smtp from "../../../models/configuration/setting/smtp.schema.js";

export const getSmtp = async (req, res) => {
  try {
    const { _id } = req.admin;
    const response = await Smtp.findOne({
      admin: _id,

      deletedAt: null,
    });

    return res.status(200).json({
      status: "success",
      message: "fetch Smtp data successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const createSmtp = async (req, res) => {
  try {
    const { _id } = req.admin;
    const data = req.body;

    const query = {
      admin: _id,
    };

    const response = await Smtp.findOneAndUpdate(
      query,
      { ...data },
      {
        upsert: true,
        new: true,
      }
    );
    await adminsLogsHelper(req, "Smtp update successfully");
    return res.status(200).json({
      status: "success",
      message: "Smtp update successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
