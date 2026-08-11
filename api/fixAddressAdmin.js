import "dotenv/config";
import "./DATABASE.js";
import Footer from "./models/configuration/setting/footer.schema.js";
import Admin from "./models/authentications/admin.schema.js";

async function fixAddress() {
  try {
    const admin = await Admin.findOne();
    if (!admin) throw new Error("No admin found");

    await Footer.findOneAndUpdate(
      { type: "address" },
      { admin: admin._id }
    );
    console.log("Address fixed successfully");
  } catch (err) {
    console.log(err);
  } finally {
    process.exit(0);
  }
}

setTimeout(fixAddress, 2000);
