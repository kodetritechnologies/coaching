"use client";

import { ArrowRight } from "lucide-react";
import { ActionButton, Reveal, SectionHeading } from "./primitives";
import { useEffect, useState } from "react";
import BasicProvider from "@/utils/BasicProvider";

export function Faq() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const { getMethod } = BasicProvider();

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await getMethod("public/cms/faqs/home");
        if (res.status === "success") {
          const faqDoc = res.data?.data?.[0];
          if (faqDoc && faqDoc.values) {
            setFaqs(faqDoc.values);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchFaqs();
  }, []);
  return (
    <section className="bg-background py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Frequently Asked Questions"
          title="Questions Parents & Students Ask Us Most"
          subtitle="Transparent answers regarding batch caps, faculty continuity, hostel safety, and fee installments."
        />

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="grid gap-3">
            {faqs.slice(0, 6).map((f, i) => (
              <details
                key={i}
                className="group overflow-hidden rounded-[20px] border border-border bg-card shadow-soft [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between px-6 py-5 font-display text-sm sm:text-base font-bold text-foreground transition-colors hover:text-primary">
                  {f.ques}
                  <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border group-open:rotate-180 transition-transform">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {f.ans}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <ActionButton to="/faq" variant="primary" size="lg">
              Explore Complete FAQ Hub (All Categories) <ArrowRight className="h-4 w-4" />
            </ActionButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
