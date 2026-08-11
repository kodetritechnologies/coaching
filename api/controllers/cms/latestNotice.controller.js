import { adminsLogsHelper } from "../../helpers/adminsLogsHelper.js";
import {
  generateOptions,
  GenerateSearchQuery,
} from "../../helpers/mongooseHelper.js";
import { slugGenerator } from "../../helpers/slugGenerator.js";
import LatestNotice from "../../models/cms/latestNotice.schema.js";

export const getNotice = async (req, res) => {
  try {
    const { _id } = req.admin;

    const query = GenerateSearchQuery(req, {
      deletedAt: null,
      type: "latest_notice",
    });
    const options = generateOptions(req);
    const Notices = await LatestNotice.paginate(query, options);

    return res.status(200).json({
      status: "success",
      message: "fetch notices successfully",
      data: Notices,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getTrashNotice = async (req, res) => {
  try {
    const { _id } = req.admin;
    const query = GenerateSearchQuery(req, {
      deletedAt: { $ne: null },
      type: "latest_notice",
    });
    const options = generateOptions(req);
    const Notices = await LatestNotice.paginate(query, options);

    return res.status(200).json({
      status: "success",
      message: "fetch Trash notices successfully",
      data: Notices,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getNoticeById = async (req, res) => {
  try {
    const { _id } = req.admin;
    const { id } = req.params;
    const query = {
      _id: id,
      type: "latest_notice",
      deletedAt: null,
    };

    const Notice = await LatestNotice.findOne(query);

    return res.status(200).json({
      status: "success",
      message: "fetch notice successfully",
      data: Notice,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const createNotice = async (req, res) => {
  try {
    const { _id } = req.admin;
    const data = req.body;
    const slug = await slugGenerator(data.title, LatestNotice);
    const payload = {
      ...data,
      slug,
    };

    const result = await LatestNotice.create(payload);
    await adminsLogsHelper(req, "LatestNotice create successfully");
    return res.status(201).json({
      status: "success",
      message: "LatestNotice created successfully",
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

export const updateNotice = async (req, res) => {
  try {
    const { _id } = req.admin;
    const { id } = req.params;
    const data = req.body;

    const query = {
      _id: id,
      type: "latest_notice",
    };

    let slug = data?.title
      ? await slugGenerator(data.title, LatestNotice)
      : undefined;
    const payload = {
      ...data,
      slug: slug || data.slug,
    };
    const updatedNotice = await LatestNotice.findOneAndUpdate(query, payload, {
      new: true,
      runValidators: true,
    });

    if (!updatedNotice) {
      return res.status(404).json({
        status: "error",
        message: "LatestNotice not found",
      });
    }
    await adminsLogsHelper(req, "LatestNotice update successfully");
    return res.status(200).json({
      status: "success",
      message: "LatestNotice updated successfully",
      data: updatedNotice,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    const { _id } = req.admin;
    const { id } = req.params;

    const query = {
      _id: id,
      type: "latest_notice",
    };
    const deletedNotice = await LatestNotice.findOneAndDelete(query);
    if (!deletedNotice) {
      return res.status(404).json({
        status: "error",
        message: "LatestNotice not found",
      });
    }

    await adminsLogsHelper(req, "LatestNotice Delete successfully");
    return res.status(200).json({
      status: "success",
      message: "LatestNotice permanently deleted successfully",
      data: deletedNotice,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const trashNotice = async (req, res) => {
  try {
    const { _id } = req.admin;
    const { id } = req.params;

    const query = {
      _id: id,
      type: "latest_notice",
      deletedAt: null,
    };
    const update = {
      deletedAt: new Date(),
    };

    const trashedNotice = await LatestNotice.findOneAndUpdate(query, update, {
      new: true,
    });
    if (!trashedNotice) {
      return res.status(404).json({
        status: "error",
        message: "LatestNotice not found or already trashed",
      });
    }
    await adminsLogsHelper(req, "LatestNotice move to Trash successfully");
    return res.status(200).json({
      status: "success",
      message: "LatestNotice moved to trash successfully",
      data: trashedNotice,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const restoreTrashNotice = async (req, res) => {
  try {
    const { _id } = req.admin;
    const { id } = req.params;

    const query = {
      _id: id,
      type: "latest_notice",
      deletedAt: { $ne: null },
    };
    const update = {
      deletedAt: null,
    };

    const restoredNotice = await LatestNotice.findOneAndUpdate(query, update, {
      new: true,
    });
    if (!restoredNotice) {
      return res.status(404).json({
        status: "error",
        message: "Trashed LatestNotice not found",
      });
    }
    await adminsLogsHelper(req, "LatestNotice Restore successfully");
    return res.status(200).json({
      status: "success",
      message: "LatestNotice restored successfully",
      data: restoredNotice,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const multiTrashNotice = async (req, res) => {
  try {
    const { ids } = req.body;
    const { _id } = req.admin;

    const query = {
      _id: { $in: ids },
      type: "latest_notice",
      deletedAt: null,
    };
    const update = {
      deletedAt: new Date(),
    };
    await LatestNotice.updateMany(query, update);
    await adminsLogsHelper(req, "LatestNotice Multi move to Trash successfully");
    res.status(200).json({
      status: "success",
      message: "Notice moved to trash.",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const multiDeleteNotice = async (req, res) => {
  try {
    const { ids } = req.body;
    const { _id } = req.admin;

    const query = {
      _id: { $in: ids },
      type: "latest_notice",
    };
    await LatestNotice.deleteMany(query);
    await adminsLogsHelper(req, "LatestNotice Multi Delete successfully");
    res.status(200).json({
      status: "success",
      message: "Notice permanently deleted.",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// PUBLIC API
export const getFrontendNotices = async (req, res) => {
  try {
    const query = {
      deletedAt: null,
      type: "latest_notice",
    };
    
    // Fetch latest 10 notices
    const notices = await LatestNotice.find(query).sort({ createdAt: -1 }).limit(10);

    return res.status(200).json({
      status: "success",
      message: "fetch latest notices successfully",
      data: notices,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
