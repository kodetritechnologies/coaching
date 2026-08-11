import "dotenv/config";
import "./DATABASE.js";
import LatestNotice from "./models/cms/latestNotice.schema.js";
import Categories from "./models/configuration/master/categories.schema.js";

async function seed() {
  try {
    // Clear all existing notices to prevent casting errors
    await LatestNotice.deleteMany({});
    console.log("Cleared existing notices.");

    const catScholarship = await Categories.findOne({ slug: "scholarship-notice" });
    const catAdmissions = await Categories.findOne({ slug: "admissions-notice" });
    const catResults = await Categories.findOne({ slug: "results-notice" });

    const notices = [
      {
        title: "VSAT 2026-27 Phase-2 National Scholarship Test registrations open",
        category: catScholarship ? catScholarship._id : null,
        slug: "vsat-2026-27-phase-2-national-scholarship-test-registrations-open",
        type: "latest_notice",
      },
      {
        title: "New admissions open for Class 11th Science Batch 2026",
        category: catAdmissions ? catAdmissions._id : null,
        slug: "new-admissions-open-class-11th-science",
        type: "latest_notice",
      },
      {
        title: "Results for the Monthly Test Series (MTS) have been published",
        category: catResults ? catResults._id : null,
        slug: "results-for-monthly-test-series",
        type: "latest_notice",
      }
    ];

    for (const notice of notices) {
      if (notice.category) {
        await LatestNotice.create(notice);
        console.log(`Created notice: ${notice.title}`);
      } else {
        console.log(`Failed to find category for notice: ${notice.title}`);
      }
    }
    console.log("Notices seeded successfully!");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
}

setTimeout(seed, 2000);
