import {
  Award,
  BookOpenCheck,
  BusFront,
  ClipboardList,
  Compass,
  MessageCircleQuestion,
  MonitorPlay,
  Smartphone,
  Users,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Reveal } from "./primitives";

const features = [
  { icon: Users, title: "Small Batch Size", text: "Max 30 students so every doubt gets attention." },
  { icon: ClipboardList, title: "Daily Practice Problems", text: "DPP sheets checked & discussed next day." },
  { icon: BookOpenCheck, title: "Weekly Tests", text: "NTA-pattern tests with rank card & error analysis." },
  { icon: MessageCircleQuestion, title: "Doubt Sessions", text: "Evening counters + WhatsApp support till 10 PM." },
  { icon: Smartphone, title: "Parent App", text: "Live attendance, test scores & fee updates." },
  { icon: MonitorPlay, title: "Recorded Lectures", text: "Every class recorded, available within 6 hours." },
  { icon: Award, title: "Scholarships", text: "Up to 100% fee waiver via VSAT exam." },
  { icon: BusFront, title: "Hostel Facility", text: "Warden-supervised boys & girls hostels on campus." },
  { icon: Compass, title: "Career Guidance", text: "JoSAA, MCC and college selection counselling." },
];

export function WhyChooseUs() {
  return (
    <section id="about" className="bg-primary-deep py-20 overflow-hidden">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:items-start">
          {/* Left: Text panel */}
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Why Choose Us
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                Twenty years of discipline,{" "}
                <span className="text-accent">mentorship</span> &{" "}
                results
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-primary-foreground/75">
                Everything a serious aspirant needs — under one roof, at one fee, with one accountable mentor per student.
              </p>

              {/* Faculty highlight */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-accent">Ex-IITian & MBBS Faculty</p>
                <p className="mt-2 text-sm text-primary-foreground/80 leading-relaxed">
                  100% full-time permanent panel — the same master educators teach your batch from orientation to final exam day. No part-timers, no outsourced faculty.
                </p>
                <Link href="/faculty"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
                >
                  Meet the faculty team <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              {/* Mini stats */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                  <p className="font-display text-2xl font-extrabold text-accent">55+</p>
                  <p className="mt-0.5 text-[11px] text-primary-foreground/60">Full-Time Faculty</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                  <p className="font-display text-2xl font-extrabold text-accent">6</p>
                  <p className="mt-0.5 text-[11px] text-primary-foreground/60">Campus Centers</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: Feature grid */}
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 60} as="li">
                <div className="group flex h-full flex-col gap-3 rounded-2xl border border-white/8 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-accent/30">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-bold text-white">{f.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-primary-foreground/65">{f.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
