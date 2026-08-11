import express from "express";
const router = express.Router();

import {
  createNotice,
  deleteNotice,
  getNotice,
  getNoticeById,
  getTrashNotice,
  multiDeleteNotice,
  multiTrashNotice,
  restoreTrashNotice,
  trashNotice,
  updateNotice,
} from "../../controllers/cms/latestNotice.controller.js";

import {
  createFaq,
  deleteFaq,
  getFaq,
  getFaqById,
  getTrashFaq,
  multiDelete,
  multiTrash,
  restoreTrash,
  trashFaq,
  updateFaq,
} from "../../controllers/cms/faq.controller.js";
import { adminAuthMiddleware } from "../../middlewares/adminAuthMiddleware.js";
import {
  createPost,
  deletePost,
  getPost,
  getPostById,
  getTrashPost,
  trashPost,
  updatePost,
  multiTrashPost,
  multiDeletePost,
  restoreTrashPost,
} from "../../controllers/cms/post.controller.js";
import {
  createTestimonial,
  deleteTestimonial,
  getTestimonial,
  getTestimonialById,
  getTrashTestimonial,
  multiDeleteTestimonial,
  multiTrashTestimonial,
  restoreTrashTestimonial,
  trashTestimonial,
  updateTestimonial,
} from "../../controllers/cms/testimonial.controller.js";
import {
  deleteContactAdmin,
  getContactAdmin,
  getContactByIdAdmin,
  getTrashContactAdmin,
  multiDeleteContactAdmin,
  multiTrashContactAdmin,
  restoreTrashContactAdmin,
  trashContactAdmin,
} from "../../controllers/cms/contact.controller.js";
import {
  createGallery,
  deleteFile,
  deleteGallery,
  getGallery,
  getGalleryById,
  getTrashGallery,
  multiDeleteGallery,
  multiTrashGallery,
  restoreTrashGallery,
  trashGallery,
  updateGallery,
} from "../../controllers/cms/gallery.controller.js";
import { uploadMiddleware } from "../../helpers/fileUploads.js";
import {
  createFiles,
  getFiles,
  multiDeleteFiles,
  deleteFiles,
} from "../../controllers/cms/files.controller.js";
import {
  createSlider,
  deleteSlider,
  getSlider,
  getSliderById,
  getTrashSlider,
  multiDeleteSlider,
  multiTrashSlider,
  restoreTrashSlider,
  trashSlider,
  updateSlider,
} from "../../controllers/cms/slider.controller.js";
import {
  createNavigation,
  deleteNavigation,
  getNavigation,
  getNavigationById,
  updateNavigation,
} from "../../controllers/cms/navigation.controller.js";

// Post routes
router.get("/post", adminAuthMiddleware, getPost);
router.get("/post/trash", adminAuthMiddleware, getTrashPost);
router.get("/post/by/:id", adminAuthMiddleware, getPostById);
router.post("/post/create", uploadMiddleware, adminAuthMiddleware, createPost);
router.patch(
  "/post/update/:id",
  uploadMiddleware,
  adminAuthMiddleware,
  updatePost
);
router.delete("/post/delete/:id", adminAuthMiddleware, deletePost);
router.delete("/post/trash/:id", adminAuthMiddleware, trashPost);
router.post("/post/multi-trash", adminAuthMiddleware, multiTrashPost);
router.post("/post/multi-delete", adminAuthMiddleware, multiDeletePost);
router.delete("/post/restore/:id", adminAuthMiddleware, restoreTrashPost);

// Testimonial routes
router.get("/testimonial", adminAuthMiddleware, getTestimonial);
router.get("/testimonial/trash", adminAuthMiddleware, getTrashTestimonial);
router.get("/testimonial/by/:id", adminAuthMiddleware, getTestimonialById);
router.post(
  "/testimonial/create",
  uploadMiddleware,
  adminAuthMiddleware,
  createTestimonial
);
router.patch(
  "/testimonial/update/:id",
  uploadMiddleware,
  adminAuthMiddleware,
  updateTestimonial
);
router.delete(
  "/testimonial/delete/:id",
  adminAuthMiddleware,
  deleteTestimonial
);
router.delete("/testimonial/trash/:id", adminAuthMiddleware, trashTestimonial);
router.post(
  "/testimonial/multi-trash",
  adminAuthMiddleware,
  multiTrashTestimonial
);
router.post(
  "/testimonial/multi-delete",
  adminAuthMiddleware,
  multiDeleteTestimonial
);
router.delete(
  "/testimonial/restore/:id",
  adminAuthMiddleware,
  restoreTrashTestimonial
);

// Gallery
router.get("/gallery", adminAuthMiddleware, getGallery);
router.get("/gallery/trash", adminAuthMiddleware, getTrashGallery);
router.get("/gallery/by/:id", adminAuthMiddleware, getGalleryById);
router.post(
  "/gallery/create",
  uploadMiddleware,
  adminAuthMiddleware,
  createGallery
);
router.patch(
  "/gallery/update/:id",
  uploadMiddleware,
  adminAuthMiddleware,
  updateGallery
);
router.delete("/gallery/delete/:id", adminAuthMiddleware, deleteGallery);
router.post("/gallery/delete/files", adminAuthMiddleware, deleteFile);
router.delete("/gallery/trash/:id", adminAuthMiddleware, trashGallery);
router.post("/gallery/multi-trash", adminAuthMiddleware, multiTrashGallery);
router.post("/gallery/multi-delete", adminAuthMiddleware, multiDeleteGallery);
router.delete("/gallery/restore/:id", adminAuthMiddleware, restoreTrashGallery);

// Slider routes

router.get("/slider", adminAuthMiddleware, getSlider);
router.get("/slider/trash", adminAuthMiddleware, getTrashSlider);
router.get("/slider/by/:id", adminAuthMiddleware, getSliderById);
router.post(
  "/slider/create",
  uploadMiddleware,
  adminAuthMiddleware,
  createSlider
);
router.patch(
  "/slider/update/:id",
  uploadMiddleware,
  adminAuthMiddleware,
  updateSlider
);
router.delete("/slider/delete/:id", adminAuthMiddleware, deleteSlider);
router.post("/slider/delete/files", adminAuthMiddleware, deleteFile);
router.delete("/slider/trash/:id", adminAuthMiddleware, trashSlider);
router.post("/slider/multi-trash", adminAuthMiddleware, multiTrashSlider);
router.post("/slider/multi-delete", adminAuthMiddleware, multiDeleteSlider);
router.delete("/slider/restore/:id", adminAuthMiddleware, restoreTrashSlider);

// FAQs routes
router.get("/faq", adminAuthMiddleware, getFaq);
router.get("/faq/trash", adminAuthMiddleware, getTrashFaq);
router.get("/faq/by/:id", adminAuthMiddleware, getFaqById);
router.post("/faq/create", adminAuthMiddleware, createFaq);
router.patch("/faq/update/:id", adminAuthMiddleware, updateFaq);
router.delete("/faq/delete/:id", adminAuthMiddleware, deleteFaq);
router.delete("/faq/trash/:id", adminAuthMiddleware, trashFaq);
router.post("/faq/multi-trash", adminAuthMiddleware, multiTrash);
router.post("/faq/multi-delete", adminAuthMiddleware, multiDelete);
router.delete("/faq/restore/:id", adminAuthMiddleware, restoreTrash);

// Contacts
router.get("/contact", adminAuthMiddleware, getContactAdmin);
router.get("/contact/trash", adminAuthMiddleware, getTrashContactAdmin);
router.get("/contact/by/:id", adminAuthMiddleware, getContactByIdAdmin);
router.delete("/contact/delete/:id", adminAuthMiddleware, deleteContactAdmin);
router.delete("/contact/trash/:id", adminAuthMiddleware, trashContactAdmin);
router.post(
  "/contact/multi-trash",
  adminAuthMiddleware,
  multiTrashContactAdmin
);
router.post(
  "/contact/multi-delete",
  adminAuthMiddleware,
  multiDeleteContactAdmin
);
router.delete(
  "/contact/restore/:id",
  adminAuthMiddleware,
  restoreTrashContactAdmin
);

// files

router.get("/files", adminAuthMiddleware, getFiles);

router.post(
  "/files/create",
  uploadMiddleware,
  adminAuthMiddleware,
  createFiles
);

router.delete("/files/delete/:id", adminAuthMiddleware, deleteFiles);

router.post("/files/multi-delete", adminAuthMiddleware, multiDeleteFiles);

// Navigation routes
router.get("/navigation", adminAuthMiddleware, getNavigation);
router.get("/navigation/by/:id", adminAuthMiddleware, getNavigationById);
router.post("/navigation/create", adminAuthMiddleware, createNavigation);
router.patch("/navigation/update/:id", adminAuthMiddleware, updateNavigation);
router.delete("/navigation/delete/:id", adminAuthMiddleware, deleteNavigation);

// Latest Notice routes
router.get("/latest-notice", adminAuthMiddleware, getNotice);
router.get("/latest-notice/trash", adminAuthMiddleware, getTrashNotice);
router.get("/latest-notice/by/:id", adminAuthMiddleware, getNoticeById);
router.post("/latest-notice/create", adminAuthMiddleware, createNotice);
router.patch("/latest-notice/update/:id", adminAuthMiddleware, updateNotice);
router.delete("/latest-notice/delete/:id", adminAuthMiddleware, deleteNotice);
router.delete("/latest-notice/trash/:id", adminAuthMiddleware, trashNotice);
router.post("/latest-notice/multi-trash", adminAuthMiddleware, multiTrashNotice);
router.post("/latest-notice/multi-delete", adminAuthMiddleware, multiDeleteNotice);
router.delete("/latest-notice/restore/:id", adminAuthMiddleware, restoreTrashNotice);

export default router;
