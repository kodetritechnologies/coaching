import Link from "next/link";
import { ArrowRight, GraduationCap, ShieldCheck } from "lucide-react";
import { facultyData } from "@/data/coachingData";
import { ActionButton, Reveal, SectionHeading } from "./primitives";

export function Faculty() {
  return (
    <section id="faculty" className="bg-surface py-20 border-y border-border">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Star Faculty & Kota HODs"
          title="Teachers Who Stay Till the Last Doubt is Cleared"
          subtitle="A 100% full-time permanent faculty panel — the same master educators teach your batch from orientation to final exam day."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {facultyData.slice(0, 4).map((m, i) => (
            <Reveal key={m.id} delay={i * 70} as="article">
              <div className="card-lift group h-full overflow-hidden rounded-[26px] border border-border bg-card shadow-soft hover:border-primary/40 hover:shadow-lift transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="zoom-media aspect-[4/5] relative">
                    <img
                      src={m.img || (m as any).image}
                      alt={`${m.name}, ${m.department} faculty`}
                      loading="lazy"
                      width={700}
                      height={700}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="inline-block rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold text-accent-foreground uppercase tracking-wider">
                        {m.department}
                      </span>
                      <h3 className="mt-1 font-display text-base font-bold">{m.name}</h3>
                      <p className="text-xs text-white/80">{m.qualifications}</p>
                    </div>
                  </div>

                  <div className="p-5 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Experience:</span>
                      <span className="font-bold text-foreground">{m.experience}</span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Achievement:</span>
                      <span className="font-semibold text-primary">{m.achievements[0].substring(0, 20)}...</span>
                    </div>
                    <div className="border-t border-border pt-2 text-[11px] text-muted-foreground">
                      <span className="font-semibold text-foreground">Top Mentored:</span> {m.ranksMentored}
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-border bg-surface">
                  <Link href="/faculty"
                    className="inline-flex items-center justify-between w-full text-xs font-bold text-primary hover:text-accent transition-colors"
                  >
                    <span>View Profile & Batches</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <ActionButton to="/faculty" variant="primary" size="lg">
            Meet Our Complete 55+ Faculty Team <ArrowRight className="h-4 w-4" />
          </ActionButton>
        </div>
      </div>
    </section>
  );
}
