"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  Search,
  ChevronDown,
  Sparkles,
  BookOpen,
  Users,
  Building2,
  Layers,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ActionButton } from "./primitives";
import { GlobalSearchModal } from "./GlobalSearchModal";
import { QuickEnquiryModal } from "./QuickEnquiryModal";
import BasicProvider from "@/utils/BasicProvider";
import { coursesData } from "@/data/coachingData";
import { DynamicIcon } from "./DynamicIcon";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [coursesMegaOpen, setCoursesMegaOpen] = useState(false);
  const [aboutMegaOpen, setAboutMegaOpen] = useState(false);
  const [navigationItems, setNavigationItems] = useState<any[]>([]);

  const currentPath = usePathname();

  useEffect(() => {
    const fetchNavigation = async () => {
      const basicProvider = BasicProvider();
      const response = await basicProvider.getMethod("public/cms/navigation/main-menu");
      console.log("navigation", response);
      if (response?.status === "success" && response.data) {
        setNavigationItems(response.data.items || []);
      }
    };
    fetchNavigation();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false);
    setCoursesMegaOpen(false);
    setAboutMegaOpen(false);
  }, [currentPath]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-background">
        {/* Top Contact & Announcement Bar */}
        <div className="bg-primary-deep text-primary-foreground border-b border-white/10">
          <div className="section-shell flex flex-col justify-between py-1.5 text-xs sm:flex-row sm:items-center sm:py-2">
            <div className="flex items-center gap-2 font-medium">
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/25 px-2 py-0.5 text-[10px] font-bold text-accent">
                <Sparkles className="h-3 w-3" /> ADMISSIONS 2026-27
              </span>
              <span className="truncate">
                VSAT National Scholarship Test on 15 Sept 2026 · Up to 100% Fee Waiver
              </span>
            </div>

            <div className="hidden items-center gap-5 sm:flex">
              <Link href="/scholarship" className="font-semibold text-accent hover:underline">
                Apply for VSAT
              </Link>
              <span className="opacity-40">|</span>
              <a href="tel:+917389901234" className="inline-flex items-center gap-1.5 font-semibold hover:text-accent transition-colors">
                <Phone className="h-3.5 w-3.5 text-accent" /> +91 73899 01234
              </a>
              <span className="opacity-40">|</span>
              <Link href="/contact" className="hover:text-accent transition-colors">
                Campuses & Centers
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <nav
          className={cn(
            "transition-all duration-300 border-b border-border/80",
            scrolled ? "glass-panel shadow-soft py-2.5" : "bg-background py-4",
          )}
        >
          <div className="section-shell flex items-center justify-between gap-3">
            {/* Institute Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-soft transition-transform hover:scale-105 overflow-hidden">
                <span
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.5) 4px, rgba(255,255,255,0.5) 5px)",
                  }}
                />
                <span className="font-display text-xl font-black tracking-tight leading-none select-none" style={{ letterSpacing: "-0.04em" }}>VS</span>
              </span>
              <div className="hidden xl:block">
                <span className="block font-display text-lg font-extrabold leading-tight text-primary">
                  Vidyasetu Classes
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Official Portal · Est. 2005
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <ul className="hidden items-center justify-center gap-0 lg:flex flex-1 min-w-0">
              {navigationItems.length > 0 ? (
                navigationItems.map((item, index) => {
                  const titleLower = item.title?.toLowerCase() || "";

                  if (titleLower.includes("courses")) {
                    return (
                      <li key={index} className="relative" onMouseEnter={() => setCoursesMegaOpen(true)} onMouseLeave={() => setCoursesMegaOpen(false)}>
                        <Link href={item.url || "/courses"}
                          className={cn(
                            "inline-flex items-center gap-0.5 whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium transition-colors",
                            currentPath.startsWith(item.url || "/courses") ? "bg-primary-soft text-primary font-semibold" : "text-foreground/75 hover:text-primary hover:bg-surface",
                          )}
                        >
                          {item.title} <ChevronDown className="h-3 w-3 opacity-50" />
                        </Link>
                        {coursesMegaOpen && (
                          <div className="absolute -left-20 top-full pt-2 w-[540px] animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                            <div className="rounded-3xl border border-border bg-card p-5 shadow-lift">
                              <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
                                <span className="font-display text-xs font-bold uppercase tracking-wider text-primary">{item.description || `Explore ${item.title}`}</span>
                                <Link href={item.url || "#"} className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline">View All <ArrowRight className="h-3 w-3" /></Link>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                {item.children && item.children.length > 0 ? (
                                  item.children.map((child: any, cIdx: number) => {
                                    const iconStr = child.iconType === "react-icon" ? child.iconValue : child.icon;
                                    const isImage = child.iconType === "image";
                                    return (
                                      <Link key={cIdx} href={child.url || "#"} className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-primary-soft">
                                        <span className="mt-0.5 rounded-lg bg-primary/10 p-1.5 text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                                          {iconStr && !isImage && <DynamicIcon name={iconStr} className="h-4 w-4 shrink-0" />}
                                          {isImage && child.iconValue && <img src={child.iconValue} alt="icon" className="h-4 w-4 object-contain shrink-0" />}
                                          {(!iconStr && !isImage) && <BookOpen className="h-4 w-4 shrink-0" />}
                                        </span>
                                        <div className="min-w-0 flex flex-col justify-center">
                                          <div className="font-display text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">{child.title}</div>
                                          {child.description && <p className="text-[11px] text-muted-foreground truncate">{child.description}</p>}
                                        </div>
                                      </Link>
                                    );
                                  })
                                ) : (
                                  <div className="col-span-2 text-xs text-muted-foreground py-2">No courses available.</div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  }

                  if (titleLower.includes("results")) {
                    return (
                      <li key={index}>
                        <Link href={item.url || "/results"}
                          className={cn(
                            "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium transition-colors",
                            currentPath.startsWith(item.url || "/results") ? "bg-primary-soft text-primary font-semibold" : "text-foreground/75 hover:text-primary hover:bg-surface",
                          )}
                        >
                          {item.title}
                          <span className="rounded-full bg-accent px-1.5 py-0.5 text-[8px] font-extrabold text-white leading-none">AIR 42</span>
                        </Link>
                      </li>
                    );
                  }

                  if (titleLower.includes("vsat") || titleLower.includes("scholarship")) {
                    return (
                      <li key={index}>
                        <Link href={item.url || "/scholarship"}
                          className={cn(
                            "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium transition-colors",
                            currentPath.startsWith(item.url || "/scholarship") ? "bg-success/15 text-success font-semibold" : "text-success/80 hover:text-success hover:bg-success/10",
                          )}
                        >
                          {item.title}
                          <span className="rounded-full bg-success px-1.5 py-0.5 text-[8px] font-bold text-white leading-none">FREE</span>
                        </Link>
                      </li>
                    );
                  }

                  // Default rendering
                  return (
                    <li key={index} className="relative group">
                      <Link href={item.url || "#"}
                        className={cn(
                          "inline-flex items-center gap-0.5 whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium transition-colors",
                          currentPath === item.url || (item.url !== "/" && currentPath.startsWith(item.url)) ? "bg-primary-soft text-primary font-semibold" : "text-foreground/75 hover:text-primary hover:bg-surface",
                        )}
                      >
                        {item.title}
                        {item.children && item.children.length > 0 && <ChevronDown className="h-3 w-3 opacity-50" />}
                      </Link>

                      {item.children && item.children.length > 0 && (
                        <div className="absolute left-0 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                          <div className="rounded-2xl border border-border bg-card p-3 shadow-lift flex flex-col gap-1">
                            {item.children.map((child: any, cIndex: number) => {
                              const iconStr = child.iconType === "react-icon" ? child.iconValue : child.icon;
                              const isImage = child.iconType === "image";

                              return (
                                <Link key={cIndex} href={child.url || "#"}
                                  className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-primary-soft hover:text-primary transition-colors text-xs font-semibold"
                                >
                                  {iconStr && !isImage && <DynamicIcon name={iconStr} className="h-4 w-4 text-primary shrink-0" />}
                                  {isImage && child.iconValue && <img src={child.iconValue} alt="icon" className="h-4 w-4 object-contain shrink-0" />}
                                  <div>
                                    <div>{child.title}</div>
                                    {child.description && <div className="text-[10px] text-muted-foreground font-normal">{child.description}</div>}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })
              ) : (
                <li className="text-sm text-muted-foreground px-3">Loading menu...</li>
              )}
            </ul>

            {/* Divider */}
            <div className="hidden lg:block h-6 w-px bg-border/70 shrink-0 mx-1" />

            {/* Right CTAs & Mobile Hamburger */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Universal Search Trigger */}
              <button
                aria-label="Search website"
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-2 text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <Search className="h-4 w-4 shrink-0" />
                <span className="hidden 2xl:inline">Search...</span>
                <kbd className="hidden 2xl:inline-block rounded bg-card px-1.5 py-0.5 text-[10px] font-semibold text-foreground border border-border">
                  ⌘K
                </kbd>
              </button>

              {/* Quick Action Button */}
              <ActionButton
                onClick={() => setEnquiryOpen(true)}
                variant="accent"
                size="md"
                className="hidden lg:inline-flex whitespace-nowrap"
              >
                Book Free Demo
              </ActionButton>

              {/* Mobile Hamburger Toggle */}
              <button
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((v) => !v)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl border border-border text-primary lg:hidden"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer Menu */}
          {mobileOpen && (
            <div className="border-t border-border bg-card lg:hidden animate-in slide-in-from-top-3 duration-200">
              <div className="section-shell py-5 space-y-4 max-h-[80vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-2">
                  {navigationItems.length > 0 ? (
                    navigationItems.map((item, idx) => {
                      const titleLower = item.title?.toLowerCase() || "";
                      const isVsat = titleLower.includes("vsat") || titleLower.includes("scholarship");

                      return (
                        <Link key={idx} href={item.url || "#"}
                          className={cn(
                            "rounded-xl border border-border p-3 text-sm font-semibold hover:bg-primary-soft hover:text-primary",
                            isVsat ? "text-accent font-bold" : ""
                          )}
                        >
                          {item.title}
                        </Link>
                      );
                    })
                  ) : (
                    <div className="text-sm text-muted-foreground p-3 col-span-2 text-center">Loading menu...</div>
                  )}
                </div>

                <div className="pt-2">
                  <ActionButton onClick={() => { setMobileOpen(false); setEnquiryOpen(true); }} variant="accent" className="w-full">
                    Book Free Demo Class
                  </ActionButton>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Global Modals */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <QuickEnquiryModal isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </>
  );
}
