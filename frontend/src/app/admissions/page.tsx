"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileCheck,
  CheckCircle2,
  Calendar,
  CreditCard,
  Building,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Phone,
  Bed,
  Utensils,
  BookOpen,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ActionButton, Reveal } from "@/components/site/primitives";
import { QuickEnquiryModal } from "@/components/site/QuickEnquiryModal";
import { coursesData } from "@/data/coachingData";

const title = "Admissions 2026-27 & Fee Transparency — Vidyasetu Classes";
const description =
  "Complete step-by-step admission roadmap, transparent fee schedules, installment options, hostel facilities, and student code of conduct.";



const admissionSteps = [
  {
    step: "01",
    title: "1-on-1 Academic Counseling",
    desc: "Meet our senior faculty for a diagnostic assessment of your current academic status, career aspirations, and optimal course selection.",
  },
  {
    step: "02",
    title: "VSAT Scholarship Test or Direct Admission",
    desc: "Appear in the online/offline VSAT exam to qualify for up to 100% tuition waiver, or apply directly based on 10th/12th Board marks.",
  },
  {
    step: "03",
    title: "Batch & Center Selection",
    desc: "Select your preferred morning/evening batch, campus center, and optional residential hostel package.",
  },
  {
    step: "04",
    title: "Kit Handover & Orientation",
    desc: "Receive your 24-volume printed study modules, student smart ID, biometric access registration, and attend the batch inaugural seminar.",
  },
];

export default function AdmissionsPage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <div className="bg-background">
      <PageHero
        badge="Academic Year 2026–27"
        title="Admissions &amp; Transparent Fee Roadmap"
        description="We uphold absolute financial and academic transparency. No hidden charges, zero mandatory book add-ons, and clear instalment payment structures."
        breadcrumbs={[{ label: "Admissions & Guidelines" }]}
        actions={
          <>
            <ActionButton onClick={() => setEnquiryOpen(true)} variant="accent" size="lg">
              Apply for Admission Online <ArrowRight className="h-4 w-4" />
            </ActionButton>
            <ActionButton to="/scholarship" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              Apply for VSAT Scholarship
            </ActionButton>
          </>
        }
      />

      {/* 4-Step Process Section */}
      <section className="section-shell py-14 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5 text-accent" /> Smooth Enrollment
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            4-Stage Admission Roadmap
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {admissionSteps.map((s, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="relative flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:border-primary hover:shadow-lift">
                <div>
                  <span className="font-display text-4xl font-extrabold text-primary/20">
                    {s.step}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-border/60 flex items-center gap-1.5 text-xs font-semibold text-primary">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Stage {i + 1}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Comprehensive Course Fee Structure Table */}
      <section className="bg-surface py-16 border-y border-border">
        <div className="section-shell">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <CreditCard className="h-3.5 w-3.5 text-accent" /> Financial Transparency
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Course Tuition &amp; Instalment Plans
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              All fees include printed study material, test series, 18% GST, and LMS access.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-border bg-card shadow-soft">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-border bg-primary-deep text-primary-foreground text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4 sm:p-5">Course / Batch Name</th>
                  <th className="p-4 sm:p-5">Target Exam</th>
                  <th className="p-4 sm:p-5">Duration</th>
                  <th className="p-4 sm:p-5 font-bold text-accent">Total Fee (GST Incl)</th>
                  <th className="p-4 sm:p-5">Instalment Option</th>
                  <th className="p-4 sm:p-5 text-right">Enrollment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {coursesData.map((c) => (
                  <tr key={c.id} className="hover:bg-surface/50 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-foreground">{c.name}</td>
                    <td className="p-4 sm:p-5 text-primary font-medium">{c.targetExam}</td>
                    <td className="p-4 sm:p-5 text-muted-foreground">{c.duration}</td>
                    <td className="p-4 sm:p-5 font-display font-bold text-primary text-base">{c.feeOneTime}</td>
                    <td className="p-4 sm:p-5 text-muted-foreground">3 Easy EMI Instalments</td>
                    <td className="p-4 sm:p-5 text-right">
                      <ActionButton
                        onClick={() => setEnquiryOpen(true)}
                        variant="primary"
                        size="sm"
                      >
                        Enroll
                      </ActionButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Hostel & Boarding Facilities */}
      <section className="section-shell py-16 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              <Building className="h-3.5 w-3.5" /> For Outstation Students
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Supervised Residential Hostels
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Over 40% of our students travel from across Madhya Pradesh, Rajasthan, Gujarat, and Maharashtra. We provide safe, fully air-conditioned boys&apos; and girls&apos; hostels within a 2-minute walking distance of campus centers.
            </p>

            <div className="mt-6 space-y-3 text-xs sm:text-sm text-foreground">
              <div className="flex items-center gap-2.5">
                <Bed className="h-4 w-4 text-primary shrink-0" />
                <span>Twin & Triple sharing AC rooms with ergonomic study desks and individual wardrobes</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Utensils className="h-4 w-4 text-primary shrink-0" />
                <span>Nutritious 4-meal daily menu prepared in hygienic RO-water commercial kitchen</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                <span>24x7 Resident Warden, biometric entry/exit logs, and complete CCTV perimeter</span>
              </div>
              <div className="flex items-center gap-2.5">
                <BookOpen className="h-4 w-4 text-primary shrink-0" />
                <span>Mandatory evening self-study hours supervised by resident faculty mentors</span>
              </div>
            </div>

            <div className="mt-8">
              <ActionButton onClick={() => setEnquiryOpen(true)} variant="accent" size="lg">
                Request Hostel Accommodation →
              </ActionButton>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-lift space-y-4">
            <h3 className="font-display text-lg font-bold text-foreground">
              Hostel Fee Structure (Annual / Monthly)
            </h3>

            <div className="space-y-3 text-xs">
              <div className="rounded-2xl border border-border bg-surface p-4 flex justify-between items-center">
                <div>
                  <p className="font-bold text-foreground text-sm">Twin Sharing Deluxe AC Room</p>
                  <p className="text-muted-foreground text-xs mt-0.5">Attached Bath + 4 Meals + Laundry</p>
                </div>
                <span className="font-display text-base font-bold text-primary">₹9,500 / month</span>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-4 flex justify-between items-center">
                <div>
                  <p className="font-bold text-foreground text-sm">Triple Sharing Standard AC Room</p>
                  <p className="text-muted-foreground text-xs mt-0.5">Attached Bath + 4 Meals + Laundry</p>
                </div>
                <span className="font-display text-base font-bold text-primary">₹7,800 / month</span>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-4 flex justify-between items-center">
                <div>
                  <p className="font-bold text-foreground text-sm">Single Occupancy Premium Room</p>
                  <p className="text-muted-foreground text-xs mt-0.5">Private Bath + 4 Meals + High-Speed WiFi</p>
                </div>
                <span className="font-display text-base font-bold text-primary">₹14,000 / month</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code of Conduct & Anti-Ragging */}
      <section className="bg-surface py-16 border-t border-border">
        <div className="section-shell">
          <div className="rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-soft">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <ShieldCheck className="h-4 w-4 text-accent" /> Institutional Compliance
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">
              Strict Zero-Tolerance Anti-Ragging &amp; Safety Policy
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Vidyasetu enforces strict campus safety codes. Biometric attendance records are automatically synced with parents&apos; phones every morning. Any instance of ragging, indiscipline, or substance violation results in immediate expulsion without refund.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs font-bold text-primary">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> Parent Disciplinary Committee</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> CCTV Monitored Campuses</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> On-Call Medical Doctor</span>
            </div>
          </div>
        </div>
      </section>

      <QuickEnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        title="Apply for Admission 2026-27"
      />
    </div>
  );
}
