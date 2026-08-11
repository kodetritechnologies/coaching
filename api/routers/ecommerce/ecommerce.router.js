import express from "express";
const router = express.Router();

import {
  adminCustomerclaimCoupan,
  createCoupan,
  deleteCoupan,
  getCoupan,
  getCoupanById,
  getTrashCoupan,
  multiDeleteCoupan,
  updateCoupan,
} from "../../controllers/ecommerce/coupan.controller.js";
import { adminAuthMiddleware } from "../../middlewares/adminAuthMiddleware.js";
import {
  createNotifications,
  deleteNotifications,
  getNotifications,
  getNotificationsById,
  getNotificationsByType,
  multiDeleteNotifications,
  updateNotifications,
} from "../../controllers/ecommerce/notification.controller.js";
import {
  deleteReviewAdmin,
  getAdminCustomerReviewAdmin,
  getCustomerReviewAdmin,
  multiDeleteReviewAdmin,
} from "../../controllers/ecommerce/review.controller.js";
import {
  createItem,
  deleteItem,
  getItemByID,
  getItems,
  getTrashItem,
  itemsCounts,
  multiDeleteItem,
  multiTrashItem,
  restoreTrashItem,
  trashItem,
  updateItem,
} from "../../controllers/ecommerce/item.controller.js";
import { uploadMiddleware } from "../../helpers/fileUploads.js";
import {
  deleteAdminCustomerWishlist,
  getAdminCustomerWishlist,
  multiDeleteAdminCustomerWishlist,
} from "../../controllers/ecommerce/wishlist.controller.js";
import {
  deleteAdminCustomerAddress,
  getAllAdminCustomerAddress,
  getCustomerAddressById,
  updateAdminCustomerAddress,
} from "../../controllers/ecommerce/address.controller.js";
import { getAllAdminCustomerCart } from "../../controllers/ecommerce/cart.controller.js";

// Item routes

router.get("/item", adminAuthMiddleware, getItems);
router.get("/item/trash", adminAuthMiddleware, getTrashItem);
router.get("/item/by/:id", adminAuthMiddleware, getItemByID);
router.post("/item/create", uploadMiddleware, adminAuthMiddleware, createItem);
router.patch(
  "/item/update/:id",
  uploadMiddleware,
  adminAuthMiddleware,
  updateItem
);
router.delete("/item/delete/:id", adminAuthMiddleware, deleteItem);
router.delete("/item/trash/:id", adminAuthMiddleware, trashItem);
router.post("/item/multi-trash", adminAuthMiddleware, multiTrashItem);
router.post("/item/multi-delete", adminAuthMiddleware, multiDeleteItem);
router.delete("/item/restore/:id", adminAuthMiddleware, restoreTrashItem);
router.get("/item/counts", adminAuthMiddleware, itemsCounts);

// Coupan routes
router.get("/coupan", adminAuthMiddleware, getCoupan);
router.get("/coupan/:id", adminAuthMiddleware, adminCustomerclaimCoupan);
router.get("/coupan/trash", adminAuthMiddleware, getTrashCoupan);
router.get("/coupan/by/:id", adminAuthMiddleware, getCoupanById);
router.post("/coupan/create", adminAuthMiddleware, createCoupan);
router.patch("/coupan/update/:id", adminAuthMiddleware, updateCoupan);
router.delete("/coupan/delete/:id", adminAuthMiddleware, deleteCoupan);
router.post("/coupan/multi-delete", adminAuthMiddleware, multiDeleteCoupan);

// Notification routes
router.get("/notifications", adminAuthMiddleware, getNotifications);
router.get("/notifications/get/:id", adminAuthMiddleware, getNotificationsById);
router.get(
  "/notifications/type/:type",
  adminAuthMiddleware,
  getNotificationsByType
);
router.post("/notifications/create", adminAuthMiddleware, createNotifications);
router.patch(
  "/notifications/update/:id",
  adminAuthMiddleware,
  updateNotifications
);
router.delete(
  "/notifications/delete/:id",
  adminAuthMiddleware,
  deleteNotifications
);
router.post(
  "/notifications/multi-delete",
  adminAuthMiddleware,
  multiDeleteNotifications
);

// Reviews

router.get("/reviews", adminAuthMiddleware, getCustomerReviewAdmin);
router.delete("/reviews/delete/:id", adminAuthMiddleware, deleteReviewAdmin);
router.post(
  "/reviews/multi-delete",
  adminAuthMiddleware,
  multiDeleteReviewAdmin
);

// Admin customer reviews

router.get(
  "/customer/reviews/:id",
  adminAuthMiddleware,
  getAdminCustomerReviewAdmin
);

// Wishlist

router.get("/wishlist/:id", adminAuthMiddleware, getAdminCustomerWishlist);
router.delete(
  "/wishlist/delete/:id",
  adminAuthMiddleware,
  deleteAdminCustomerWishlist
);
router.post(
  "/wishlist/multi-delete",
  adminAuthMiddleware,
  multiDeleteAdminCustomerWishlist
);

// Address

router.get("/address/all/:id", adminAuthMiddleware, getAllAdminCustomerAddress);
router.get("/address/byId/:id", adminAuthMiddleware, getCustomerAddressById);
router.patch(
  "/address/update/:id",
  adminAuthMiddleware,
  updateAdminCustomerAddress
);
router.delete(
  "/address/delete/:id",
  adminAuthMiddleware,
  deleteAdminCustomerAddress
);

// Cart

router.get("/cart/:id", adminAuthMiddleware, getAllAdminCustomerCart);

export default router;
