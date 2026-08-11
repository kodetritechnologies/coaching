import express from "express";
const router = express.Router();
import { adminAuthMiddleware } from "../../middlewares/adminAuthMiddleware.js";
import {
  dashboardCounts,
  recentProducts,
} from "../../controllers/dashboard/dashboard.controller.js";

router.get("/count", adminAuthMiddleware, dashboardCounts);
router.get("/recent-item", adminAuthMiddleware, recentProducts);

export default router;
