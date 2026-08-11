import express from "express";
const router = express.Router();
import { getFrontendNavigationBySlug } from "../../controllers/cms/navigation.controller.js";
import { createContact } from "../../controllers/cms/contact.controller.js";
import { getFrontendGalleryBySlug } from "../../controllers/cms/gallery.controller.js";
import {
  getPostsBySlug,
  getPostsByType,
  getRecentPostsByType,
  getRelatedPosts,
} from "../../controllers/cms/post.controller.js";
import { getFrontendSlidersBySlug } from "../../controllers/cms/slider.controller.js";
import { getFrontendTestimonialByType } from "../../controllers/cms/testimonial.controller.js";
import { getFrontendFaqBySlug, getFrontendAllFaqs } from "../../controllers/cms/faq.controller.js";
import { getFrontendNotices } from "../../controllers/cms/latestNotice.controller.js";

// contact us
router.post("/contact/create", createContact);

// Gallery
router.get("/gallery/:slug", getFrontendGalleryBySlug);

// Posts

router.get("/posts/type/:type", getPostsByType);
router.get("/posts/recent/:type", getRecentPostsByType);
router.get("/posts/related/:slug", getRelatedPosts);
router.get("/posts/:slug", getPostsBySlug);

// slider

router.get("/slider/:slug", getFrontendSlidersBySlug);

// Testimonial

router.get("/testimonial/type/:type", getFrontendTestimonialByType);

// Faqs

// Faqs
router.get("/faqs/all", getFrontendAllFaqs);
router.get("/faqs/:slug", getFrontendFaqBySlug);

// Navigation

router.get("/navigation/:slug", getFrontendNavigationBySlug);

// Latest Notices
router.get("/latest-notices", getFrontendNotices);

export default router;
