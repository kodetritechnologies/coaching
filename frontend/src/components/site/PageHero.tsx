import Link from "next/link";
import { ChevronRight, Home, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "./primitives";

interface PageHeroProps {
  badge?: string;
  title: string | ReactNode;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: ReactNode;
  children?: ReactNode;
}

export function PageHero({
  badge,
  title,
  description,
  breadcrumbs = [],
  actions,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-primary-deep py-14 text-primary-foreground sm:py-18">
      {/* Background patterns */}
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-15" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />

      <div className="section-shell relative">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-primary-foreground/75">
          <Link href="/" className="inline-flex items-center gap-1 hover:text-accent transition-colors">
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
          {breadcrumbs.map((b, i) => (
            <div key={b.label} className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3 opacity-60" />
              {b.href && i < breadcrumbs.length - 1 ? (
                <Link href={b.href} className="hover:text-accent transition-colors">
                  {b.label}
                </Link>
              ) : (
                <span className="font-semibold text-accent">{b.label}</span>
              )}
            </div>
          ))}
        </nav>

        <div className="max-w-3xl">
          {badge ? (
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-3.5 py-1 text-xs font-semibold text-accent">
                <ShieldCheck className="h-3.5 w-3.5" />
                {badge}
              </span>
            </Reveal>
          ) : null}

          <Reveal delay={60}>
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white">
              {title}
            </h1>
          </Reveal>

          {description ? (
            <Reveal delay={120}>
              <p className="mt-4 text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
                {description}
              </p>
            </Reveal>
          ) : null}

          {actions ? (
            <Reveal delay={180}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {actions}
              </div>
            </Reveal>
          ) : null}
        </div>

        {children ? (
          <div className="mt-8">
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
