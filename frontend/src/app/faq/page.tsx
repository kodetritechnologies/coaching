"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ActionButton, Reveal } from "@/components/site/primitives";
import BasicProvider from "@/utils/BasicProvider";

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqsData, setFaqsData] = useState<any[]>([]);
  const [faqCategories, setFaqCategories] = useState<any[]>([{ id: "all", label: "All Questions" }]);
  const { getMethod } = BasicProvider();

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await getMethod("public/cms/faqs/all");
        if (res.status === "success" && res.data?.data) {
          const allFaqs: any[] = [];
          const categories = new Set<string>();

          res.data.data.forEach((doc: any) => {
            const categoryName = doc.title || "General";
            categories.add(categoryName);
            
            if (doc.values && Array.isArray(doc.values)) {
              doc.values.forEach((faqItem: any) => {
                allFaqs.push({
                  category: categoryName,
                  question: faqItem.ques,
                  answer: faqItem.ans,
                });
              });
            }
          });

          setFaqsData(allFaqs);
          setFaqCategories([
            { id: "all", label: "All Questions" },
            ...Array.from(categories).map(cat => ({ id: cat, label: cat }))
          ]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchFaqs();
  }, []);

  const filteredFaqs = faqsData.filter((f) => {
    return activeCategory === "all" ? true : f.category === activeCategory;
  });

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="bg-background">
      <PageHero
        title="Frequently Asked Questions (FAQ)"
        description="Transparent clarity on everything from faculty continuity and batch strength to fee installments and safety protocols."
        breadcrumbs={[{ label: "Frequently Asked Questions" }]}

      />

      <section className="sticky top-[69px] z-30 border-b border-border bg-card/95 backdrop-blur-md py-3 shadow-xs">
        <div className="section-shell flex items-center overflow-x-auto scrollbar-none pb-1 sm:pb-0">
          <div className="flex items-center gap-1.5">
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "border border-border bg-surface text-foreground/80 hover:border-primary hover:text-primary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-14 sm:py-20 max-w-4xl mx-auto">
        {filteredFaqs.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-12 text-center">
            <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 font-display text-lg font-bold text-foreground">No matching questions found</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Try searching with other keywords or submit your question directly to our academic team.
            </p>
            <div className="mt-6">
              <ActionButton to="/contact" variant="accent" size="sm">
                Submit Your Query Online
              </ActionButton>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <Reveal key={idx} delay={idx * 30}>
                  <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden transition-colors hover:border-primary/40">
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="flex w-full items-center justify-between p-5 sm:p-6 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                          {faq.category}
                        </span>
                        <h3 className="font-display text-sm sm:text-base font-bold text-foreground">
                          {faq.question}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-accent" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="border-t border-border bg-surface/60 p-5 sm:p-6 text-xs sm:text-sm leading-relaxed text-muted-foreground animate-in fade-in duration-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
