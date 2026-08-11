"use client";

import { useState, type FormEvent } from "react";
import { X, CheckCircle, ShieldCheck, Phone, User, BookOpen, MapPin, Sparkles } from "lucide-react";
import { toast } from "react-hot-toast";
import { ActionButton } from "./primitives";
import { coursesData, branchesData } from "@/data/coachingData";

interface QuickEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: string;
  title?: string;
}

export function QuickEnquiryModal({
  isOpen,
  onClose,
  defaultCourse,
  title = "Book a Free Demo & Counselling Session",
}: QuickEnquiryModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      toast.success(
        "Enquiry Received Successfully!\nOur Senior Academic Counsellor will call you within 2 business hours."
      );
    }, 700);
  };

  const handleReset = () => {
    setSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-primary-deep px-6 py-4 text-primary-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            <h3 className="font-display text-base font-bold sm:text-lg">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-primary-foreground/80 hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <div className="py-6 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h4 className="mt-4 font-display text-xl font-bold text-foreground">Demo Slot Reserved!</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                We have registered your details. A dedicated mentor will reach out on WhatsApp/Phone to confirm your preferred center and timing.
              </p>
              <div className="mt-6">
                <ActionButton onClick={handleReset} variant="primary" className="w-full">
                  Done
                </ActionButton>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-muted-foreground">
                Experience real Kota & IITian teaching pedagogy. Attend 2 days of live classroom lectures with zero obligation.
              </p>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Student Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    required
                    name="name"
                    placeholder="e.g. Aryan Gupta"
                    className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Mobile Number (WhatsApp) *</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      required
                      name="phone"
                      type="tel"
                      pattern="[0-9+ ]{10,15}"
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Target Course *</label>
                  <div className="relative">
                    <BookOpen className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <select
                      required
                      name="course"
                      defaultValue={defaultCourse || coursesData[0].name}
                      className="w-full appearance-none rounded-xl border border-input bg-background py-2.5 pl-10 pr-8 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      {coursesData.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Preferred Campus Center</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <select
                      name="center"
                      defaultValue={branchesData[0].name}
                      className="w-full appearance-none rounded-xl border border-input bg-background py-2.5 pl-10 pr-8 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      {branchesData.map((b) => (
                        <option key={b.id} value={b.name}>
                          {b.city} — {b.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Current Class / Standard</label>
                  <select
                    name="class"
                    defaultValue="Class 11 Moving"
                    className="w-full appearance-none rounded-xl border border-input bg-background py-2.5 px-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="Class 6-8">Class 6–8 (Junior STEM)</option>
                    <option value="Class 9-10">Class 9–10 (Pre-Foundation)</option>
                    <option value="Class 11 Moving">Class 11 (2-Year Integrated)</option>
                    <option value="Class 12 Moving">Class 12 (1-Year Target)</option>
                    <option value="12th Passed">12th Pass / Dropper Batch</option>
                    <option value="College Graduate">Graduate (Govt/Bank/SSC)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <ActionButton type="submit" variant="accent" size="lg" className="w-full">
                  {submitting ? "Confirming Booking..." : "Submit & Book Free Demo Class"}
                </ActionButton>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                <span>100% Confidential. No Spam Policy.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
