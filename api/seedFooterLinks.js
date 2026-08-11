import mongoose from "mongoose";
import "dotenv/config";
import "./DATABASE.js";
import Footer from "./models/configuration/setting/footer.schema.js";

async function seed() {
  try {
    const admin = await mongoose.connection.db.collection('admins').findOne();
    if (!admin) throw new Error("No admin found");

    const quickLinksContent = `
      <ul class="mt-4 space-y-2 text-sm text-primary-foreground/85">
        <li>
          <a href="/courses/jee" class="hover:text-accent transition-colors flex items-center justify-between">
            <span>IIT-JEE (Main + Advanced)</span>
            <span class="text-[10px] rounded bg-white/10 px-1.5 py-0.5">Engg</span>
          </a>
        </li>
        <li>
          <a href="/courses/neet" class="hover:text-accent transition-colors flex items-center justify-between">
            <span>NEET UG Medical</span>
            <span class="text-[10px] rounded bg-white/10 px-1.5 py-0.5">Medical</span>
          </a>
        </li>
        <li>
          <a href="/courses/foundation" class="hover:text-accent transition-colors">
            Class 6–10 Olympiad Foundation
          </a>
        </li>
        <li>
          <a href="/courses/cuet" class="hover:text-accent transition-colors">
            CUET UG University Entrance
          </a>
        </li>
        <li>
          <a href="/courses/nda" class="hover:text-accent transition-colors">
            NDA & Defence Academy + SSB
          </a>
        </li>
        <li>
          <a href="/courses/ssc" class="hover:text-accent transition-colors">
            SSC CGL, CHSL & Railways
          </a>
        </li>
        <li>
          <a href="/courses/banking" class="hover:text-accent transition-colors">
            Banking (IBPS / SBI PO)
          </a>
        </li>
        <li>
          <a href="/test-series" class="hover:text-accent transition-colors font-semibold text-accent">
            All-India Test Series (AIATS) →
          </a>
        </li>
      </ul>
    `;

    const supportLinksContent = `
      <ul class="mt-4 space-y-2 text-sm text-primary-foreground/85">
        <li>
          <a href="/about" class="hover:text-accent transition-colors">
            About Institute & Director Message
          </a>
        </li>
        <li>
          <a href="/results" class="hover:text-accent transition-colors">
            Results 2025 & Wall of Fame
          </a>
        </li>
        <li>
          <a href="/faculty" class="hover:text-accent transition-colors">
            Star Faculty & Mentors
          </a>
        </li>
        <li>
          <a href="/scholarship" class="hover:text-accent transition-colors font-semibold text-accent">
            VSAT National Scholarship 2026
          </a>
        </li>
        <li>
          <a href="/admissions" class="hover:text-accent transition-colors">
            Admission Process & Hostel Facilities
          </a>
        </li>
        <li>
          <a href="/study-material" class="hover:text-accent transition-colors">
            Study Material & Free Downloads
          </a>
        </li>
        <li>
          <a href="/gallery" class="hover:text-accent transition-colors">
            Campus Infrastructure Gallery
          </a>
        </li>
        <li>
          <a href="/blog" class="hover:text-accent transition-colors">
            Exam Strategy Articles & Tips
          </a>
        </li>
      </ul>
    `;

    const campusCentersContent = `
      <ul class="mt-4 space-y-3 text-xs text-primary-foreground/80">
        <li class="border-b border-white/5 pb-2">
          <p class="font-semibold text-white">Indore Central Campus (HQ)</p>
          <p class="mt-0.5 truncate text-primary-foreground/60">21-24, Scheme No. 54, PU-4 Commercial, Near Vijay Nagar Square, Indore, MP 452010</p>
          <p class="mt-0.5 text-accent font-medium">+91 731 4209900</p>
        </li>
        <li class="border-b border-white/5 pb-2">
          <p class="font-semibold text-white">Bhopal MP Nagar Campus</p>
          <p class="mt-0.5 truncate text-primary-foreground/60">Plot 14, Zone-II, Maharana Pratap Nagar, Bhopal, MP 462011</p>
          <p class="mt-0.5 text-accent font-medium">+91 755 4910200</p>
        </li>
        <li class="border-b border-white/5 pb-2">
          <p class="font-semibold text-white">Jabalpur Civic Centre Campus</p>
          <p class="mt-0.5 truncate text-primary-foreground/60">3rd & 4th Floor, City Tower, Wright Town, Jabalpur, MP 482002</p>
          <p class="mt-0.5 text-accent font-medium">+91 761 4055100</p>
        </li>
        <li class="border-b border-white/5 pb-2">
          <p class="font-semibold text-white">Gwalior City Centre Campus</p>
          <p class="mt-0.5 truncate text-primary-foreground/60">Shree Ram Plaza, New High Court Road, City Centre, Gwalior, MP 474011</p>
          <p class="mt-0.5 text-accent font-medium">+91 751 4088300</p>
        </li>
      </ul>
      <div class="mt-4">
        <a href="/contact" class="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline">
          View all 6 Campus Locations & Maps →
        </a>
      </div>
    `;

    await Footer.findOneAndUpdate(
      { type: "quick_links" },
      { value: { content: quickLinksContent }, admin: admin._id },
      { upsert: true }
    );

    await Footer.findOneAndUpdate(
      { type: "support_links" },
      { value: { content: supportLinksContent }, admin: admin._id },
      { upsert: true }
    );

    await Footer.findOneAndUpdate(
      { type: "campus_centers" },
      { value: { content: campusCentersContent }, admin: admin._id },
      { upsert: true }
    );

    console.log("Footer links seeded successfully!");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
}

setTimeout(seed, 2000);
