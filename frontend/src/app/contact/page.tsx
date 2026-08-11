"use client";

import { useState, type FormEvent } from "react";

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  User,
  Send,
  ExternalLink,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { PageHero } from "@/components/site/PageHero";
import { ActionButton, Reveal } from "@/components/site/primitives";
import { branchesData } from "@/data/coachingData";

const title = "Campus Centers & Contact — Vidyasetu Classes Official";
const description =
  "Locate our 6 world-class coaching centers in Indore, Bhopal, Jabalpur, Ujjain, and Gwalior. Direct helplines, maps, and admission desk.";



export default function ContactPage() {
  const [activeBranchId, setActiveBranchId] = useState(branchesData[0].id);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const currentBranch = branchesData.find((b) => b.id === activeBranchId) || branchesData[0];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success(
        "Message & Query Logged Successfully!\nOur Center Academic Coordinator will get back to you within 2 hours."
      );
    }, 800);
  };

  return (
    <div className="bg-background">
      <PageHero
        badge="6 State-of-the-Art Campuses"
        title="Visit Us or Connect with an Academic Advisor"
        description="Whether you wish to schedule an in-person campus tour, inquire about batch timings, or connect with our student welfare cell, we are here to support your journey."
        breadcrumbs={[{ label: "Campus Centers & Contact" }]}
      />

      {/* Campus Selector Section */}
      <section className="section-shell py-14 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <Building className="h-3.5 w-3.5 text-accent" /> Institutional Network
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Choose Your Nearest Campus
          </h2>
        </div>

        {/* Center Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto scrollbar-none pb-4">
          {branchesData.map((b) => (
            <button
              key={b.id}
              onClick={() => setActiveBranchId(b.id)}
              className={`rounded-full px-5 py-2 text-xs font-bold whitespace-nowrap transition-all ${
                activeBranchId === b.id
                  ? "bg-primary text-primary-foreground shadow-lift"
                  : "border border-border bg-surface text-foreground/80 hover:border-primary hover:text-primary"
              }`}
            >
              {b.city} — {b.name}
            </button>
          ))}
        </div>

        {/* Active Campus Card Details */}
        <div className="mt-8 rounded-3xl border-2 border-primary/30 bg-card p-6 sm:p-10 shadow-lift grid gap-8 lg:grid-cols-[1.2fr_1fr] items-center">
          <div className="space-y-6">
            <div>
              <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-accent">
                {currentBranch.city} Campus
              </span>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                {currentBranch.name}
              </h3>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Physical Address:</p>
                  <p className="text-muted-foreground">{currentBranch.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Helpline &amp; Admission Desk:</p>
                  <p className="font-mono text-primary font-bold">{currentBranch.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Campus Email:</p>
                  <p className="text-muted-foreground">{currentBranch.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Office &amp; Counseling Hours:</p>
                  <p className="text-muted-foreground">{currentBranch.timing}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                Campus Infrastructure Highlights:
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                {["Smart Lecture Theatres", "CBT Testing Lab", "10,000-Book Library", "Doubt Counters", "Hostel 200m", "CCTV Security"].map((fac, idx) => (
                  <span key={idx} className="rounded-lg bg-surface border border-border px-2.5 py-1 text-muted-foreground">
                    ✓ {fac}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Map Simulation Box */}
          <div className="rounded-2xl border border-border bg-surface p-6 text-center space-y-4">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary">
              <MapPin className="h-8 w-8" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-foreground">Directions &amp; Navigation</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Located conveniently with ample student parking and close proximity to public transit.
              </p>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(currentBranch.address)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-white shadow-soft transition-all hover:bg-primary-deep hover:scale-105"
            >
              Open in Google Maps <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact & Enquiry Form Section */}
      <section className="bg-surface py-16 border-y border-border">
        <div className="section-shell grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> Reach Out
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Send an Academic Inquiry or Grievance
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Have a specific question regarding course pedagogy, hostel accommodation, or fee concessions? Fill out the form and our Dean of Admissions will respond directly.
            </p>

            <div className="mt-8 space-y-4 text-xs sm:text-sm">
              <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-success shrink-0" />
                <div>
                  <p className="font-bold text-foreground">Parent Grievance Desk</p>
                  <p className="text-muted-foreground text-xs">Direct escalation to Academic Director (director@vidyasetuclasses.edu.in)</p>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
                <Phone className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <p className="font-bold text-foreground">24x7 Student Emergency &amp; Hostel Warden</p>
                  <p className="font-mono text-xs font-bold text-primary">+91 98765 43219</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-lift">
            {submitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
                <h4 className="mt-4 font-display text-xl font-bold text-foreground">Inquiry Submitted!</h4>
                <p className="mt-2 text-xs text-muted-foreground">
                  Thank you for reaching out. We have assigned a senior counsellor to assist your family.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    Send Another Message →
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Full Name *</label>
                  <input
                    required
                    name="name"
                    placeholder="e.g. Dr. Sudhanshu Verma (Parent)"
                    className="w-full rounded-xl border border-input bg-background py-2.5 px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">Mobile Number *</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl border border-input bg-background py-2.5 px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">Preferred Center</label>
                    <select
                      name="branch"
                      defaultValue={currentBranch.name}
                      className="w-full rounded-xl border border-input bg-background py-2.5 px-4 text-sm outline-none focus:border-primary"
                    >
                      {branchesData.map((b) => (
                        <option key={b.id} value={b.name}>
                          {b.city} — {b.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Message / Question *</label>
                  <textarea
                    required
                    rows={4}
                    name="message"
                    placeholder="Please specify student class, target exam (JEE/NEET), or any hostel accommodation requests..."
                    className="w-full rounded-xl border border-input bg-background p-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <ActionButton type="submit" variant="accent" size="lg" className="w-full">
                  {submitting ? "Sending Inquiry..." : "Submit Inquiry"} <Send className="h-4 w-4" />
                </ActionButton>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
