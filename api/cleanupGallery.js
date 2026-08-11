import "dotenv/config";
import "./DATABASE.js";
import Gallery from "./models/cms/gallery.schema.js";
import File from "./models/file.schema.js";

async function cleanupGallery() {
  try {
    const galleryDoc = await Gallery.findOne({ slug: "home" });
    if (galleryDoc) {
      // Find files referenced in gallery
      const fileIds = galleryDoc.gallery.map(g => g._id);
      
      // Delete files from DB
      await File.deleteMany({ _id: { $in: fileIds } });
      console.log(`Deleted ${fileIds.length} dummy files from DB`);
      
      // Delete gallery
      await Gallery.deleteOne({ _id: galleryDoc._id });
      console.log("Deleted seeded Home Gallery");
    } else {
      console.log("Home Gallery not found");
    }
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

setTimeout(cleanupGallery, 2000);
