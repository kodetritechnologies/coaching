import "dotenv/config";
import "./DATABASE.js";
import Categories from "./models/configuration/master/categories.schema.js";
import Admin from "./models/authentications/admin.schema.js";

async function seedTrustBar() {
  try {
    const admin = await Admin.findOne();
    if (!admin) throw new Error("Admin not found");

    const items = [
      "1,247+ IIT JEE Selections",
      "2,000+ NEET UG Qualifiers",
      "AIR 42 · JEE Advanced 2025",
      "AIR 87 · NEET 2025",
      "MP Board 3× District Toppers",
      "51,200+ Students Mentored",
      "Olympiad Gold Medallists",
      "AIIMS Delhi · 14 Selections",
      "6 Campus Centers Across MP",
      "ISO 9001:2015 Certified",
    ];

    for (let i = 0; i < items.length; i++) {
      const name = items[i];
      const slug = `achievement-${Date.now()}-${i}`;
      
      const exists = await Categories.findOne({ name, type: "achievement" });
      if (!exists) {
        await Categories.create({
          name: name,
          slug: slug,
          type: "achievement"
        });
      }
    }
    console.log("Seeded Achievements into Categories");
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

setTimeout(seedTrustBar, 2000);
