import { adminsLogsHelper } from "../../../helpers/adminsLogsHelper.js";
import Currency from "../../../models/configuration/setting/currency.schema.js";
import { generateOptions } from "../../../helpers/mongooseHelper.js";

export const getCurrenciesPublic = async (req, res) => {
  try {
    const currencies = await Currency.find({ deletedAt: null }).sort({ is_default: -1 });
    return res.status(200).json({
      status: "success",
      message: "Currencies fetched successfully",
      data: currencies,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const createCurrency = async (req, res) => {
  try {
    const { name, symbol, code, is_default } = req.body;

    if (!name || !symbol || !code) {
      return res.status(400).json({
        status: "error",
        message: "Currency name, symbol, and ISO code are required",
      });
    }

    // If this currency is default, unset all others
    if (is_default) {
      await Currency.updateMany(
        { deletedAt: null, is_default: true },
        { is_default: false }
      );
    }

    // If no currencies exist yet, make this the default automatically
    const count = await Currency.countDocuments({ deletedAt: null });
    const shouldBeDefault = is_default || count === 0;

    const currency = await Currency.create({
      name,
      symbol,
      code,
      is_default: shouldBeDefault,
    });

    await adminsLogsHelper(req, "Currency created successfully");
    return res.status(201).json({
      status: "success",
      message: "Currency created successfully",
      data: currency,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getCurrencies = async (req, res) => {
  try {
    const query = { deletedAt: null };
    const options = generateOptions(req);

    const result = await Currency.paginate(query, options);

    return res.status(200).json({
      status: "success",
      message: "Currencies fetched successfully",
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

export const getCurrencyById = async (req, res) => {
  try {
    const { id } = req.params;

    const currency = await Currency.findOne({ _id: id, deletedAt: null });

    if (!currency) {
      return res.status(404).json({
        status: "error",
        message: "Currency not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Currency fetched successfully",
      data: currency,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateCurrency = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, symbol, code, is_default } = req.body;

    const currency = await Currency.findOne({ _id: id, deletedAt: null });

    if (!currency) {
      return res.status(404).json({
        status: "error",
        message: "Currency not found",
      });
    }

    // If setting this as default, unset all others first
    if (is_default) {
      await Currency.updateMany(
        { deletedAt: null, is_default: true, _id: { $ne: id } },
        { is_default: false }
      );
    }

    if (name) currency.name = name;
    if (symbol) currency.symbol = symbol;
    if (code) currency.code = code;
    if (typeof is_default === "boolean") currency.is_default = is_default;

    await currency.save();
    await adminsLogsHelper(req, "Currency updated successfully");

    return res.status(200).json({
      status: "success",
      message: "Currency updated successfully",
      data: currency,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteCurrency = async (req, res) => {
  try {
    const { id } = req.params;

    const currency = await Currency.findOne({ _id: id, deletedAt: null });

    if (!currency) {
      return res.status(404).json({
        status: "error",
        message: "Currency not found",
      });
    }

    const wasDefault = currency.is_default;

    currency.deletedAt = new Date();
    currency.is_default = false;
    await currency.save();

    // If the deleted currency was the default, promote the next available one
    if (wasDefault) {
      const next = await Currency.findOne({ deletedAt: null });
      if (next) {
        next.is_default = true;
        await next.save();
      }
    }

    await adminsLogsHelper(req, "Currency deleted successfully");
    return res.status(200).json({
      status: "success",
      message: "Currency deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
