"use client";

import type { ReactNode, MouseEvent } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCountUp, useReveal } from "@/lib/motion";

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const { ref, shown } = useReveal();
  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", shown && "reveal-in", className)}
    >
      {children}
    </Tag>
  );
}

type BtnProps = {
  children: ReactNode;
  href?: string;
  to?: string;
  variant?: "primary" | "accent" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function ActionButton({
  children,
  href,
  to,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  onClick,
}: BtnProps) {
  const onPointer = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--rx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--ry", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const classes = cn(
    "ripple inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    size === "sm" && "px-3.5 py-1.5 text-xs",
    size === "md" && "px-5 py-2.5 text-sm",
    size === "lg" && "px-7 py-3.5 text-base",
    variant === "primary" &&
    "bg-primary text-primary-foreground shadow-soft hover:bg-primary-deep hover:shadow-lift",
    variant === "accent" &&
    "bg-accent text-accent-foreground shadow-glow hover:brightness-105 hover:-translate-y-0.5",
    variant === "outline" &&
    "border-2 border-primary/25 bg-background text-primary hover:border-primary hover:bg-primary-soft",
    variant === "ghost" && "text-foreground hover:bg-surface-2",
    variant === "dark" && "bg-foreground text-background hover:bg-foreground/90 shadow-soft",
    className,
  );

  if (to) {
    return (
      <Link href={to as any} onMouseDown={onPointer} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} onMouseDown={onPointer} onClick={onClick} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onMouseDown={onPointer} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-base leading-relaxed text-muted-foreground">{subtitle}</p> : null}
    </Reveal>
  );
}

export function Counter({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const { ref, value: current } = useCountUp(value);
  return (
    <span ref={ref}>
      {prefix}
      {current.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
