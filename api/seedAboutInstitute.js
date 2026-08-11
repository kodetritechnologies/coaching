import mongoose from "mongoose";
import "dotenv/config";
import "./DATABASE.js";
import Footer from "./models/configuration/setting/footer.schema.js";

async function seed() {
  try {
    const admin = await mongoose.connection.db.collection('admins').findOne();
    if (!admin) throw new Error("No admin found");

    const aboutInstituteContent = `
      <div class="flex items-center gap-3">
        <span class="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-glow overflow-hidden">
          <span
            class="absolute inset-0 opacity-10"
            style="background-image: repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.5) 4px, rgba(255,255,255,0.5) 5px)"
          ></span>
          <span class="font-display text-xl font-black leading-none select-none" style="letter-spacing: -0.04em">VS</span>
        </span>
        <div>
          <span class="block font-display text-xl font-extrabold text-white">Vidyasetu Classes</span>
          <span class="block text-[11px] font-medium text-accent uppercase tracking-widest">National Premier Institute</span>
        </div>
      </div>

      <p class="mt-4 text-sm leading-relaxed text-primary-foreground/80">
        Pioneering concept-first classroom coaching for IIT-JEE, NEET UG, and Early Foundation since 2005. Over 50,000 students mentored with 3,000+ selections into IITs, AIIMS, and Top Medical Colleges.
      </p>

      <div class="mt-5 space-y-2 text-xs text-primary-foreground/75">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2.89 0 4.789 1.059 7 2a1 1 0 0 1 1 1v7z"></path><path d="m9 12 2 2 4-4"></path></svg>
          <span>Reg. No: MP/Bhopal/2005/12874</span>
        </div>
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>
          <span>ISO 9001:2015 Certified Coaching Institute</span>
        </div>
      </div>
    `;

    await Footer.findOneAndUpdate(
      { type: "about_institute" },
      { value: { content: aboutInstituteContent }, admin: admin._id },
      { upsert: true }
    );

    console.log("About Institute seeded successfully!");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
}

setTimeout(seed, 2000);
