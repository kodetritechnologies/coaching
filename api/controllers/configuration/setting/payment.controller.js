import { adminsLogsHelper } from "../../../helpers/adminsLogsHelper.js";
import Payment from "../../../models/configuration/setting/payment.schema.js";

export const getpayment = async (req, res) => {
  try {
    const gatway = req.params.id;
    const { _id } = req.admin;
    const payment = await Payment.findOne({ admin: _id, gatway });
    if (!payment) {
      return res.status(404).json({
        status: "success",
        message: "Payments not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "fetch payment successfully",
      data: payment,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const createPayment = async (req, res) => {
  try {
    const { _id } = req.admin;
    const { key_id, key_secret, gatway, status } = req.body;

    const query = { admin: _id, gatway };
    const payload = {
      key_id,
      key_secret,
      gatway,
      status,
      admin: _id,
    };

    const result = await Payment.findOneAndUpdate(
      query,
      { $set: payload },
      {
        upsert: true,
        new: true,
      }
    );
    await adminsLogsHelper(req, "Payment create successfully");
    return res.status(200).json({
      status: "success",
      message: "updated successfully",
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
