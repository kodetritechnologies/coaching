"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Award,
  Sparkles,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  Download,
  ArrowRight,
  User,
  Phone,
  Mail,
  MapPin,
  BookOpen,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { PageHero } from "@/components/site/PageHero";
import { ActionButton, Reveal } from "@/components/site/primitives";
import { scholarshipSlabs, branchesData } from "@/data/coachingData";

const title = "VSAT 2026 National Scholarship Test — Up to 100% Fee Waiver | Vidyasetu";
const description =
  "Register for Vidyasetu National Scholarship Aptitude Test (VSAT 2026). ₹5 Crore scholarship pool for Class 6 to 12th Pass students.";



const examDates = [
  { phase: "Phase 1", date: "15 September 2026", mode: "Online CBT + Offline Centers", fee: "₹0 (Free Registration)" },
  { phase: "Phase 2", date: "12 October 2026", mode: "Online CBT + Offline Centers", fee: "₹0 (Free Registration)" },
  { phase: "Phase 3", date: "09 November 2026", mode: "Online CBT + Offline Centers", fee: "₹0 (Free Registration)" },
];

export default function ScholarshipPage() {
  const [submitting, setSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setRegistered(true);
      toast.success(
        "VSAT 2026 Registration Confirmed!\nYour admit card and login credentials have been sent via SMS & WhatsApp."
      );
    }, 800);
  };

  return (
    <div className="bg-background">
      <PageHero
        badge="₹5 Crore National Scholarship Pool"
        title="Vidyasetu Scholarship Aptitude Test (VSAT 2026)"
        description="No deserving student should be denied world-class coaching due to financial constraints. Qualify through VSAT and secure up to 100% tuition and hostel fee waivers."
        breadcrumbs={[{ label: "VSAT Scholarship 2026" }]}
        actions={
          <>
            <a href="#register" className="ripple inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold px-7 py-3.5 text-base bg-accent text-accent-foreground shadow-glow hover:brightness-105 hover:-translate-y-0.5">
              Register Free for VSAT <ArrowRight className="h-4 w-4" />
            </a>
            <ActionButton to="/courses" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              Explore Coaching Batches
            </ActionButton>
          </>
        }
      />

      {/* Slabs & Benefits Strip */}
      <section className="border-b border-border bg-surface py-6">
        <div className="section-shell grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase">Maximum Waiver</span>
            <p className="mt-1 font-display text-xl sm:text-2xl font-extrabold text-success">100% Tuition Fee</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase">Registration Cost</span>
            <p className="mt-1 font-display text-xl sm:text-2xl font-extrabold text-primary">₹0 (Free)</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase">Eligible Classes</span>
            <p className="mt-1 font-display text-base sm:text-lg font-bold text-foreground">Class 6 to 12th Pass</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase">Test Centers</span>
            <p className="mt-1 font-display text-base sm:text-lg font-bold text-accent">6 Campuses + Online</p>
          </div>
        </div>
      </section>

      {/* Main Registration & Scholarship Slabs Layout */}
      <section id="register" className="section-shell py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] items-start">
          {/* Registration Form */}
          <div className="rounded-3xl border-2 border-primary/30 bg-card p-6 sm:p-8 shadow-lift">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-accent/20 p-2 text-accent">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                  Online VSAT 2026 Registration
                </h2>
                <p className="text-xs text-muted-foreground">Free entry · Instant Admit Card generation</p>
              </div>
            </div>

            {registered ? (
              <div className="mt-8 rounded-2xl bg-success/10 border border-success/30 p-6 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
                <h3 className="mt-3 font-display text-lg font-bold text-foreground">Registration Successful!</h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  Your VSAT Admit Card Number has been generated. Our testing coordinator will contact you via WhatsApp with sample mock test links.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setRegistered(false)}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    Register Another Student →
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="vsat-name" className="block text-xs font-semibold text-foreground mb-1">Student Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      id="vsat-name"
                      required
                      name="name"
                      placeholder="e.g. Priyansh Sharma"
                      className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="vsat-phone" className="block text-xs font-semibold text-foreground mb-1">Parent / Student Mobile *</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        id="vsat-phone"
                        required
                        type="tel"
                        name="phone"
                        placeholder="9876543210"
                        className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="vsat-email" className="block text-xs font-semibold text-foreground mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        id="vsat-email"
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                        className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">Target Stream *</label>
                    <div className="relative">
                      <BookOpen className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <select
                        name="stream"
                        className="w-full appearance-none rounded-xl border border-input bg-background py-2.5 pl-10 pr-8 text-sm outline-none focus:border-primary"
                      >
                        <option value="IIT-JEE">IIT-JEE (Main + Advanced)</option>
                        <option value="NEET">NEET UG Medical</option>
                        <option value="Foundation">Class 6–10 Olympiad Foundation</option>
                        <option value="CUET">CUET UG</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">Current Class</label>
                    <select
                      name="class"
                      className="w-full rounded-xl border border-input bg-background py-2.5 px-4 text-sm outline-none focus:border-primary"
                    >
                      <option value="Class 6">Class 6</option>
                      <option value="Class 7">Class 7</option>
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11 Moving">Class 11 Moving</option>
                      <option value="Class 12 Moving">Class 12 Moving</option>
                      <option value="12th Passed">12th Pass / Dropper</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">Preferred Exam Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <select
                        name="date"
                        className="w-full appearance-none rounded-xl border border-input bg-background py-2.5 pl-10 pr-8 text-sm outline-none focus:border-primary"
                      >
                        <option value="15 Sept 2026">Phase 1: 15 Sept 2026</option>
                        <option value="12 Oct 2026">Phase 2: 12 Oct 2026</option>
                        <option value="09 Nov 2026">Phase 3: 09 Nov 2026</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">Preferred Exam Center</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <select
                        name="center"
                        className="w-full appearance-none rounded-xl border border-input bg-background py-2.5 pl-10 pr-8 text-sm outline-none focus:border-primary"
                      >
                        <option value="Online">Online CBT at Home</option>
                        {branchesData.map((b) => (
                          <option key={b.id} value={b.name}>
                            {b.name} ({b.city})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <ActionButton type="submit" variant="accent" size="lg" className="w-full">
                    {submitting ? "Submitting Registration..." : "Submit & Generate Free Admit Card"}
                  </ActionButton>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  <span>No registration fee required · 100% Free Scholarship Exam</span>
                </div>
              </form>
            )}
          </div>

          {/* Scholarship Slabs & Additional Waivers */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-soft">
              <h3 className="font-display text-xl font-bold text-foreground">
                VSAT Merit Fee Waiver Slabs
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Fee concessions awarded automatically based on VSAT exam score.
              </p>

              <div className="mt-6 space-y-3">
                {scholarshipSlabs.map((slab, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-2xl border border-border bg-surface p-3.5 text-xs transition-colors hover:border-primary"
                  >
                    <div>
                      <span className="font-bold text-foreground">{slab.rankRange}</span>
                      <p className="text-[11px] text-muted-foreground">{slab.criteria}</p>
                    </div>
                    <span className="rounded-full bg-success/20 px-3 py-1 font-display font-bold text-success text-sm">
                      {slab.waiver}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Social Concessions */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-primary">
                Special Social Concessions
              </h4>
              <ul className="mt-4 space-y-2.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                  <span><strong>Defence Personnel Wards:</strong> Flat 25% Fee Concession</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                  <span><strong>Single Girl Child:</strong> Additional 15% Academic Waiver</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                  <span><strong>Real Sibling Discount:</strong> 20% Rebate on second admission</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                  <span><strong>State Board Merit Holders:</strong> Direct 50% Direct Admission Waiver</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Exam Dates Calendar */}
      <section className="bg-surface py-16 border-y border-border">
        <div className="section-shell">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Calendar className="h-3.5 w-3.5" /> Exam Schedule
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              VSAT 2026 Test Phases
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {examDates.map((d, idx) => (
              <div key={idx} className="rounded-3xl border border-border bg-card p-6 shadow-soft text-center">
                <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-bold text-primary">
                  {d.phase}
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-foreground">{d.date}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{d.mode}</p>
                <div className="mt-4 rounded-xl bg-surface p-2 text-xs font-bold text-success">
                  {d.fee}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
