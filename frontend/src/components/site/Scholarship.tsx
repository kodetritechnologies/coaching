import { CalendarDays, Check, MapPin, Timer, ArrowRight } from "lucide-react";
import { ActionButton, Reveal } from "./primitives";

const benefits = [
  "Up to 100% complete tuition fee waiver",
  "24-Volume printed master study modules kit included",
  "Priority residential hostel & AC room allotment",
  "Dedicated 1-on-1 mentor for Top 100 test scorers",
];

export function Scholarship() {
  return (
    <section className="bg-surface py-20">
      <div className="section-shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-[26px] border border-border bg-primary-deep text-primary-foreground shadow-lift">
            <div className="grid-paper pointer-events-none absolute inset-0 opacity-25" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />

            <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 font-display text-xs font-bold uppercase tracking-wide text-accent-foreground shadow-glow">
                  VSAT 2026 National Exam
                </span>
                <h2 className="mt-5 font-display text-3xl font-bold leading-tight sm:text-4xl text-white">
                  Vidyasetu Scholarship Admission Test
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
                  One 90-minute aptitude test decides your fee concession. Open to Class 6 to 12th Pass students targeting JEE, NEET, and Olympiads. ₹5 Crore national pool.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-xs sm:text-sm font-medium backdrop-blur">
                    <CalendarDays className="h-4 w-4 text-accent" /> Phase 1: 15 Sept 2026
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-xs sm:text-sm font-medium backdrop-blur">
                    <Timer className="h-4 w-4 text-accent" /> 90 Mins · 60 Questions
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-xs sm:text-sm font-medium backdrop-blur">
                    <MapPin className="h-4 w-4 text-accent" /> 6 Centers + Online CBT
                  </span>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <ActionButton to="/scholarship" variant="accent" size="lg">
                    Register Free for VSAT <ArrowRight className="h-4 w-4" />
                  </ActionButton>
                  <ActionButton to="/scholarship" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                    View Fee Waiver Slabs
                  </ActionButton>
                </div>
              </div>

              <ul className="grid gap-3 rounded-[24px] border border-white/15 bg-white/10 p-6 backdrop-blur">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-xs sm:text-sm">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-white/95 font-medium">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
