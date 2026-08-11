"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, CalendarCheck, ShieldCheck, Star, Trophy, Sparkles, Bell } from "lucide-react";
import _heroImg from "@/assets/hero-classroom.jpg"; const heroImg = _heroImg.src;
import { ActionButton, Counter, Reveal } from "./primitives";
import { QuickEnquiryModal } from "./QuickEnquiryModal";
import BasicProvider from "@/utils/BasicProvider";

const stats = [
  { value: 51200, suffix: "+", label: "Students Mentored" },
  { value: 3247, suffix: "+", label: "IIT & AIIMS Selections" },
  { value: 97, suffix: ".4%", label: "Board / Exam Pass Rate" },
  { value: 20, suffix: "+", label: "Years of Academic Trust" },
];

export function Hero() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const { getMethod } = BasicProvider();
        // Adjust endpoint based on how your public API router is mounted. Assuming /api/public/cms/...
        const res = await getMethod("public/cms/latest-notices");
        if (res.status === "success") {
          setNotices(res.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch notices", error);
      }
    };
    fetchNotices();
  }, []);

  return (
    <section id="home" className="relative overflow-hidden bg-background">
      {/* Background decorations */}
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-accent-soft blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-primary-soft blur-3xl" />

      {/* Live Notice Ticker */}
      <div className="border-b border-border bg-surface/80 py-2.5">
        <div className="section-shell flex items-center gap-3 overflow-hidden text-xs">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 font-bold text-white shrink-0">
            <Bell className="h-3 w-3" /> LATEST NOTICES
          </span>
          <div className="flex-1 overflow-hidden flex items-center">
            {/* @ts-ignore */}
            <marquee className="w-full">
              {notices.map((n) => (
                <span key={n._id} className="inline-flex items-center gap-2 text-foreground/80 mr-6 align-middle">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent inline-block" />
                  <span className="font-semibold text-primary">[{n.category?.name || n.category}]</span> {n.title}
                </span>
              ))}
            {/* @ts-ignore */}
            </marquee>
          </div>
        </div>
      </div>

      <div className="section-shell relative grid items-center gap-12 py-14 lg:grid-cols-[1.08fr_1fr] lg:py-20">
        <div>
          <Reveal>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary-soft px-3.5 py-1.5 text-xs font-bold text-primary">
                <ShieldCheck className="h-4 w-4" />
                ISO 9001:2015 Certified Coaching Institute
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-accent">
                <Sparkles className="h-3 w-3" /> Admissions Open 2026-27
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.12] text-foreground sm:text-5xl xl:text-[3.35rem]">
              Building Ranks &amp; Character for{" "}
              <span className="text-primary">IIT-JEE, NEET</span> &amp;{" "}
              <span className="text-accent">Foundation Olympiads</span>
            </h1>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Concept-first pedagogy with small batches of 30, Kota senior HODs, daily practice problem sheets (DPPs), biometric attendance and dedicated 24x7 doubt-clearing counters.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-8 flex flex-wrap gap-3">
              <ActionButton to="/admissions" variant="accent" size="lg">
                Apply for Admission 2026 <ArrowRight className="h-4 w-4" />
              </ActionButton>
              <ActionButton onClick={() => setEnquiryOpen(true)} variant="outline" size="lg">
                <CalendarCheck className="h-4 w-4" /> Book Free Demo Class
              </ActionButton>
              <ActionButton to="/scholarship" variant="ghost" size="lg" className="text-primary font-bold">
                VSAT Scholarship Test →
              </ActionButton>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border bg-card px-4 py-4 shadow-soft transition-all hover:border-primary/40 hover:shadow-lift"
                >
                  <dt className="font-display text-2xl sm:text-3xl font-extrabold text-primary">
                    <Counter value={s.value} suffix={s.suffix} />
                  </dt>
                  <dd className="mt-1 text-xs font-medium text-muted-foreground">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={120} className="relative">
          <div className="relative overflow-hidden rounded-[26px] border-2 border-border bg-card shadow-lift">
            <img
              src={heroImg}
              alt="Teacher explaining a concept on the whiteboard to Indian students in a Vidyasetu classroom"
              width={1280}
              height={1024}
              className="h-full w-full object-cover aspect-[4/3]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold text-accent-foreground uppercase tracking-wider">
                Authentic Classroom Culture
              </span>
              <p className="mt-1 text-xs sm:text-sm font-semibold">
                Interactive Smart Lectures · Personal Mentorship · Daily Doubt Resolution
              </p>
            </div>
          </div>

          {/* Top Rank Badge */}
          <div className="float-soft absolute -top-4 -right-2 sm:-right-4 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lift">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/20 text-accent font-bold">
              <Trophy className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-xs font-bold text-foreground">AIR 42 · JEE Adv</p>
              <p className="text-[11px] text-muted-foreground">Rohit M. · Batch 2024–25</p>
            </div>
          </div>

          {/* Parent Rating Badge */}
          <div className="float-soft absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lift sm:left-8">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
              <Star className="h-5 w-5 fill-current" />
            </span>
            <div className="min-w-0">
              <p className="font-display text-sm font-bold text-foreground">4.8 / 5.0 Parent Rating</p>
              <p className="truncate text-xs text-muted-foreground">2,914 verified reviews · Google &amp; App</p>
            </div>
          </div>
        </Reveal>
      </div>

      <QuickEnquiryModal isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </section>
  );
}
