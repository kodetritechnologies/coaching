"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  BookOpen,
  Users,
  Target,
  HeartHandshake,
  CheckCircle2,
  Calendar,
  Sparkles,
  Building,
  Quote,
  ArrowRight,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ActionButton, Reveal, Counter } from "@/components/site/primitives";
import { QuickEnquiryModal } from "@/components/site/QuickEnquiryModal";
import _directorImg from "@/assets/faculty-1.jpg"; const directorImg = _directorImg.src;
import _heroImg from "@/assets/hero-classroom.jpg"; const heroImg = _heroImg.src;
import _labImg from "@/assets/gallery-2.jpg"; const labImg = _labImg.src;
import _libraryImg from "@/assets/gallery-1.jpg"; const libraryImg = _libraryImg.src;

const title = "About Vidyasetu Classes — 20+ Years of Academic Excellence";
const description =
  "Discover the legacy, mission, and student-first philosophy behind India's premier coaching institute for IIT-JEE, NEET, and Early Foundation.";



const milestones = [
  {
    year: "2005",
    title: "Foundation & First Batch",
    desc: "Started with a batch of 25 engineering aspirants in Indore with a mission to deliver Kota-quality conceptual teaching without astronomical fees.",
  },
  {
    year: "2010",
    title: "First State Rank 1 in IIT-JEE",
    desc: "Produced MP State Topper in IIT-JEE (AIR 74) and launched the dedicated Medical Division for AIPMT/NEET.",
  },
  {
    year: "2015",
    title: "Olympiad & Foundation Wing",
    desc: "Introduced early STEM foundation for classes 6 to 10. Students won 12 Gold Medals in Junior Science Olympiads.",
  },
  {
    year: "2020",
    title: "Smart Hybrid & Computer Lab Integration",
    desc: "Expanded to 4 state-of-the-art centers with 100+ CBT test terminals and biometric attendance tracking for parent transparency.",
  },
  {
    year: "2026",
    title: "National Presence & 50,000+ Alumni",
    desc: "Operating 6 world-class campuses with 50+ full-time faculties, mentoring over 6,500 active classroom students every year.",
  },
];

const coreValues = [
  {
    icon: Target,
    title: "Concept-First Clarity",
    desc: "We reject rote memorization. Every mathematical theorem and physical law is derived from first principles with real-life demonstrations.",
  },
  {
    icon: Users,
    title: "Strict 30-Student Batches",
    desc: "Unlike mass factories with 200 students per hall, our batch size is capped at 30 to guarantee individual teacher-student interaction.",
  },
  {
    icon: Award,
    title: "Full-Time Kota & IITian Faculty",
    desc: "100% of our teachers are permanent staff with an average 12+ years teaching experience, not transient guest lecturers.",
  },
  {
    icon: HeartHandshake,
    title: "Parent Transparency Matrix",
    desc: "Parents receive biometric entry/exit SMS, weekly OMR performance analytics, and bi-monthly 1-on-1 progress reviews.",
  },
];

export default function AboutPage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <div className="bg-background">
      <PageHero
        badge="20+ Years of Academic Excellence"
        title="Building Foundations, Realizing Ambitions"
        description="Established in 2005, Vidyasetu Classes stands as a beacon of ethical coaching, rigorous academic discipline, and student-centric mentorship across Central India."
        breadcrumbs={[{ label: "About Us" }]}
        actions={
          <>
            <ActionButton onClick={() => setEnquiryOpen(true)} variant="accent" size="lg">
              Book a Campus Visit <ArrowRight className="h-4 w-4" />
            </ActionButton>
            <ActionButton to="/courses" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              Explore Our Programs
            </ActionButton>
          </>
        }
      />

      {/* Key Numbers Bar */}
      <section className="border-b border-border bg-surface py-10">
        <div className="section-shell">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Students Mentored", value: 50000, suffix: "+" },
              { label: "Selections in IITs & AIIMS", value: 3200, suffix: "+" },
              { label: "Full-time Kota Mentors", value: 55, suffix: "+" },
              { label: "Modern Campus Centers", value: 6, suffix: "" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-3xl font-extrabold text-primary sm:text-4xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Director's Message */}
      <section className="section-shell py-16 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="relative mx-auto max-w-md overflow-hidden rounded-3xl border-2 border-border bg-card shadow-lift">
              <img
                src={directorImg}
                alt="Director Er. Rajeshwar Sharma addressing students"
                className="h-full w-full object-cover aspect-[4/5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-display text-xl font-bold">Er. Rajeshwar Sharma</p>
                <p className="text-xs text-accent font-semibold">Founder &amp; Academic Director (B.Tech, IIT Roorkee)</p>
                <p className="mt-1 text-[11px] text-white/80">Ex-Kota HOD Physics · 22+ Years Mentorship Experience</p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <Quote className="h-3.5 w-3.5" /> Founder&apos;s Vision
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                &ldquo;True coaching is not about screening out; it is about elevating every curious mind.&rdquo;
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  When we laid the foundation of Vidyasetu in 2005, our conviction was simple: the competitive examination system in India does not test superhuman intellect; it tests unwavering conceptual discipline and emotional resilience.
                </p>
                <p>
                  Over the past two decades, while coaching became an aggressive commercial industry with batch sizes exceeding hundreds, Vidyasetu stayed fiercely true to our founding principle: small batches of 30, individual attention, and a culture where no student is invisible.
                </p>
                <p>
                  Whether your child dreams of walking the corridors of IIT Bombay, donning a white coat at AIIMS, or discovering their passion in Class 8 mathematics, we promise a nurturing ecosystem backed by India&apos;s finest educators.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="h-12 w-32 border-b-2 border-primary/40 font-serif italic text-lg font-bold text-primary flex items-end">
                  R. Sharma
                </div>
                <div className="text-xs text-muted-foreground">
                  <span className="font-bold text-foreground block">Er. Rajeshwar Sharma</span>
                  Academic Director, Vidyasetu Classes
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core Pedagogical Pillars */}
      <section className="bg-surface py-16 sm:py-24 border-y border-border">
        <div className="section-shell">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> The Vidyasetu Advantage
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Discerning Parents Trust Us
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Our systematic 4-tier coaching methodology designed to convert effort into national ranks.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((val, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:border-primary/40 hover:shadow-lift">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <val.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-foreground">{val.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{val.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 20-Year Milestones Timeline */}
      <section className="section-shell py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
            <Calendar className="h-3.5 w-3.5" /> Our Journey
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Two Decades of Setting Academic Benchmarks
          </h2>
        </div>

        <div className="mt-12 relative border-l-2 border-primary/20 ml-4 sm:mx-auto max-w-3xl space-y-10 pl-6 sm:pl-8">
          {milestones.map((m, idx) => (
            <Reveal key={idx} delay={idx * 60}>
              <div className="relative">
                <span className="absolute -left-[35px] sm:-left-[43px] top-1 grid h-8 w-8 place-items-center rounded-full bg-primary text-xs font-bold text-white shadow-soft">
                  {idx + 1}
                </span>
                <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-extrabold text-primary">
                    Year {m.year}
                  </span>
                  <h3 className="mt-2 font-display text-base font-bold text-foreground sm:text-lg">
                    {m.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Infrastructure & Campus Life Snapshot */}
      <section className="bg-primary-deep py-16 text-primary-foreground">
        <div className="section-shell grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              <Building className="h-3.5 w-3.5" /> World-Class Infrastructure
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl text-white">
              An Environment Engineered for Pure Focus
            </h2>
            <p className="mt-4 text-base leading-relaxed text-primary-foreground/80">
              Every Vidyasetu campus features fully air-conditioned smart digital lecture theatres, acoustic insulation, computer-based testing (CBT) labs, and a 24x7 silent reference library with over 10,000 reference volumes.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-primary-foreground/90">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>Biometric student attendance with instant WhatsApp entry/exit alert to parents</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>High-speed CBT testing labs simulating exact NTA JEE/NEET server interfaces</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>Dedicated one-on-one doubt counters staffed by faculty from 8 AM to 8 PM</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>CCTV surveillance across all hallways and study halls for student safety</span>
              </li>
            </ul>

            <div className="mt-8">
              <ActionButton to="/gallery" variant="accent" size="lg">
                View Infrastructure Photo Gallery →
              </ActionButton>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-lift">
              <img src={labImg} alt="Physics and Chemistry Laboratory" className="h-48 w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-lift">
              <img src={libraryImg} alt="Vidyasetu Central Library" className="h-48 w-full object-cover" />
            </div>
            <div className="col-span-2 overflow-hidden rounded-2xl border border-white/10 shadow-lift">
              <img src={heroImg} alt="Smart Digital Lecture Hall" className="h-56 w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="section-shell py-16 sm:py-20">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-primary-soft to-surface p-8 text-center sm:p-12 shadow-soft">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Experience the Vidyasetu Difference Firsthand
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Visit any of our 6 campus locations, meet our senior faculty mentors, and attend 2 days of free demo lectures.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ActionButton onClick={() => setEnquiryOpen(true)} variant="accent" size="lg">
              Book a Free Demo Class
            </ActionButton>
            <ActionButton to="/contact" variant="outline" size="lg">
              Find Nearest Center
            </ActionButton>
          </div>
        </div>
      </section>

      <QuickEnquiryModal isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </div>
  );
}
