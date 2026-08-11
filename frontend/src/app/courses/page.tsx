"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Users,
  Award,
  Download,
  Filter,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ActionButton, Reveal } from "@/components/site/primitives";
import { QuickEnquiryModal } from "@/components/site/QuickEnquiryModal";
import { coursesData } from "@/data/coachingData";

const title = "Courses & Academic Programs — IIT-JEE, NEET, Foundation & Govt Exams";
const description =
  "Explore comprehensive classroom & hybrid coaching programs for Class 6 to 12th Pass students. Structured pedagogy, Kota faculty, and proven results.";



const filterCategories = [
  { id: "all", label: "All Programs" },
  { id: "Engineering", label: "IIT-JEE" },
  { id: "Medical", label: "NEET Medical" },
  { id: "Foundation", label: "Class 6–10 Foundation" },
  { id: "University", label: "CUET UG" },
  { id: "Defence", label: "NDA & Defence" },
  { id: "Government", label: "SSC & Banking" },
];

export default function CoursesDirectoryPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>();

  const filteredCourses =
    activeFilter === "all"
      ? coursesData
      : coursesData.filter((c) => {
          if (activeFilter === "Engineering") return c.targetExam.includes("JEE");
          if (activeFilter === "Medical") return c.targetExam.includes("NEET");
          if (activeFilter === "Foundation") return c.targetExam.includes("Foundation") || c.targetExam.includes("Olympiad");
          if (activeFilter === "University") return c.targetExam.includes("CUET");
          if (activeFilter === "Defence") return c.targetExam.includes("NDA");
          if (activeFilter === "Government") return c.targetExam.includes("SSC") || c.targetExam.includes("Bank");
          return true;
        });

  const handleEnquire = (courseName: string) => {
    setSelectedCourse(courseName);
    setEnquiryOpen(true);
  };

  return (
    <div className="bg-background">
      <PageHero
        badge="Session 2026–27 Admissions"
        title="Comprehensive Classroom &amp; Integrated Programs"
        description="Every course is meticulously designed with a multi-phase syllabus completion, daily practice problem sheets (DPPs), and weekly All-India rank benchmarking."
        breadcrumbs={[{ label: "Courses" }]}
        actions={
          <>
            <ActionButton onClick={() => handleEnquire("General Enquiry")} variant="accent" size="lg">
              Download Course Brochure
            </ActionButton>
            <ActionButton to="/scholarship" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              Check VSAT Scholarship
            </ActionButton>
          </>
        }
      />

      {/* Filter Tabs */}
      <section className="sticky top-[69px] z-30 border-b border-border bg-card/95 backdrop-blur-md py-3 shadow-xs">
        <div className="section-shell flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 min-w-max">
            <span className="text-xs font-bold text-muted-foreground mr-1 flex items-center gap-1">
              <Filter className="h-3.5 w-3.5" /> Filter by:
            </span>
            {filterCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeFilter === cat.id
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "border border-border bg-surface text-foreground/80 hover:border-primary hover:text-primary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground shrink-0">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Strict Batch Cap: 30 Students</span>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section-shell py-12 sm:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Reveal key={course.id}>
              <div className="group relative flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift">
                <div>
                  {/* Badge & Target */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
                      {course.tag}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {course.duration}
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="mt-4 font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    <Link href={`/courses/${course.slug}` as any}>
                      {course.name}
                    </Link>
                  </h3>
                  <p className="mt-2 text-xs font-medium text-accent uppercase tracking-wider">
                    Target: {course.targetExam} · {course.eligibility}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {course.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="mt-5 border-t border-border pt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                      Key Pedagogical Features:
                    </p>
                    <ul className="space-y-2 text-xs text-muted-foreground">
                      {course.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Batch Schedule */}
                  <div className="mt-5 rounded-2xl bg-surface p-3 text-xs">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="h-3.5 w-3.5 text-primary" /> Next Batch Starts:
                      </span>
                      <span className="font-bold text-foreground">{course.startDate || "April 2026"}</span>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between text-muted-foreground">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="h-3.5 w-3.5 text-primary" /> Timings:
                      </span>
                      <span className="font-semibold text-foreground">{course.variants?.[0]?.timing || "8:00 AM – 1:30 PM"}</span>
                    </div>
                  </div>
                </div>

                {/* Fee & Actions */}
                <div className="mt-6 border-t border-border pt-4">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-[11px] text-muted-foreground uppercase">Annual Course Fee</span>
                      <div className="font-display text-xl font-bold text-foreground">{course.feeOneTime}</div>
                    </div>
                    <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-[11px] font-bold text-success">
                      VSAT Slabs Available
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <ActionButton
                      to={`/courses/${course.slug}` as any}
                      variant="primary"
                      size="sm"
                      className="w-full"
                    >
                      View Syllabus <ArrowRight className="h-3 w-3" />
                    </ActionButton>
                    <ActionButton
                      onClick={() => handleEnquire(course.name)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      Book Demo
                    </ActionButton>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Comparison / Why Our Courses Differ Table */}
      <section className="bg-surface py-16 border-y border-border">
        <div className="section-shell">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> Institutional Comparison
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Vidyasetu vs. Mass Commercial Coachings
            </h2>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-border bg-card shadow-soft">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-primary-deep text-primary-foreground text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4 sm:p-5">Pedagogical Parameter</th>
                  <th className="p-4 sm:p-5 bg-accent text-accent-foreground font-extrabold">Vidyasetu Classes</th>
                  <th className="p-4 sm:p-5">Standard Mass Coachings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-foreground">Batch Strength</td>
                  <td className="p-4 sm:p-5 font-bold text-primary bg-primary-soft/30">Strictly 30 Students</td>
                  <td className="p-4 sm:p-5 text-muted-foreground">150 to 250 Students per hall</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-foreground">Faculty Allocation</td>
                  <td className="p-4 sm:p-5 font-bold text-primary bg-primary-soft/30">Kota HODs & Ex-IITians for All Batches</td>
                  <td className="p-4 sm:p-5 text-muted-foreground">Top faculties only for Star/Top 1 batch</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-foreground">Daily Practice Problem (DPP)</td>
                  <td className="p-4 sm:p-5 font-bold text-primary bg-primary-soft/30">Evaluated next morning with video solutions</td>
                  <td className="p-4 sm:p-5 text-muted-foreground">Self-study sheets with minimal checking</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-foreground">Doubt Resolution Counter</td>
                  <td className="p-4 sm:p-5 font-bold text-primary bg-primary-soft/30">1-on-1 Faculty Counters (8 AM to 8 PM)</td>
                  <td className="p-4 sm:p-5 text-muted-foreground">Crowded doubt sessions with junior TAs</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-foreground">Parent Attendance Alerts</td>
                  <td className="p-4 sm:p-5 font-bold text-primary bg-primary-soft/30">Instant Biometric WhatsApp notification</td>
                  <td className="p-4 sm:p-5 text-muted-foreground">Manual / monthly register updates</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Counseling Callout */}
      <section className="section-shell py-16">
        <div className="rounded-3xl border border-border bg-gradient-to-r from-primary-deep to-primary p-8 sm:p-12 text-primary-foreground flex flex-col lg:flex-row items-center justify-between gap-8 shadow-lift">
          <div className="max-w-xl">
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-extrabold text-accent-foreground uppercase tracking-wider">
              Free Academic Counseling
            </span>
            <h3 className="mt-4 font-display text-2xl sm:text-3xl font-bold text-white">
              Confused between 1-Year Target &amp; 2-Year Integrated?
            </h3>
            <p className="mt-2 text-sm text-primary-foreground/80">
              Speak with our senior Dean of Admissions to assess your child&apos;s aptitude, current syllabus pace, and optimal batch selection.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <ActionButton onClick={() => handleEnquire("1-on-1 Counseling")} variant="accent" size="lg">
              Book 1-on-1 Session
            </ActionButton>
            <ActionButton href="tel:+919876543210" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              Call Helpline
            </ActionButton>
          </div>
        </div>
      </section>

      <QuickEnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        defaultCourse={selectedCourse}
      />
    </div>
  );
}
