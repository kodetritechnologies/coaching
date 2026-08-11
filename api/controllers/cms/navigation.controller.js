import { adminsLogsHelper } from "../../helpers/adminsLogsHelper.js";
import {
  generateOptions,
  GenerateSearchQuery,
} from "../../helpers/mongooseHelper.js";
import Navigation from "../../models/cms/navigation.schema.js";

export const getNavigation = async (req, res) => {
  try {
    const query = GenerateSearchQuery(req, {});
    const options = generateOptions(req);
    const navigations = await Navigation.paginate(query, options);
    
    return res.status(200).json({
      status: "success",
      message: "fetch navigations successfully",
      data: navigations,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getNavigationById = async (req, res) => {
  try {
    const { id } = req.params;
    const navigation = await Navigation.findById(id);

    if (!navigation) {
      return res.status(404).json({
        status: "error",
        message: "Navigation not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "fetch navigation successfully",
      data: navigation,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const createNavigation = async (req, res) => {
  try {
    const data = req.body;
    
    // Check if name or slug exists
    const existing = await Navigation.findOne({ $or: [{ name: data.name }, { slug: data.slug }] });
    if (existing) {
       return res.status(400).json({
           status: "error",
           message: "Navigation name or slug already exists",
       });
    }

    const result = await Navigation.create(data);
    await adminsLogsHelper(req, "Navigation create successfully");
    
    return res.status(201).json({
      status: "success",
      message: "Navigation create successfully",
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

export const updateNavigation = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const response = await Navigation.findByIdAndUpdate(id, payload, { new: true });
    
    if (!response) {
        return res.status(404).json({
            status: "error",
            message: "Navigation not found",
        });
    }

    await adminsLogsHelper(req, "Navigation update successfully");
    
    return res.status(200).json({
      status: "success",
      message: "update successfully",
      data: response
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteNavigation = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deleteNav = await Navigation.findByIdAndDelete(id);

    if (!deleteNav) {
      return res.status(404).json({
        status: "error",
        message: "Navigation not found",
      });
    }
    
    await adminsLogsHelper(req, "Navigation delete successfully");
    
    return res.status(200).json({
      status: "success",
      message: "Navigation deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getFrontendNavigationBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const navigation = await Navigation.findOne({ slug });

    if (!navigation) {
      return res.status(404).json({
        status: "error",
        message: "Navigation not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "fetch navigation successfully",
      data: navigation,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
