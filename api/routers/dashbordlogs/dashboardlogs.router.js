import express from "express";
const router = express.Router();
import { adminAuthMiddleware } from "../../middlewares/adminAuthMiddleware.js";
import {
  deleteAllAdminLogs,
  getAdminLogs,
} from "../../controllers/dashboardlogs/adminlogs.controller.js";

router.get("/admin/logs", adminAuthMiddleware, getAdminLogs);
router.post(
  "/admin/logs/multi-delete",
  adminAuthMiddleware,
  deleteAllAdminLogs
);

export default router;
