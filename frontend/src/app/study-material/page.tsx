"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Download,
  FileText,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Search,
  Filter,
  ArrowRight,
  FileSpreadsheet,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { PageHero } from "@/components/site/PageHero";
import { ActionButton, Reveal } from "@/components/site/primitives";
import { QuickEnquiryModal } from "@/components/site/QuickEnquiryModal";
import { studyResourcesData } from "@/data/coachingData";

const resourceCategories = [
  { id: "all", label: "All Resources" },
  { id: "Handbooks", label: "Formula Handbooks" },
  { id: "PYQs", label: "Chapterwise PYQs" },
  { id: "DPPs", label: "Daily DPP Sheets" },
  { id: "Syllabus", label: "Syllabus Trackers" },
];

export default function StudyMaterialPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const filteredResources = studyResourcesData.filter((res) => {
    const matchesCategory =
      activeCategory === "all" ? true : res.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (resTitle: string) => {
    toast.success(
      `Download Started: ${resTitle}\nOfficial Vidyasetu PDF has been queued for download.`
    );
  };

  return (
    <div className="bg-background">
      <PageHero
        title="Curated Study Material &amp; PYQ Archives"
        description="Crafted by senior Kota faculty. Download high-yield formula summaries, solved previous years' question banks, and daily practice problem sheets for JEE, NEET, and Olympiads."
        breadcrumbs={[{ label: "Study Material & Downloads" }]}

      />

      {/* Search & Category Filter Bar */}
      <section className="sticky top-[69px] z-30 border-b border-border bg-card/95 backdrop-blur-md py-3 shadow-xs">
        <div className="section-shell flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
            {resourceCategories.map((cat) => (
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

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search PDF topics..."
              className="w-full rounded-full border border-border bg-surface py-1.5 pl-9 pr-4 text-xs text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </section>

      {/* Resources Cards Grid */}
      <section className="section-shell py-14 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((res) => (
            <Reveal key={res.id}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:border-primary/40 hover:shadow-lift">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
                      {res.category}
                    </span>
                    <span className="rounded bg-surface px-2 py-0.5 text-[11px] font-mono font-medium text-muted-foreground border border-border">
                      {res.tag} · {res.size}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-lg font-bold text-foreground">{res.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{res.description}</p>
                </div>

                <div className="mt-6 border-t border-border pt-4 flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground font-medium">
                    {res.downloadsCount} Aspirants Downloaded
                  </span>
                  <button
                    onClick={() => handleDownload(res.title)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-white shadow-soft transition-all hover:bg-primary-deep hover:scale-105"
                  >
                    <Download className="h-3.5 w-3.5" /> Download PDF
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Comprehensive Hardcopy Study Package Callout */}
      <section className="bg-surface py-16 border-y border-border">
        <div className="section-shell grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              <BookOpen className="h-3.5 w-3.5" /> Complete Publication Suite
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Printed Modules Delivered to Your Doorstep
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              For distance learning students and self-study aspirants who prefer physical books, we offer our comprehensive 24-volume Vidyasetu Master Study Modules, containing over 20,000 graded questions with complete step-by-step solutions.
            </p>

            <div className="mt-6 space-y-2.5 text-xs sm:text-sm text-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>Level 1 (Concept Checkers) + Level 2 (JEE/NEET Standard) + Level 3 (Rank Boosters)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>QR-code enabled on every question linking to faculty video solutions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>Includes 1-year free access to online AIATS Computer-Based Mock Tests</span>
              </div>
            </div>

            <div className="mt-8">
              <ActionButton onClick={() => setEnquiryOpen(true)} variant="accent" size="lg">
                Order Printed Study Kit
              </ActionButton>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-lift space-y-4">
            <h3 className="font-display text-lg font-bold text-foreground">
              Hardcopy Study Kit Options (Session 2026–27)
            </h3>

            <div className="space-y-3 text-xs">
              <div className="rounded-2xl border border-border bg-surface p-4 flex justify-between items-center">
                <div>
                  <p className="font-bold text-foreground text-sm">IIT-JEE (Main + Adv) Complete Kit</p>
                  <p className="text-muted-foreground text-xs mt-0.5">24 Books (Physics, Chem, Math) + 30 DPP Booklets</p>
                </div>
                <div className="text-right">
                  <span className="font-display text-base font-bold text-primary">₹8,499</span>
                  <p className="text-[10px] text-muted-foreground">Courier Included</p>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-4 flex justify-between items-center">
                <div>
                  <p className="font-bold text-foreground text-sm">NEET UG Medical Complete Kit</p>
                  <p className="text-muted-foreground text-xs mt-0.5">26 Books (Physics, Chem, Botany, Zoology) + 35 DPPs</p>
                </div>
                <div className="text-right">
                  <span className="font-display text-base font-bold text-primary">₹8,999</span>
                  <p className="text-[10px] text-muted-foreground">Courier Included</p>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-4 flex justify-between items-center">
                <div>
                  <p className="font-bold text-foreground text-sm">Class 9 & 10 Olympiad Foundation Kit</p>
                  <p className="text-muted-foreground text-xs mt-0.5">14 Books (Science, Math, Mental Ability, NTSE)</p>
                </div>
                <div className="text-right">
                  <span className="font-display text-base font-bold text-primary">₹4,999</span>
                  <p className="text-[10px] text-muted-foreground">Courier Included</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuickEnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        title="Order Study Material Kit"
      />
    </div>
  );
}
