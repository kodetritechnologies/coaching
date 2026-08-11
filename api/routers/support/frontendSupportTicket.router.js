import express from "express";
const router = express.Router();
import { customerAuthMiddleware } from "../../middlewares/customerAuthMiddleware.js";
import {
  createSupportTicketCustomer,
  deleteSupportTicketCustomer,
  getAllSupportTicketCustomer,
  getSupportTicketByIdCustomer,
  multiDeleteSupportTicketCustomer,
  replySupportTicketCustomer,
} from "../../controllers/support/support-ticket.controller.js";

import { uploadMiddleware } from "../../helpers/fileUploads.js";

router.get("/", customerAuthMiddleware, getAllSupportTicketCustomer);
router.get("/:id", customerAuthMiddleware, getSupportTicketByIdCustomer);

router.post(
  "/create",
  uploadMiddleware,
  customerAuthMiddleware,
  createSupportTicketCustomer,
);
router.patch(
  "/reply/:id",
  uploadMiddleware,
  customerAuthMiddleware,
  replySupportTicketCustomer,
);
router.delete(
  "/delete/:id",
  customerAuthMiddleware,
  deleteSupportTicketCustomer,
);
router.post(
  "/multi-delete",
  customerAuthMiddleware,
  multiDeleteSupportTicketCustomer,
);


export default router;
