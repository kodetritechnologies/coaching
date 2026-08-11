import { Quote, Star } from "lucide-react";
import _t1 from "@/assets/topper-1.jpg"; const t1 = _t1.src;
import _t2 from "@/assets/topper-2.jpg"; const t2 = _t2.src;
import _t3 from "@/assets/topper-3.jpg"; const t3 = _t3.src;
import { Reveal, SectionHeading } from "./primitives";

const reviews = [
  {
    img: t1,
    name: "Aarav Sharma",
    role: "IIT Bombay, CSE · AIR 211",
    batch: "2022–24 Pinnacle",
    quote:
      "The DPP culture changed everything for me. I never left a class without solving what was taught the same evening. By mock #14 I was consistently above 99 percentile.",
    stars: 5,
  },
  {
    img: t2,
    name: "Ishita Verma",
    role: "AIIMS New Delhi · AIR 87",
    batch: "2023–25 NEET Batch",
    quote:
      "Biology doubt counters ran till 9 PM. Ma'am literally re-taught three chapters for a group of us before the mock tests. No other institute does that.",
    stars: 5,
  },
  {
    img: t3,
    name: "Rohan Patidar",
    role: "IIT Delhi, Electrical · AIR 334",
    batch: "2022–24 Pinnacle",
    quote:
      "Weekly test rank cards showed me exactly which chapter was pulling my percentile down. That data won me my rank — I fixed Rotational Mechanics in week 3.",
    stars: 5,
  },
];

const parentReview = {
  name: "Sunita Joshi",
  role: "Parent — Bhopal Campus",
  quote:
    "The parent app sends attendance notifications within minutes of my daughter entering class. Fee receipts, test scores — everything is transparent. We never had to call the office once.",
  stars: 5,
};

export function Testimonials() {
  return (
    <section className="bg-surface py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Student & Parent Voices"
          title="Hear it from the students who made it"
          subtitle="Recorded on campus after the 2025 results — unscripted, unedited."
        />

        {/* Main 3-column grid */}
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 80} as="article">
              <div className="flex h-full flex-col overflow-hidden rounded-[22px] border border-border bg-card shadow-soft">
                {/* Photo header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-primary-deep">
                  <img
                    src={r.img}
                    alt={`${r.name} sharing their experience`}
                    loading="lazy"
                    width={700}
                    height={700}
                    className="h-full w-full object-cover opacity-90 transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {/* Batch badge */}
                  <span className="absolute bottom-3 left-3 rounded-full bg-primary/90 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur">
                    {r.batch}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <Quote className="h-5 w-5 text-accent shrink-0" />
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground italic">
                    "{r.quote}"
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                    <div className="min-w-0">
                      <p className="truncate font-display text-sm font-bold text-foreground">{r.name}</p>
                      <p className="truncate text-xs text-primary font-medium">{r.role}</p>
                    </div>
                    <div className="flex shrink-0 gap-0.5 text-accent">
                      {Array.from({ length: r.stars }).map((_, k) => (
                        <Star key={k} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Parent testimonial — full width, different style */}
        <Reveal delay={240}>
          <div className="mt-5 flex flex-col gap-4 rounded-[22px] border border-border bg-primary-soft p-6 sm:flex-row sm:items-start">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground font-display text-sm font-bold">
              SJ
            </span>
            <div className="min-w-0 flex-1">
              <Quote className="h-4 w-4 text-accent mb-2" />
              <p className="text-sm leading-relaxed text-foreground italic">"{parentReview.quote}"</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <div>
                  <p className="font-display text-sm font-bold text-foreground">{parentReview.name}</p>
                  <p className="text-xs text-muted-foreground">{parentReview.role}</p>
                </div>
                <div className="flex gap-0.5 text-accent">
                  {Array.from({ length: parentReview.stars }).map((_, k) => (
                    <Star key={k} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
