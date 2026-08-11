"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  Trophy,
  Users,
  Award,
  Download,
  Phone,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  FileCheck,
  HelpCircle,
  IndianRupee,
  Layers,
  GraduationCap,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ActionButton, Reveal } from "@/components/site/primitives";
import { QuickEnquiryModal } from "@/components/site/QuickEnquiryModal";
import { coursesData, facultyData, toppersData } from "@/data/coachingData";



export default function CourseDetailPage() {
  const { slug } = useParams();
  const course = coursesData.find((c) => c.slug === slug);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  if (!course) {
    return (
      <div className="section-shell py-20 text-center">
        <h2 className="font-display text-2xl font-bold text-foreground">Course Not Found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The requested course batch does not exist or has been updated.</p>
        <div className="mt-6">
          <ActionButton to="/courses" variant="primary">
            View All Available Courses
          </ActionButton>
        </div>
      </div>
    );
  }

  // Related faculty
  const courseFaculty = facultyData.filter((f) => {
    if (course.targetExam.includes("JEE")) return f.department !== "Biology";
    if (course.targetExam.includes("NEET")) return f.department !== "Mathematics";
    return true;
  }).slice(0, 3);

  // Related toppers
  const courseToppers = toppersData.filter((t) => {
    if (course.targetExam.includes("JEE")) return t.exam.includes("JEE");
    if (course.targetExam.includes("NEET")) return t.exam.includes("NEET");
    return true;
  }).slice(0, 3);

  return (
    <div className="bg-background">
      <PageHero
        badge={course.tag}
        title={course.name}
        description={course.subtitle || course.overview}
        breadcrumbs={[
          { label: "Courses", href: "/courses" },
          { label: course.name },
        ]}
        actions={
          <>
            <ActionButton onClick={() => setEnquiryOpen(true)} variant="accent" size="lg">
              Enroll in Next Batch <ArrowRight className="h-4 w-4" />
            </ActionButton>
            <ActionButton onClick={() => setEnquiryOpen(true)} variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              Download Syllabus PDF
            </ActionButton>
          </>
        }
      />

      {/* Program Summary Strip */}
      <section className="border-b border-border bg-surface py-6">
        <div className="section-shell grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase">Target Exam</span>
            <p className="mt-1 font-display text-sm sm:text-base font-bold text-primary">{course.targetExam}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase">Duration</span>
            <p className="mt-1 font-display text-sm sm:text-base font-bold text-foreground">{course.duration}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase">Batch Strength</span>
            <p className="mt-1 font-display text-sm sm:text-base font-bold text-accent">Max 35 Students</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase">Next Batch</span>
            <p className="mt-1 font-display text-sm sm:text-base font-bold text-foreground">{course.startDate || "April 2026"}</p>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="section-shell py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr]">
          {/* Left Column: Syllabus, Structure, Features */}
          <div className="space-y-12">
            {/* Overview */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <Sparkles className="h-3.5 w-3.5" /> Program Overview
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">
                Engineered for Academic Mastery
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                {course.overview}
              </p>
            </div>

            {/* Pedagogical Features */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <ShieldCheck className="h-3.5 w-3.5" /> Key Course Features
              </span>
              <h3 className="mt-3 font-display text-xl font-bold text-foreground sm:text-2xl">
                Structured Teaching Methodology
              </h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {course.highlights?.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-foreground">{h}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Breakdown */}
            {course.curriculum && course.curriculum.length > 0 && (
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-accent">
                  <BookOpen className="h-3.5 w-3.5" /> Syllabus Coverage
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-foreground sm:text-2xl">
                  Curriculum Modules &amp; Phases
                </h3>

                <div className="mt-6 space-y-4">
                  {course.curriculum.map((mod, idx) => (
                    <div key={idx} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-bold text-primary">
                          {mod.term}
                        </span>
                        <span className="text-xs font-semibold text-muted-foreground">{mod.hours}</span>
                      </div>
                      <h4 className="mt-2 font-display text-base font-bold text-foreground sm:text-lg">
                        {mod.title}
                      </h4>
                      <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                        {mod.topics.map((t, ti) => (
                          <li key={ti} className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Batch Variants */}
            {course.variants && course.variants.length > 0 && (
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                  <Layers className="h-3.5 w-3.5" /> Batch Offerings
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-foreground sm:text-2xl">
                  Select Your Batch Variant
                </h3>
                <div className="mt-6 space-y-3">
                  {course.variants.map((v, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
                      <div>
                        <span className="rounded-md bg-secondary px-2.5 py-0.5 text-[11px] font-bold text-secondary-foreground">
                          {v.targetClass}
                        </span>
                        <h4 className="mt-1 font-display text-base font-bold text-foreground">{v.name}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">Timing: {v.timing} · Duration: {v.duration}</p>
                      </div>
                      <div className="text-right sm:border-l sm:border-border sm:pl-6">
                        <span className="text-[11px] text-muted-foreground uppercase">Tuition Fee</span>
                        <div className="font-display text-lg font-bold text-primary">{v.fee}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Program Mentors */}
            {courseFaculty.length > 0 && (
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                  <Users className="h-3.5 w-3.5" /> Faculty Mentors
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-foreground sm:text-2xl">
                  Learn Directly From Master Educators
                </h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {courseFaculty.map((f) => (
                    <div key={f.id} className="overflow-hidden rounded-2xl border border-border bg-card p-4 text-center shadow-soft">
                      <img
                        src={f.img}
                        alt={f.name}
                        className="mx-auto h-20 w-20 rounded-full object-cover border-2 border-primary/20"
                      />
                      <h4 className="mt-3 font-display text-sm font-bold text-foreground">{f.name}</h4>
                      <p className="text-xs font-semibold text-primary">{f.department}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{f.experience} Experience</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Course FAQs */}
            {course.faqs && course.faqs.length > 0 && (
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                  <HelpCircle className="h-3.5 w-3.5" /> FAQ
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-foreground sm:text-2xl">
                  Frequently Asked Questions
                </h3>
                <div className="mt-6 space-y-3">
                  {course.faqs.map((faq, fi) => (
                    <div key={fi} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                      <h4 className="font-display text-sm font-bold text-foreground">{faq.q}</h4>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Admission & Batch Box */}
          <div className="space-y-6">
            <div className="sticky top-24 rounded-3xl border-2 border-primary/30 bg-card p-6 shadow-lift">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <span className="text-xs font-bold uppercase text-muted-foreground">Standard Tuition Fee</span>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-primary">
                    {course.feeOneTime}
                  </div>
                  <span className="text-[11px] text-muted-foreground">{course.feeInstallments}</span>
                </div>
                <span className="rounded-full bg-success/20 px-3 py-1 text-xs font-bold text-success">
                  Up to 100% Scholarship
                </span>
              </div>

              <div className="mt-5 space-y-3 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-border/60">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-primary" /> Next Batch Commences:
                  </span>
                  <span className="font-bold text-foreground">{course.startDate || "April 2026"}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-border/60">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary" /> Daily Timings:
                  </span>
                  <span className="font-semibold text-foreground">{course.variants?.[0]?.timing || "8:00 AM – 1:30 PM"}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-border/60">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <FileCheck className="h-4 w-4 text-primary" /> DPP &amp; Test Papers:
                  </span>
                  <span className="font-semibold text-foreground">Weekly + Monthly AIATS</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-border/60">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-primary" /> Batch Cap:
                  </span>
                  <span className="font-bold text-accent">Strictly 35 Students</span>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <ActionButton
                  onClick={() => setEnquiryOpen(true)}
                  variant="accent"
                  size="lg"
                  className="w-full"
                >
                  Book 2-Day Free Demo Class
                </ActionButton>
                <ActionButton
                  to="/admissions"
                  variant="outline"
                  size="md"
                  className="w-full"
                >
                  View Admission Guidelines
                </ActionButton>
              </div>

              {/* Direct Help */}
              <div className="mt-5 rounded-2xl bg-surface p-3.5 text-center">
                <p className="text-xs text-muted-foreground">Prefer speaking with a counsellor?</p>
                <a
                  href="tel:+919876543210"
                  className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                >
                  <Phone className="h-3.5 w-3.5" /> Call +91 98765 43210
                </a>
              </div>
            </div>

            {/* Toppers Spotlight from this course */}
            {courseToppers.length > 0 && (
              <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent mb-4">
                  <Trophy className="h-4 w-4" /> Hall of Fame ({course.targetExam})
                </div>
                <div className="space-y-3">
                  {courseToppers.map((t) => (
                    <div key={t.id} className="flex items-center gap-3 rounded-2xl bg-surface p-3">
                      <img src={t.img} alt={t.name} className="h-12 w-12 rounded-xl object-cover" />
                      <div>
                        <div className="font-display text-sm font-bold text-foreground">{t.name}</div>
                        <div className="text-xs font-extrabold text-primary">{t.rank} · {t.exam}</div>
                        <div className="text-[11px] text-muted-foreground">{t.college}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <QuickEnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        defaultCourse={course.name}
      />
    </div>
  );
}
