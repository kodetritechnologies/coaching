import { adminsLogsHelper } from "../../../helpers/adminsLogsHelper.js";
import Store from "../../../models/configuration/setting/store.schema.js";

export const getStore = async (req, res) => {
  try {
    const { _id } = req.admin;
    const { type } = req.params;
    const query = {
      admin: _id,

      type,
    };
    const response = await Store.findOne(query);
    if (!response) {
      return res
        .status(404)
        .json({ status: "error", message: "Store not found" });
    }
    return res.status(200).json({
      status: "success",
      message: "Store fetched successfully",
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

export const createStore = async (req, res) => {
  try {
    const { _id } = req.admin;
    const data = req.body;
    const query = {
      admin: _id,

      type: data.type,
    };

    const response = await Store.findOneAndUpdate(
      query,
      { ...data, name: data.type },
      {
        upsert: true,
        new: true,
      }
    );
    await adminsLogsHelper(req, "Store create successfully");
    return res.status(200).json({
      status: "success",
      message: "Updated successfully",
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
