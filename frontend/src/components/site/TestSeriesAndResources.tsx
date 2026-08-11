import Link from "next/link";
import { BarChart3, Download, FileText, Globe2, Newspaper, NotebookPen, Target, ArrowRight } from "lucide-react";
import { testSeriesPackages, studyResourcesData } from "@/data/coachingData";
import { ActionButton, Reveal, SectionHeading } from "./primitives";

export function TestSeriesAndResources() {
  return (
    <>
      <section id="test-series" className="bg-background py-20">
        <div className="section-shell">
          <SectionHeading
            eyebrow="All-India Test Series (AIATS)"
            title="Practice on Exact NTA CBT Interface"
            subtitle="NTA-pattern papers, All India rank, percentile projection and chapter-level diagnostic weakness reports after every attempt."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testSeriesPackages.map((s, i) => (
              <Reveal key={s.id} delay={i * 70}>
                <div className="card-lift flex h-full flex-col justify-between rounded-[26px] border border-border bg-card p-7 shadow-soft hover:border-primary/40 hover:shadow-lift transition-all duration-300">
                  <div>
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                      <BarChart3 className="h-6 w-6" />
                    </span>
                    <span className="mt-4 inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-bold text-primary">
                      {s.exam}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-bold text-foreground">{s.name}</h3>
                    <p className="mt-2 text-xs text-accent font-semibold">{s.testsCount}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{s.mode}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                    <span className="font-display text-xl font-bold text-primary">{s.price}</span>
                    <ActionButton to="/test-series" variant="primary" size="sm">
                      Join Series <ArrowRight className="h-3 w-3" />
                    </ActionButton>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <ActionButton to="/test-series" variant="outline" size="lg">
              View Complete AIATS Testing Calendar & Details →
            </ActionButton>
          </div>
        </div>
      </section>

      <section id="resources" className="bg-surface py-20 border-t border-border">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Free Study Center"
            title="Curated Study Material That Costs You Nothing"
            subtitle="Download formula handbooks, solved chapterwise PYQs, and daily practice problem sheets — 100% free with zero login walls."
          />

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {studyResourcesData.slice(0, 6).map((r, i) => (
              <Reveal key={r.id} delay={(i % 3) * 70} as="li">
                <Link href="/study-material"
                  className="card-lift group flex h-full items-center gap-4 rounded-[22px] border border-border bg-card p-5 shadow-soft hover:border-primary/40 hover:shadow-lift transition-all"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
                    <FileText className="h-6 w-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      {r.title}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">{r.category} · {r.size}</span>
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Download className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>

          <div className="mt-10 flex justify-center">
            <ActionButton to="/study-material" variant="primary" size="lg">
              Explore All Free PDF Downloads & Mindmaps <ArrowRight className="h-4 w-4" />
            </ActionButton>
          </div>
        </div>
      </section>
    </>
  );
}
