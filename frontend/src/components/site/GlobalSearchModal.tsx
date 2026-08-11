"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, BookOpen, GraduationCap, Trophy, FileText, MapPin, ArrowRight } from "lucide-react";
import { coursesData, facultyData, testSeriesPackages, studyResourcesData, branchesData, blogPostsData } from "@/data/coachingData";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredCourses = q
    ? coursesData.filter((c) => c.name.toLowerCase().includes(q) || c.tag.toLowerCase().includes(q) || c.targetExam.toLowerCase().includes(q))
    : coursesData.slice(0, 4);

  const filteredFaculty = q
    ? facultyData.filter((f) => f.name.toLowerCase().includes(q) || f.department.toLowerCase().includes(q) || f.qualifications.toLowerCase().includes(q))
    : facultyData.slice(0, 3);

  const filteredTests = q
    ? testSeriesPackages.filter((t) => t.name.toLowerCase().includes(q) || t.exam.toLowerCase().includes(q))
    : testSeriesPackages.slice(0, 2);

  const filteredBranches = q
    ? branchesData.filter((b) => b.name.toLowerCase().includes(q) || b.city.toLowerCase().includes(q) || b.address.toLowerCase().includes(q))
    : branchesData.slice(0, 3);

  const filteredBlogs = q
    ? blogPostsData.filter((b) => b.title.toLowerCase().includes(q) || b.category.toLowerCase().includes(q))
    : blogPostsData.slice(0, 2);

  const handleSelect = (url: string) => {
    onClose();
    router.push(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-16 backdrop-blur-sm sm:pt-24 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        {/* Search Header */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3 sm:px-6">
          <Search className="h-5 w-5 text-primary" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses (JEE, NEET), faculty, test series, branches, tips..."
            className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground outline-none"
          />
          {query ? (
            <button onClick={() => setQuery("")} className="rounded-lg p-1 text-muted-foreground hover:bg-surface hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          ) : null}
          <button
            onClick={onClose}
            className="rounded-lg border border-border bg-surface px-2 py-1 text-xs font-semibold text-muted-foreground"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[68vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Quick Tags */}
          {!q && (
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-muted-foreground self-center">Popular:</span>
              {["IIT-JEE", "NEET 2027", "VSAT Scholarship", "Kota HODs", "Test Series", "Indore HQ"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="rounded-full border border-border bg-surface px-3 py-1 font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Courses */}
          {filteredCourses.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Courses & Batches</span>
              </div>
              <div className="mt-2 grid gap-2">
                {filteredCourses.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelect(`/courses/${c.slug}`)}
                    className="flex w-full items-center justify-between rounded-xl border border-transparent p-2.5 text-left transition-colors hover:border-border hover:bg-surface"
                  >
                    <div>
                      <div className="font-display font-semibold text-foreground text-sm flex items-center gap-2">
                        {c.name}
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                          {c.tag}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{c.targetExam} · {c.duration}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Faculty */}
          {filteredFaculty.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
                <GraduationCap className="h-3.5 w-3.5" />
                <span>Star Faculty Mentors</span>
              </div>
              <div className="mt-2 grid gap-2">
                {filteredFaculty.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => handleSelect("/faculty")}
                    className="flex w-full items-center justify-between rounded-xl border border-transparent p-2.5 text-left transition-colors hover:border-border hover:bg-surface"
                  >
                    <div>
                      <div className="font-display font-semibold text-foreground text-sm">
                        {f.name} — <span className="text-primary font-normal">{f.department}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{f.qualifications} · {f.experience} Exp</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Test Series & Study Material */}
          {filteredTests.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <Trophy className="h-3.5 w-3.5" />
                <span>Test Series & CBT</span>
              </div>
              <div className="mt-2 grid gap-2">
                {filteredTests.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleSelect("/test-series")}
                    className="flex w-full items-center justify-between rounded-xl border border-transparent p-2.5 text-left transition-colors hover:border-border hover:bg-surface"
                  >
                    <div>
                      <div className="font-display font-semibold text-foreground text-sm">{t.name}</div>
                      <p className="text-xs text-muted-foreground mt-0.5">{t.testsCount} · {t.price}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Campus Branches */}
          {filteredBranches.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <MapPin className="h-3.5 w-3.5" />
                <span>Campus Centers</span>
              </div>
              <div className="mt-2 grid gap-2">
                {filteredBranches.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => handleSelect("/contact")}
                    className="flex w-full items-center justify-between rounded-xl border border-transparent p-2.5 text-left transition-colors hover:border-border hover:bg-surface"
                  >
                    <div>
                      <div className="font-display font-semibold text-foreground text-sm">{b.name}</div>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{b.address}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Blog & Strategy */}
          {filteredBlogs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
                <FileText className="h-3.5 w-3.5" />
                <span>Articles & Strategy Guides</span>
              </div>
              <div className="mt-2 grid gap-2">
                {filteredBlogs.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => handleSelect(`/blog/${b.slug}`)}
                    className="flex w-full items-center justify-between rounded-xl border border-transparent p-2.5 text-left transition-colors hover:border-border hover:bg-surface"
                  >
                    <div>
                      <div className="font-display font-semibold text-foreground text-sm">{b.title}</div>
                      <p className="text-xs text-muted-foreground mt-0.5">{b.category} · {b.readTime}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border bg-surface px-4 py-2.5 text-xs text-muted-foreground">
          <span>Navigate with mouse or arrow keys</span>
          <span className="font-semibold text-primary">Vidyasetu Instant Finder</span>
        </div>
      </div>
    </div>
  );
}
