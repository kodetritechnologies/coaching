import "dotenv/config";
import "./DATABASE.js";
import Footer from "./models/configuration/setting/footer.schema.js";

async function rename() {
  try {
    await Footer.findOneAndUpdate(
      { type: "support_links" },
      { type: "quick_navigation" }
    );
    console.log("Renamed support_links to quick_navigation");
  } catch (err) {
    console.log(err);
  } finally {
    process.exit(0);
  }
}

setTimeout(rename, 2000);
