import { ClipboardCheck, GraduationCap, MessagesSquare, PenLine, Presentation, ArrowRight } from "lucide-react";
import { ActionButton, Reveal, SectionHeading } from "./primitives";

const steps = [
  { icon: PenLine, title: "Register", text: "Fill the enquiry form online or at any branch counter." },
  { icon: MessagesSquare, title: "Counselling", text: "A senior mentor maps your target exam and current level." },
  { icon: Presentation, title: "Demo Class", text: "Attend two live lectures before paying a single rupee." },
  { icon: ClipboardCheck, title: "Admission", text: "Confirm the batch, choose instalments, collect 24 study modules." },
  { icon: GraduationCap, title: "Start Learning", text: "Batch begins with biometric parent app & DPP schedule active." },
];

export function AdmissionProcess() {
  return (
    <section className="bg-surface py-20 border-t border-border">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Admission Process"
          title="Five Steps from Enquiry to Your First Lecture"
          subtitle="Transparent, counsellor-led, zero-pressure and free until you decide to enrol."
        />

        <ol className="relative mt-14 grid gap-8 lg:grid-cols-5">
          <span
            aria-hidden
            className="absolute left-6 top-0 hidden h-full w-px bg-border lg:left-0 lg:top-7 lg:h-px lg:w-full lg:block"
          />
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 90} as="li">
              <div className="relative flex gap-4 lg:block">
                <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-border bg-card text-primary shadow-soft">
                  <s.icon className="h-6 w-6" />
                  <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-accent font-display text-[11px] font-bold text-accent-foreground">
                    {i + 1}
                  </span>
                </span>
                <div className="min-w-0 lg:mt-5">
                  <h3 className="font-display text-base font-bold text-foreground">{s.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-12 flex justify-center">
          <ActionButton to="/admissions" variant="primary" size="lg">
            View Admission Guidelines &amp; Fee Transparency <ArrowRight className="h-4 w-4" />
          </ActionButton>
        </div>
      </div>
    </section>
  );
}
