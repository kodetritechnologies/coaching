"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  CheckCircle2,
  Calendar,
  Clock,
  Laptop,
  BarChart3,
  Award,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  FileSpreadsheet,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ActionButton, Reveal } from "@/components/site/primitives";
import { QuickEnquiryModal } from "@/components/site/QuickEnquiryModal";
import { testSeriesPackages } from "@/data/coachingData";

const title = "All-India Test Series (AIATS) & CBT Portal — Vidyasetu Classes";
const description =
  "Simulate real NTA JEE Main, JEE Advanced and NEET examination conditions with over 25,000 active test takers, instant percentile and AI analytics.";



const upcomingTests = [
  {
    date: "14 Sept 2026",
    exam: "JEE Main AIATS — Part Test 1",
    syllabus: "Physics: Kinematics, NLM | Chem: Mole Concept, Periodic Table | Math: Sets, Quadratic Equations",
    duration: "3 Hours (Online CBT + Offline OMR)",
  },
  {
    date: "21 Sept 2026",
    exam: "NEET AIATS — Part Test 1",
    syllabus: "Physics: Vectors & Motion | Chem: Atomic Structure | Bio: Diversity of Living World",
    duration: "3 Hours 20 Mins (720 Marks OMR)",
  },
  {
    date: "28 Sept 2026",
    exam: "JEE Advanced AIATS — Paper 1 & 2",
    syllabus: "Comprehensive Mechanics, Thermodynamics & Real Functions",
    duration: "6 Hours (2 Shifts with 2-Hr Break)",
  },
  {
    date: "05 Oct 2026",
    exam: "Foundation Junior Talent Hunt",
    syllabus: "Class 9 & 10 NCERT Science, Mathematics & Mental Ability",
    duration: "2 Hours (Objective CBT)",
  },
];

export default function TestSeriesPage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>();

  const handleEnroll = (pkgName: string) => {
    setSelectedPackage(pkgName);
    setEnquiryOpen(true);
  };

  return (
    <div className="bg-background">
      <PageHero
        badge="NTA Benchmark CBT Simulation"
        title="All-India Test Series (AIATS) 2026-27"
        description="Compete with 25,000+ top aspirants nationwide. Receive deep question-level accuracy diagnostics, time-spent analysis, and accurate All-India Rank predictions within 2 hours of test submission."
        breadcrumbs={[{ label: "Test Series & CBT" }]}
        actions={
          <>
            <ActionButton onClick={() => handleEnroll("AIATS General")} variant="accent" size="lg">
              Register for AIATS 2026 <ArrowRight className="h-4 w-4" />
            </ActionButton>
            <ActionButton to="/study-material" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              Download Sample Papers
            </ActionButton>
          </>
        }
      />

      {/* CBT Diagnostic Features */}
      <section className="border-b border-border bg-surface py-6">
        <div className="section-shell grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase">National Test Takers</span>
            <p className="mt-1 font-display text-base sm:text-lg font-bold text-primary">25,000+ Students</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase">Result Turnaround</span>
            <p className="mt-1 font-display text-base sm:text-lg font-bold text-foreground">Under 2 Hours</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase">Testing Formats</span>
            <p className="mt-1 font-display text-base sm:text-lg font-bold text-accent">CBT Labs + Physical OMR</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase">Solution Format</span>
            <p className="mt-1 font-display text-base sm:text-lg font-bold text-foreground">Step-by-Step Video Solutions</p>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="section-shell py-14 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <Trophy className="h-3.5 w-3.5 text-accent" /> Available Test Packages
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Choose Your Target Test Series
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Included free of charge for all enrolled classroom students. External students can subscribe independently.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testSeriesPackages.map((pkg) => (
            <Reveal key={pkg.id}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:border-primary/40 hover:shadow-lift">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
                      {pkg.exam}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {pkg.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-foreground">{pkg.name}</h3>
                  <p className="mt-2 text-xs font-semibold text-accent">{pkg.testsCount}</p>

                  <ul className="mt-6 space-y-2.5 text-xs text-muted-foreground">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 border-t border-border pt-5">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-[10px] uppercase text-muted-foreground">Package Price</span>
                      <div className="font-display text-2xl font-bold text-primary">{pkg.price}</div>
                    </div>
                    <span className="text-[11px] text-muted-foreground">GST Included</span>
                  </div>

                  <ActionButton
                    onClick={() => handleEnroll(pkg.name)}
                    variant="accent"
                    size="md"
                    className="w-full"
                  >
                    Enroll in Test Series
                  </ActionButton>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Interactive AI Analytics Showcase */}
      <section className="bg-surface py-16 border-y border-border">
        <div className="section-shell grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <BarChart3 className="h-3.5 w-3.5 text-accent" /> AI Diagnostic Dashboard
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Understand Where Every Mark Was Lost
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Merely taking mock tests without deep forensic error analysis is wasted effort. Our test analytics platform decomposes your attempt into actionable behavioral and conceptual metrics.
            </p>

            <div className="mt-6 space-y-3 text-xs sm:text-sm text-foreground">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span><strong>Time-Spent per Question:</strong> Detect questions where you wasted &gt;3 minutes without scoring</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span><strong>Negative Marks Classification:</strong> Segregate calculation slips from fundamental concept voids</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span><strong>All-India Rank Percentile Curve:</strong> See exactly where you stand against the Top 100 benchmark</span>
              </div>
            </div>
          </div>

          {/* Simulated Scorecard Preview */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-lift space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <p className="font-display text-sm font-bold text-foreground">Sample AIATS Test Report</p>
                <p className="text-[11px] text-muted-foreground">JEE Advanced Full Mock 04</p>
              </div>
              <span className="rounded-full bg-success/20 px-2.5 py-1 text-xs font-bold text-success">
                AIR 94 (99.82 %ile)
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-xl bg-surface p-2.5">
                <span className="text-muted-foreground text-[10px]">Physics</span>
                <p className="font-bold text-primary text-sm mt-0.5">88 / 120</p>
              </div>
              <div className="rounded-xl bg-surface p-2.5">
                <span className="text-muted-foreground text-[10px]">Chemistry</span>
                <p className="font-bold text-primary text-sm mt-0.5">102 / 120</p>
              </div>
              <div className="rounded-xl bg-surface p-2.5">
                <span className="text-muted-foreground text-[10px]">Mathematics</span>
                <p className="font-bold text-primary text-sm mt-0.5">76 / 120</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-4 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Score:</span>
                <span className="font-bold text-foreground">266 / 360 (73.8%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Accuracy Rate:</span>
                <span className="font-bold text-success">87.4% (63 Correct / 9 Wrong)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Negative Deduction:</span>
                <span className="font-bold text-destructive">-9 Marks (3 Silly / 6 Tough)</span>
              </div>
            </div>

            <p className="text-center text-[11px] text-muted-foreground">
              Automated video explanations unlocked instantly upon submission.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Test Schedule Table */}
      <section className="section-shell py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
            <Calendar className="h-3.5 w-3.5" /> Upcoming Dates
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            AIATS Test Calendar (Phase 1)
          </h2>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-border bg-card shadow-soft">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-border bg-primary-deep text-primary-foreground uppercase tracking-wider text-xs">
              <tr>
                <th className="p-4 sm:p-5">Date</th>
                <th className="p-4 sm:p-5">Test Examination</th>
                <th className="p-4 sm:p-5">Syllabus Breakdown</th>
                <th className="p-4 sm:p-5">Format</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {upcomingTests.map((t, idx) => (
                <tr key={idx} className="hover:bg-surface/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-primary whitespace-nowrap">{t.date}</td>
                  <td className="p-4 sm:p-5 font-semibold text-foreground">{t.exam}</td>
                  <td className="p-4 sm:p-5 text-muted-foreground">{t.syllabus}</td>
                  <td className="p-4 sm:p-5 font-medium text-accent whitespace-nowrap">{t.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <QuickEnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        title={selectedPackage || "Register for AIATS Test Series"}
      />
    </div>
  );
}
