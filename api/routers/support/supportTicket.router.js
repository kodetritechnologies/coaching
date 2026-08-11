import express from "express";
const router = express.Router();
import { adminAuthMiddleware } from "../../middlewares/adminAuthMiddleware.js";
import {
  deleteSupportTicketAdmin,
  generateSupportTicketAdmin,
  getAdminCustomerSupport,
  getAllAdminCustomerSupportTicket,
  getSupportTicketAdmin,
  getSupportTicketByIdAdmin,
  multiDeleteSupportTicketAdmin,
  replySupportTicketAdmin,
} from "../../controllers/support/support-ticket.controller.js";
import { uploadMiddleware } from "../../helpers/fileUploads.js";

router.get("/support-ticket", adminAuthMiddleware, getSupportTicketAdmin);
router.post(
  "/support-ticket/create",
  uploadMiddleware,
  adminAuthMiddleware,
  generateSupportTicketAdmin
);
router.get(
  "/support-ticket/by/:id",
  adminAuthMiddleware,
  getSupportTicketByIdAdmin
);
router.patch(
  "/support-ticket/reply/:id",
  uploadMiddleware,
  adminAuthMiddleware,
  replySupportTicketAdmin
);
router.delete(
  "/support-ticket/delete/:id",
  adminAuthMiddleware,
  deleteSupportTicketAdmin
);
router.post(
  "/support-ticket/multi-delete",
  adminAuthMiddleware,
  multiDeleteSupportTicketAdmin
);

// Admin customer Support Ticket

router.get("/support-ticket/:id", adminAuthMiddleware, getAdminCustomerSupport);

// customer support ticket

router.get(
  "/admin/customer",
  adminAuthMiddleware,
  getAllAdminCustomerSupportTicket
);

export default router;
