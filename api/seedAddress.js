import "dotenv/config";
import "./DATABASE.js";
import Footer from "./models/configuration/setting/footer.schema.js";

async function insertAddress() {
  const addressPayload = {
    address: "Geeta Bhawan Square, Indore, MP",
    email: "admissions@vidyasetuclasses.edu.in",
    mobile: "+91 98765 43210",
    time: "10:00 AM - 7:00 PM",
    description: "Vidyasetu Classes Headquarters"
  };

  try {
    await Footer.findOneAndUpdate(
      { type: "address" },
      { type: "address", value: addressPayload },
      { upsert: true, new: true }
    );
    console.log("Address inserted successfully");
  } catch (err) {
    console.log(err);
  } finally {
    process.exit(0);
  }
}

setTimeout(insertAddress, 2000);
