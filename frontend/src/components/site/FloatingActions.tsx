"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Phone, ArrowUp, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { QuickEnquiryModal } from "./QuickEnquiryModal";

export function FloatingActions() {
  const [visible, setVisible] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* WhatsApp Button (Bottom Right) */}
      <a
        href="https://wa.me/919876543210?text=Hello%20Vidyasetu%20Classes,%20I%20want%20to%20enquire%20about%202026-27%20admissions"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Admission Counsellor on WhatsApp"
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-emerald-600 text-white shadow-lift transition-all duration-300 hover:scale-110 hover:bg-emerald-700"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* Floating Call & Enquiry (Bottom Left) */}
      <div
        className={cn(
          "fixed bottom-5 left-5 z-40 flex items-center gap-2 transition-all duration-500",
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
        )}
      >
        <a
          href="tel:+919876543210"
          className="glass-panel hidden sm:inline-flex items-center gap-2 rounded-full py-2.5 pl-2.5 pr-4 shadow-lift bg-card border border-border"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
            <Phone className="h-4 w-4" />
          </span>
          <span className="font-display text-xs font-bold text-foreground">+91 98765 43210</span>
        </a>

        <button
          onClick={() => setEnquiryOpen(true)}
          className="ripple flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-white shadow-lift transition-transform hover:scale-105 hover:bg-primary-deep"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span>Quick Enquiry</span>
        </button>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground shadow-lift transition-colors hover:bg-primary-soft hover:text-primary"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>

      <QuickEnquiryModal isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </>
  );
}
