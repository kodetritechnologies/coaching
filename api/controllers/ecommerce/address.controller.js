import { generateOptions } from "../../helpers/mongooseHelper.js";
import Address from "../../models/ecommerce/address.schema.js";

export const getAllAdminCustomerAddress = async (req, res) => {
  try {
    const {} = req.admin;
    const { id } = req.params;

    const query = {
      customer: id,

      deletedAt: null,
    };

    const options = generateOptions(req);
    const result = await Address.paginate(query, options);
    res.status(200).json({
      status: "success",
      message: "Fetch all customer address successfully",
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

export const getCustomerAddressById = async (req, res) => {
  try {
    const {} = req.admin;
    const { id } = req.params;

    const query = {
      _id: id,

      deletedAt: null,
    };
    const result = await Address.findOne(query);
    res.status(200).json({
      status: "success",
      message: "fetch customer address successfully",
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

export const updateAdminCustomerAddress = async (req, res) => {
  try {
    const {} = req.admin;
    const { id } = req.params;
    const data = req.body;
    const state = data?.state?.value || null;
    const query = {
      _id: id,

      deletedAt: null,
    };

    const payload = {
      ...data,
      state,
    };
    const result = await Address.findOneAndUpdate(query, {
      $set: { ...payload },
    });
    res.status(200).json({
      status: "success",
      message: "fetch customer address successfully",
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

export const deleteAdminCustomerAddress = async (req, res) => {
  try {
    const {} = req.admin;
    const { id } = req.params;
    const query = {
      _id: id,
    };
    await Address.deleteOne(query);
    res.status(201).json({
      status: "success",
      message: "address Deleted successfully",
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
export const getAllCustomerAddress = async (req, res) => {
  try {
    const { _id } = req.customer;

    const query = {
      customer: _id,

      deletedAt: null,
    };

    const options = generateOptions(req);
    const result = await Address.paginate(query, options);
    res.status(200).json({
      status: "success",
      message: "Fetch all address successfully",
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

export const createCustomerAddress = async (req, res) => {
  try {
    const { _id } = req.customer;
    const body = req.body;

    const payload = {
      ...body,

      customer: _id,
    };

    if (body.isDefault) {
      await Address.updateMany({ customer: _id }, { $set: { isDefault: false } });
    }

    await Address.create(payload);
    res.status(201).json({
      status: "success",
      message: "address create successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateCustomerAddress = async (req, res) => {
  try {
    const { _id } = req.customer;
    const { id } = req.params;
    const body = req.body;

    const query = {
      _id: id,

      customer: _id,
    };

    if (body.isDefault) {
      await Address.updateMany(
        { customer: _id, _id: { $ne: id } },
        { $set: { isDefault: false } }
      );
    }

    await Address.findOneAndUpdate(query, { $set: { ...body } }, { new: true });
    res.status(201).json({
      status: "success",
      message: "address Updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteCustomerAddress = async (req, res) => {
  try {
    const { _id } = req.customer;
    const { id } = req.params;
    const query = {
      _id: id,

      customer: _id,
    };
    await Address.deleteOne(query);
    res.status(201).json({
      status: "success",
      message: "address Deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
