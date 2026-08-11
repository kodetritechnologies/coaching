import { Trophy, ArrowRight } from "lucide-react";
import { toppersData } from "@/data/coachingData";
import { ActionButton, Counter, Reveal, SectionHeading } from "./primitives";

const bigStats = [
  { value: 1247, suffix: "+", label: "IIT JEE Selections (2005–2025)" },
  { value: 2000, suffix: "+", label: "NEET UG Selections" },
  { value: 99, suffix: ".96%", label: "Top Percentile Benchmark" },
];

export function Results() {
  return (
    <section id="results" className="bg-background py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Results 2025 Wall of Fame"
          title="Our Students, Their Ranks, Real Colleges"
          subtitle="Every name below studied in regular Vidyasetu classroom batches — verified roll numbers, authentic testimonials, and zero borrowed ranks."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {toppersData.slice(0, 4).map((s, i) => (
            <Reveal key={s.id} delay={i * 70} as="article">
              <div className="card-lift group h-full overflow-hidden rounded-[26px] border border-border bg-card shadow-soft hover:border-primary/40 hover:shadow-lift transition-all duration-300">
                <div className="zoom-media relative bg-primary-soft">
                  <img
                    src={s.img || (s as any).image}
                    alt={`${s.name}, ${s.rank} in ${s.exam}`}
                    loading="lazy"
                    width={700}
                    height={700}
                    className="aspect-square w-full object-cover"
                  />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-display text-xs font-extrabold text-accent-foreground shadow-glow">
                    <Trophy className="h-3.5 w-3.5" /> {s.rank}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base font-bold text-foreground">{s.name}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-primary">{s.exam}</p>
                  <dl className="mt-4 space-y-2 border-t border-border pt-4 text-xs">
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted-foreground">Course</dt>
                      <dd className="font-semibold text-foreground truncate">{s.courseTaken || (s as any).course}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="shrink-0 text-muted-foreground">College</dt>
                      <dd className="text-right font-bold text-primary truncate">{s.college}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-10 overflow-hidden rounded-[26px] border border-border bg-primary-deep p-8 text-primary-foreground shadow-lift sm:p-10">
            <div className="grid gap-8 sm:grid-cols-[2fr_1fr_1fr]">
              {/* Big hero stat */}
              <div className="flex flex-col justify-center">
                <p className="font-display text-5xl font-extrabold text-accent sm:text-6xl">
                  <Counter value={bigStats[0]!.value} suffix={bigStats[0]!.suffix} />
                </p>
                <p className="mt-2 text-base font-semibold text-white">{bigStats[0]!.label}</p>
                <p className="mt-1 text-xs text-primary-foreground/60">Across all Vidyasetu campus batches · Roll no. verified</p>
              </div>
              {/* Secondary stats */}
              {bigStats.slice(1).map((s) => (
                <div key={s.label} className="flex flex-col justify-center border-l border-white/10 pl-8">
                  <p className="font-display text-3xl font-extrabold text-accent sm:text-4xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-sm font-medium opacity-80">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-9 flex justify-center">
              <ActionButton to="/results" variant="accent" size="lg">
                Explore Full Wall of Fame (2005–2025) <ArrowRight className="h-4 w-4" />
              </ActionButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
