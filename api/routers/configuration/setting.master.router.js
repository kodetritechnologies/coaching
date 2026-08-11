import express from "express";
const router = express.Router();
import { adminAuthMiddleware } from "../../middlewares/adminAuthMiddleware.js";
import {
  createPayment,
  getpayment,
} from "../../controllers/configuration/setting/payment.controller.js";
import {
  createFooter,
  getFooter,
} from "../../controllers/configuration/setting/footer.controller.js";
import {
  createStore,
  getStore,
} from "../../controllers/configuration/setting/store.controller.js";
import {
  multiDeleteBrands,
  createBrands,
  deleteBrands,
  getBrands,
  getBrandsById,
  getBrandsByType,
  updateBrands,
} from "../../controllers/configuration/master/brands.controller.js";
import {
  createTages,
  deleteTages,
  getTages,
  getTagesById,
  getTagesByType,
  multiDeleteTages,
  updateTages,
} from "../../controllers/configuration/master/tages.controller.js";
import {
  categoriesTypes,
  createCategories,
  deleteCategory,
  getCategoryById,
  getCategoryByType,
  updateCategory,
} from "../../controllers/configuration/master/categories.controller.js";
import {
  createRegions,
  deleteRegions,
  getRegionsById,
  regionsByType,
  regionsTypes,
  updateRegions,
} from "../../controllers/configuration/master/regions.controller.js";
import { uploadMiddleware } from "../../helpers/fileUploads.js";
import {
  createSmtp,
  getSmtp,
} from "../../controllers/configuration/setting/smtp.controller.js";
import {
  getStatusByType,
  createStatus,
  deleteStatus,
  getStatus,
  getStatusById,
  multiDeleteStatus,
  updateStatus,
} from "../../controllers/configuration/master/status.controller.js";
import {
  createCurrency,
  getCurrencies,
  getCurrencyById,
  updateCurrency,
  deleteCurrency,
} from "../../controllers/configuration/setting/currency.controller.js";

// Setting Routes


// payment
router.get("/payment/gatway/:id", adminAuthMiddleware, getpayment);
router.post("/payment/create", adminAuthMiddleware, createPayment);

// footer
router.get("/footer/type/:type", adminAuthMiddleware, getFooter);
router.post("/footer/create", adminAuthMiddleware, createFooter);

// store
router.get("/store/type/:type", adminAuthMiddleware, getStore);
router.post("/store/create", adminAuthMiddleware, createStore);

// Smtp

router.get("/smtp", adminAuthMiddleware, getSmtp);
router.post("/smtp/create", adminAuthMiddleware, createSmtp);

// Currency
router.get("/currency", adminAuthMiddleware, getCurrencies);
router.get("/currency/byId/:id", adminAuthMiddleware, getCurrencyById);
router.post("/currency/create", adminAuthMiddleware, createCurrency);
router.patch("/currency/update/:id", adminAuthMiddleware, updateCurrency);
router.delete("/currency/delete/:id", adminAuthMiddleware, deleteCurrency);

// Master Routes

// Categories
router.post("/categories/create", uploadMiddleware, adminAuthMiddleware, createCategories);
router.get("/categories/types", adminAuthMiddleware, categoriesTypes);
router.get("/categories/byId/:id", adminAuthMiddleware, getCategoryById);
router.get("/categories/byType/:type", adminAuthMiddleware, getCategoryByType);
router.patch("/categories/update/:id", uploadMiddleware, adminAuthMiddleware, updateCategory);
router.delete("/categories/delete/:id", adminAuthMiddleware, deleteCategory);

// Regions
router.post("/regions/create", adminAuthMiddleware, createRegions);
router.get("/regions/types", adminAuthMiddleware, regionsTypes);
router.get("/regions/byId/:id", adminAuthMiddleware, getRegionsById);
router.get("/regions/byType/:type", adminAuthMiddleware, regionsByType);
router.patch("/regions/update/:id", adminAuthMiddleware, updateRegions);
router.delete("/regions/delete/:id", adminAuthMiddleware, deleteRegions);

// Brands

router.get("/brands", adminAuthMiddleware, getBrands);
router.get("/brands/get/:id", adminAuthMiddleware, getBrandsById);
router.get("/brands/type/:type", adminAuthMiddleware, getBrandsByType);
router.post(
  "/brands/create",
  uploadMiddleware,
  adminAuthMiddleware,
  createBrands
);
router.patch(
  "/brands/update/:id",
  uploadMiddleware,
  adminAuthMiddleware,
  updateBrands
);
router.delete("/brands/delete/:id", adminAuthMiddleware, deleteBrands);
router.post("/brands/multi-delete", adminAuthMiddleware, multiDeleteBrands);

// Tages
router.get("/tages", adminAuthMiddleware, getTages);
router.get("/tages/get/:id", adminAuthMiddleware, getTagesById);
router.get("/tages/type/:type", adminAuthMiddleware, getTagesByType);
router.post(
  "/tages/create",
  uploadMiddleware,
  adminAuthMiddleware,
  createTages
);
router.patch(
  "/tages/update/:id",
  uploadMiddleware,
  adminAuthMiddleware,
  updateTages
);
router.delete("/tages/delete/:id", adminAuthMiddleware, deleteTages);
router.post("/tages/multi-delete", adminAuthMiddleware, multiDeleteTages);

// status

router.get("/status", adminAuthMiddleware, getStatus);
router.get("/status/get/:id", adminAuthMiddleware, getStatusById);
router.get("/status/type/:type", adminAuthMiddleware, getStatusByType);
router.post(
  "/status/create",
  uploadMiddleware,
  adminAuthMiddleware,
  createStatus
);
router.patch(
  "/status/update/:id",
  uploadMiddleware,
  adminAuthMiddleware,
  updateStatus
);
router.delete("/status/delete/:id", adminAuthMiddleware, deleteStatus);
router.post("/status/multi-delete", adminAuthMiddleware, multiDeleteStatus);

export default router;
