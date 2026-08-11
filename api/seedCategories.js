import "dotenv/config";
import "./DATABASE.js";
import Categories from "./models/configuration/master/categories.schema.js";

async function seed() {
  try {
    const categories = [
      { name: "Latest Notice", slug: "latest-notice-generic", type: "latest_notice" },
      { name: "Scholarship", slug: "scholarship-notice", type: "latest_notice" },
      { name: "Admissions", slug: "admissions-notice", type: "latest_notice" },
      { name: "Results", slug: "results-notice", type: "latest_notice" }
    ];
    for (const cat of categories) {
      const existing = await Categories.findOne({ slug: cat.slug });
      if (!existing) {
        await Categories.create(cat);
        console.log(`Created category: ${cat.name}`);
      } else {
        console.log(`Category already exists: ${cat.name}`);
      }
    }
    console.log("Categories seeded successfully!");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
}

// Give mongoose connection a moment to establish
setTimeout(seed, 2000);
