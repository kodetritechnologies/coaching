import "dotenv/config";
import "./DATABASE.js";
import Categories from "./models/configuration/master/categories.schema.js";

const courses = [
  "IIT-JEE (Main + Advanced)",
  "NEET UG Medical",
  "Olympiad Foundation (Class 6-10)",
  "CUET UG",
  "All-India Test Series (AIATS)",
  "VSAT Scholarship 2026",
];

async function seed() {
  try {
    for (const name of courses) {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      await Categories.findOneAndUpdate(
        { slug, type: "course" },
        { name, slug, type: "course" },
        { upsert: true, new: true }
      );
    }
    console.log("Courses seeded successfully");
  } catch (err) {
    console.log(err);
  } finally {
    process.exit(0);
  }
}

setTimeout(seed, 2000);
