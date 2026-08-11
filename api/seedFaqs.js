import "dotenv/config";
import "./DATABASE.js";
import Faq from "./models/cms/faq.schema.js";
import Admin from "./models/authentications/admin.schema.js";

async function seedFaqs() {
  try {
    const admin = await Admin.findOne();
    if (!admin) throw new Error("Admin not found");
    
    let faq = await Faq.findOne({ slug: "home" });
    if (!faq) {
      faq = await Faq.create({
        title: "Home FAQs",
        slug: "home",
        type: "faq",
        admin: admin._id,
        values: [
          {
            ques: "What are your batch sizes?",
            ans: "We limit our batches to 30 students to ensure personalized attention and better doubt resolution."
          },
          {
            ques: "Do you provide hostel facilities?",
            ans: "Yes, we have tie-ups with premium hostels nearby that provide safe and conducive environments for study."
          },
          {
            ques: "Are there installment options for fees?",
            ans: "Absolutely! We offer flexible installment plans (2 to 4 parts) depending on the course you select."
          },
          {
            ques: "What happens if I miss a class?",
            ans: "All our lectures are recorded. You can access the recordings via your student portal and clarify doubts in special weekend sessions."
          }
        ]
      });
      console.log("Seeded Home FAQs:", faq);
    } else {
      console.log("FAQ already exists:", faq);
    }
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

setTimeout(seedFaqs, 2000);
