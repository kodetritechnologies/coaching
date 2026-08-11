"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Award,
  BookOpen,
  Users,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Star,
  Quote,
  ArrowRight,
  Filter,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ActionButton, Reveal } from "@/components/site/primitives";
import { QuickEnquiryModal } from "@/components/site/QuickEnquiryModal";
import { facultyData } from "@/data/coachingData";

const title = "Star Faculty Team — Ex-IITians & Kota Senior HODs | Vidyasetu Classes";
const description =
  "Meet our renowned permanent faculty mentors in Physics, Chemistry, Mathematics, and Biology with 15+ years of Kota teaching experience.";



const departmentTabs = [
  { id: "all", label: "All Master Faculties" },
  { id: "Physics", label: "Physics" },
  { id: "Chemistry", label: "Chemistry" },
  { id: "Mathematics", label: "Mathematics" },
  { id: "Zoology & Botany", label: "Biology / Medical" },
  { id: "Early Foundation", label: "Foundation & NTSE" },
];

export default function FacultyPage() {
  const [selectedDept, setSelectedDept] = useState("all");
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<string | undefined>();

  const filteredFaculty =
    selectedDept === "all"
      ? facultyData
      : facultyData.filter((f) => f.department.toLowerCase().includes(selectedDept.toLowerCase()));

  const handleBookConsultation = (mentorName: string) => {
    setSelectedMentor(`Mentorship with ${mentorName}`);
    setEnquiryOpen(true);
  };

  return (
    <div className="bg-background">
      <PageHero
        badge="100% Permanent Kota & IITian Educators"
        title="Learn from India's Master Mentors"
        description="Our faculty team is not composed of visiting guest teachers. Every faculty is a permanent pillar of Vidyasetu, dedicated to daily classroom lectures, DPP evaluation, and 1-on-1 doubt resolution."
        breadcrumbs={[{ label: "Faculty Mentors" }]}
        actions={
          <>
            <ActionButton onClick={() => handleBookConsultation("Faculty Team")} variant="accent" size="lg">
              Book Mentorship Session <ArrowRight className="h-4 w-4" />
            </ActionButton>
            <ActionButton to="/courses" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              View Batch Allocations
            </ActionButton>
          </>
        }
      />

      {/* Trust Highlights */}
      <section className="border-b border-border bg-surface py-6">
        <div className="section-shell grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase">Average Experience</span>
            <p className="mt-1 font-display text-base sm:text-lg font-bold text-primary">15+ Years in Kota/Indore</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase">Faculty Status</span>
            <p className="mt-1 font-display text-base sm:text-lg font-bold text-foreground">100% Full-Time Staff</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase">Doubt Counters</span>
            <p className="mt-1 font-display text-base sm:text-lg font-bold text-accent">12 Hours Daily Support</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase">Batch Ratio</span>
            <p className="mt-1 font-display text-base sm:text-lg font-bold text-foreground">1 Mentor per 30 Students</p>
          </div>
        </div>
      </section>

      {/* Department Filter Tabs */}
      <section className="sticky top-[69px] z-30 border-b border-border bg-card/95 backdrop-blur-md py-3 shadow-xs">
        <div className="section-shell flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 min-w-max">
            <span className="text-xs font-bold text-muted-foreground mr-1 flex items-center gap-1">
              <Filter className="h-3.5 w-3.5" /> Department:
            </span>
            {departmentTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedDept(tab.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  selectedDept === tab.id
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "border border-border bg-surface text-foreground/80 hover:border-primary hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Ex-Kota HODs & Ex-IITians Only</span>
          </div>
        </div>
      </section>

      {/* Faculty Cards Grid */}
      <section className="section-shell py-14 sm:py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredFaculty.map((f) => (
            <Reveal key={f.id}>
              <div className="group flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift">
                <div>
                  {/* Image & Header */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={f.img || (f as any).image}
                      alt={f.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold text-accent-foreground uppercase tracking-wider">
                        {f.department}
                      </span>
                      <h3 className="mt-1 font-display text-lg font-bold">{f.name}</h3>
                      <p className="text-xs text-white/80">{f.qualifications}</p>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-xs border-b border-border pb-3">
                      <span className="text-muted-foreground">Teaching Experience:</span>
                      <span className="font-bold text-foreground">{f.experience}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs border-b border-border pb-3">
                      <span className="text-muted-foreground">Kota / Institutional Legacy:</span>
                      <span className="font-semibold text-primary">{f.legacy}</span>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-foreground mb-1">Ranks Mentored:</p>
                      <span className="inline-block rounded-lg bg-primary-soft px-2.5 py-1 text-xs font-bold text-primary">
                        {f.ranksProduced}
                      </span>
                    </div>

                    <p className="text-xs leading-relaxed text-muted-foreground italic">
                      &ldquo;Focus on the physical intuition of every equation; calculation is secondary to understanding the principle.&rdquo;
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="border-t border-border bg-surface p-4">
                  <ActionButton
                    onClick={() => handleBookConsultation(f.name)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Request 1-on-1 Guidance
                  </ActionButton>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 1-on-1 Doubt System Callout */}
      <section className="bg-surface py-16 border-y border-border">
        <div className="section-shell grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> Beyond Classroom Lectures
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Daily 1-on-1 Doubt Clearing Counters
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              A student never gets stuck at Vidyasetu. After lecture hours, our faculty members are available in the dedicated Doubt Resolution Wing from 8:00 AM to 8:00 PM.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-foreground">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>Zero wait time: Step in anytime with your DPP sheets and test papers</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>Root-cause analysis: Mentors pinpoint mathematical lapses and concept blindspots</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>Personalized homework re-assignment for weak topic areas</span>
              </li>
            </ul>

            <div className="mt-8">
              <ActionButton onClick={() => setEnquiryOpen(true)} variant="accent" size="lg">
                Experience a Doubt Counter Session →
              </ActionButton>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-lift">
            <h3 className="font-display text-lg font-bold text-foreground">
              Academic Support Helpline
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Direct access for enrolled students and parents.
            </p>

            <div className="mt-6 space-y-3 text-xs">
              <div className="rounded-2xl bg-surface p-3.5 flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground">Physics & Math Dean</p>
                  <p className="text-muted-foreground text-[11px]">8:00 AM – 2:00 PM</p>
                </div>
                <span className="font-mono font-semibold text-primary">+91 98765 43211</span>
              </div>
              <div className="rounded-2xl bg-surface p-3.5 flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground">Chemistry & Biology Dean</p>
                  <p className="text-muted-foreground text-[11px]">2:00 PM – 8:00 PM</p>
                </div>
                <span className="font-mono font-semibold text-primary">+91 98765 43212</span>
              </div>
              <div className="rounded-2xl bg-surface p-3.5 flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground">Foundation & Olympiad Cell</p>
                  <p className="text-muted-foreground text-[11px]">10:00 AM – 6:00 PM</p>
                </div>
                <span className="font-mono font-semibold text-primary">+91 98765 43213</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuickEnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        title={selectedMentor || "Book Faculty Consultation"}
      />
    </div>
  );
}
