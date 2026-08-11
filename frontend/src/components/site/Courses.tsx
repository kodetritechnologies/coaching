import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock, IndianRupee, Laptop, ArrowRight, Sparkles } from "lucide-react";
import { coursesData } from "@/data/coachingData";
import { ActionButton, Reveal, SectionHeading } from "./primitives";

export function Courses() {
  return (
    <section id="courses" className="bg-background py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Academic Programs 2026-27"
          title="Programmes Built for Serious Aspirants"
          subtitle="Structured 3-phase syllabus, printed 24-volume modules, daily practice problems and mentor-led review — pick the batch that matches your target year."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coursesData.map((c, i) => (
            <Reveal key={c.id} delay={i * 60} as="article">
              <div className="card-lift group flex h-full flex-col overflow-hidden rounded-[26px] border border-border bg-card shadow-soft hover:border-primary/40 hover:shadow-lift transition-all duration-300">
                <div className="zoom-media relative aspect-[16/10]">
                  <img
                    src={c.img}
                    alt={`${c.name} batch at Vidyasetu Classes`}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-foreground shadow-soft">
                    {c.tag}
                  </span>
                  <span className="absolute right-4 top-4 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-medium text-white">
                    {c.duration}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-display text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                      <Link href={`/courses/${c.slug}` as any}>
                        {c.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {c.subtitle || c.overview}
                    </p>

                    <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                      <div className="flex min-w-0 items-center gap-2 text-muted-foreground">
                        <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
                        <span className="truncate">{c.startDate || "April 2026"}</span>
                      </div>
                      <div className="flex min-w-0 items-center gap-2 font-bold text-primary">
                        <IndianRupee className="h-4 w-4 shrink-0 text-accent" />
                        <span className="truncate">{c.feeOneTime}</span>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-[11px] font-semibold text-accent">Max 35 Students/Batch</span>
                    <Link href={`/courses/${c.slug}` as any}
                      className="inline-flex items-center gap-1.5 font-display text-xs font-bold text-primary transition-colors hover:text-accent"
                    >
                      View Syllabus & Batches <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}

          {/* All Courses Explorer Card */}
          <Reveal delay={420}>
            <div className="flex h-full flex-col justify-center gap-4 rounded-[26px] border-2 border-dashed border-primary/40 bg-gradient-to-br from-primary-soft to-surface p-8 text-center shadow-soft">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-primary-deep">
                Explore All 7 Specialized Programs
              </h3>
              <p className="text-xs text-muted-foreground">
                Compare syllabi, batch timings, fee structures, and download free sample study modules.
              </p>
              <ActionButton to="/courses" variant="primary" className="mx-auto mt-2">
                View All Courses Directory <ArrowRight className="h-4 w-4" />
              </ActionButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
