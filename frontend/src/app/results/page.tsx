"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Award,
  Medal,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Quote,
  ArrowRight,
  Filter,
  Calendar,
  Building,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ActionButton, Reveal, Counter } from "@/components/site/primitives";
import { QuickEnquiryModal } from "@/components/site/QuickEnquiryModal";
import { toppersData, testimonialsData } from "@/data/coachingData";
import _felicitationImg from "@/assets/gallery-3.jpg"; const felicitationImg = _felicitationImg.src;

const title = "Results & Wall of Fame — Vidyasetu Classes IIT-JEE & NEET Rank Holders";
const description =
  "Celebrate the stellar achievements of our students in JEE Advanced, NEET UG, Board Merits and National Olympiads with verified ranks and roll numbers.";



const examTabs = [
  { id: "all", label: "All Selections" },
  { id: "JEE", label: "IIT-JEE (Main & Adv)" },
  { id: "NEET", label: "NEET UG Medical" },
  { id: "Olympiad", label: "Olympiads & STEM" },
];

const yearsList = ["All Years", "2025", "2024", "2023"];

export default function ResultsPage() {
  const [selectedExam, setSelectedExam] = useState("all");
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const filteredToppers = toppersData.filter((t) => {
    const matchesExam =
      selectedExam === "all" ? true : t.exam.toLowerCase().includes(selectedExam.toLowerCase());
    const matchesYear =
      selectedYear === "All Years" ? true : t.year.toString() === selectedYear;
    return matchesExam && matchesYear;
  });

  return (
    <div className="bg-background">
      <PageHero
        badge="Proven Academic Consistency Since 2005"
        title="Our Wall of Fame: Real Students, Authentic Ranks"
        description="Every rank displayed here is backed by verified roll numbers, classroom attendance records, and authentic student testimonials."
        breadcrumbs={[{ label: "Results & Selections" }]}
        actions={
          <>
            <ActionButton onClick={() => setEnquiryOpen(true)} variant="accent" size="lg">
              Start Your Rank Journey <ArrowRight className="h-4 w-4" />
            </ActionButton>
            <ActionButton to="/scholarship" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              Apply for VSAT Scholarship
            </ActionButton>
          </>
        }
      />

      {/* Results Key Statistics */}
      <section className="border-b border-border bg-surface py-8">
        <div className="section-shell">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-border bg-card p-5 text-center shadow-soft">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-primary">
                <Counter value={3200} suffix="+" />
              </span>
              <p className="mt-1 text-xs font-semibold text-muted-foreground uppercase">Total Selections</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 text-center shadow-soft">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-accent">
                <Counter value={18} suffix="" />
              </span>
              <p className="mt-1 text-xs font-semibold text-muted-foreground uppercase">All-India Top 100 Ranks</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 text-center shadow-soft">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-primary">
                <Counter value={99} suffix=".96%" />
              </span>
              <p className="mt-1 text-xs font-semibold text-muted-foreground uppercase">Highest JEE Percentile</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 text-center shadow-soft">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-success">
                <Counter value={710} suffix="/720" />
              </span>
              <p className="mt-1 text-xs font-semibold text-muted-foreground uppercase">Top NEET Score</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="sticky top-[69px] z-30 border-b border-border bg-card/95 backdrop-blur-md py-3 shadow-xs">
        <div className="section-shell flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Exam Type Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
            {examTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedExam(tab.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedExam === tab.id
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "border border-border bg-surface text-foreground/80 hover:border-primary hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Year Filter */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
            <span className="font-semibold text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> Exam Year:
            </span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-bold text-foreground outline-none"
            >
              {yearsList.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Toppers Cards Grid */}
      <section className="section-shell py-14 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredToppers.map((topper) => (
            <Reveal key={topper.id}>
              <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lift flex flex-col justify-between h-full">
                <div>
                  {/* Photo & Rank Badge */}
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <img
                        src={topper.img || (topper as any).image}
                        alt={topper.name}
                        className="h-24 w-24 rounded-2xl object-cover border-2 border-primary/20 shadow-soft group-hover:border-primary transition-colors"
                      />
                      <span className="absolute -bottom-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-accent text-accent-foreground text-xs font-bold shadow-soft">
                        <Medal className="h-4 w-4" />
                      </span>
                    </div>

                    <div className="min-w-0">
                      <span className="inline-block rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-extrabold text-accent">
                        {topper.rank}
                      </span>
                      <h3 className="mt-1 font-display text-lg font-bold text-foreground">
                        {topper.name}
                      </h3>
                      <p className="text-xs font-semibold text-primary">{topper.exam}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{topper.courseTaken}</p>
                    </div>
                  </div>

                  {/* College & Roll No */}
                  <div className="mt-5 rounded-2xl bg-surface p-3.5 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Allocated Institution:</span>
                      <span className="font-bold text-foreground">{topper.college}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Roll Number:</span>
                      <span className="font-mono font-medium text-primary">{topper.id.toUpperCase().substring(0, 8)}</span>
                    </div>
                  </div>

                  {/* Quote */}
                  {topper.quote && (
                    <div className="mt-4 flex items-start gap-2 text-xs italic text-muted-foreground">
                      <Quote className="h-4 w-4 shrink-0 text-accent/80 not-italic" />
                      <span>&ldquo;{topper.quote}&rdquo;</span>
                    </div>
                  )}
                </div>

                <div className="mt-5 border-t border-border pt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium">Batch of {topper.year}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-success">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Verified Selection
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Felicitation & Awards Ceremony Banner */}
      <section className="bg-primary-deep py-16 text-primary-foreground">
        <div className="section-shell grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
              <Trophy className="h-3.5 w-3.5" /> Annual Felicitation
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl text-white">
              Honoring Excellence: Cash Awards &amp; Merit Scholarships
            </h2>
            <p className="mt-4 text-base leading-relaxed text-primary-foreground/80">
              Every year, Vidyasetu honors top rank holders and their proud parents at the grand annual Pratibha Samman ceremony. Meritorious students receive cash prizes up to ₹5,00,000, high-end laptops, and full higher education sponsorship.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 text-xs font-medium">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
                <p className="font-display text-lg font-bold text-accent">₹25+ Lakhs</p>
                <p className="text-primary-foreground/75 mt-0.5">Annual Cash Rewards Distributed</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
                <p className="font-display text-lg font-bold text-accent">100% Sponsorship</p>
                <p className="text-primary-foreground/75 mt-0.5">For Top 100 All-India Rankers</p>
              </div>
            </div>

            <div className="mt-8">
              <ActionButton to="/gallery" variant="accent" size="lg">
                View Felicitation Photos →
              </ActionButton>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/15 shadow-lift">
            <img
              src={felicitationImg}
              alt="Annual Felicitation Pratibha Samman Ceremony"
              className="h-full w-full object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* Parent Testimonials Carousel / Grid */}
      <section className="section-shell py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5 text-accent" /> Verified Reflections
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Words of Gratitude from Parents &amp; Alumni
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonialsData.map((t) => (
            <Reveal key={t.id}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-soft">
                <div>
                  <div className="flex items-center gap-1 text-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 border-t border-border pt-4">
                  <p className="font-display text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs font-semibold text-primary">{t.role}</p>
                  <p className="text-[11px] text-muted-foreground">{t.rank} in {t.exam}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Direct Enrollment CTA */}
      <section className="section-shell pb-20">
        <div className="rounded-3xl border border-border bg-surface p-8 text-center sm:p-12 shadow-soft">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Ready to Build Your Success Story?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Enroll in our small batch of 30 today and train directly under Kota HODs and Ex-IITians.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ActionButton onClick={() => setEnquiryOpen(true)} variant="accent" size="lg">
              Book Free Demo Class
            </ActionButton>
            <ActionButton to="/courses" variant="outline" size="lg">
              Explore All Courses
            </ActionButton>
          </div>
        </div>
      </section>

      <QuickEnquiryModal isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </div>
  );
}
