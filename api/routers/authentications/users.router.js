import express from "express";
const router = express.Router();
import {
  adminCreate,
  adminLogin,
  adminLogOut,
  adminSignup,
  adminUpdate,
  getAdminData,
} from "../../controllers/authentications/admin.controller.js";
import {
  adminCustomerCreate,
  adminCustomerDelete,
  adminCustomerMultiDelete,
  adminCustomerMultiTrash,
  adminCustomerRestoreTrash,
  adminCustomerTrash,
  adminCustomerUpdate,
  customerLogin,
  customerSignup,
  CustomerUpdate,
  getAdminCustomerById,
  getAdminCustomers,
  getAdminCustomersTrash,
  getCustomerProfile,
  customerLogOut,
  getCustomerDashboardStats,
} from "../../controllers/authentications/customer.controller.js";
import {
  ownerCreate,
  ownerLogin,
  ownerLogOut,
  ownerSignup,
  ownerUpdate,
  getOwnerData,
} from "../../controllers/authentications/owner.controller.js";
import { adminAuthMiddleware } from "../../middlewares/adminAuthMiddleware.js";
import { customerAuthMiddleware } from "../../middlewares/customerAuthMiddleware.js";
import { uploadMiddleware } from "../../helpers/fileUploads.js";
import { ownerAuthMiddleware } from "../../middlewares/ownerAuthMiddleware.js";

// Admin Routes
router.post("/admin/signup", adminSignup);
router.post("/admin/login", adminLogin);
router.get("/admin/getAdmin", adminAuthMiddleware, getAdminData);
router.post("/admin/create", adminCreate);
router.patch(
  "/admin/update/:id",
  uploadMiddleware,
  adminAuthMiddleware,
  adminUpdate,
);
router.get("/admin/logout", adminAuthMiddleware, adminLogOut);

// Owner Routes

router.post("/owner/signup", ownerSignup);
router.post("/owner/login", ownerLogin);
router.get("/owner/getOwner", ownerAuthMiddleware, getOwnerData);
router.post("/owner/create", ownerCreate);
router.patch(
  "/owner/update/:id",
  uploadMiddleware,
  ownerAuthMiddleware,
  ownerUpdate,
);
router.get("/owner/logout", ownerAuthMiddleware, ownerLogOut);

// Customer Routes

// public routes
router.post("/customer/signup", customerSignup);
router.post("/customer/login", customerLogin);
router.post(
  "/customer/update",
  uploadMiddleware,
  customerAuthMiddleware,
  CustomerUpdate,
);
router.get("/customer/profile", customerAuthMiddleware, getCustomerProfile);
router.get("/customer/logout", customerAuthMiddleware, customerLogOut);
router.get(
  "/customer/dashboard",
  customerAuthMiddleware,
  getCustomerDashboardStats,
);

// admin routes
router.post(
  "/admin/customer/create",
  uploadMiddleware,
  adminAuthMiddleware,
  adminCustomerCreate,
);
router.get("/admin/customers/all", adminAuthMiddleware, getAdminCustomers);
router.get(
  "/admin/customers/trash/all",
  adminAuthMiddleware,
  getAdminCustomersTrash,
);
router.get(
  "/admin/customer/byId/:id",
  adminAuthMiddleware,
  getAdminCustomerById,
);
router.patch(
  "/admin/customer/update/:id",
  uploadMiddleware,
  adminAuthMiddleware,
  adminCustomerUpdate,
);
router.delete(
  "/admin/customer/delete/:id",
  adminAuthMiddleware,
  adminCustomerDelete,
);
router.delete(
  "/admin/customer/trash/:id",
  adminAuthMiddleware,
  adminCustomerTrash,
);
router.post(
  "/admin/customer/multi-delete",
  adminAuthMiddleware,
  adminCustomerMultiDelete,
);
router.post(
  "/admin/customer/multi-trash",
  adminAuthMiddleware,
  adminCustomerMultiTrash,
);
router.delete(
  "/admin/customer/restore/:id",
  adminAuthMiddleware,
  adminCustomerRestoreTrash,
);

export default router;
