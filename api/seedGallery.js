import "dotenv/config";
import "./DATABASE.js";
import Gallery from "./models/cms/gallery.schema.js";
import File from "./models/file.schema.js";
import Admin from "./models/authentications/admin.schema.js";

async function seedGallery() {
  try {
    const admin = await Admin.findOne();
    if (!admin) throw new Error("Admin not found");
    
    let galleryDoc = await Gallery.findOne({ slug: "home" });
    if (!galleryDoc) {
      // Create some dummy file entries pointing to placeholders or static assets
      const images = [
        { url: "/assets/hero-classroom.jpg", caption: "Acoustic Smart Lecture Theatre", h: 800 },
        { url: "/assets/gallery-2.jpg", caption: "Advanced Physics & Chemistry Research Lab", h: 600 },
        { url: "/assets/gallery-3.jpg", caption: "Grand Annual Pratibha Samman Felicitation", h: 900 },
        { url: "/assets/gallery-1.jpg", caption: "24x7 Silent Central Library", h: 600 },
        { url: "/assets/gallery-4.jpg", caption: "Parent Counseling & Orientation Seminars", h: 800 },
        { url: "/assets/gallery-5.jpg", caption: "Main Campus Entrance & Central Helpdesk", h: 600 }
      ];

      const galleryItems = [];
      for (const img of images) {
        let file = await File.create({
          filename: img.caption,
          url: img.url,
          admin: admin._id
        });
        galleryItems.push({
          _id: file._id,
          name: img.caption,
          desc: img.caption
        });
      }

      galleryDoc = await Gallery.create({
        name: "Home Gallery",
        slug: "home",
        admin: admin._id,
        gallery: galleryItems
      });
      console.log("Seeded Home Gallery:", galleryDoc);
    } else {
      console.log("Gallery already exists:", galleryDoc);
    }
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

setTimeout(seedGallery, 2000);
