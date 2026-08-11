"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Sparkles,
  Search,
  Filter,
  BookOpen,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ActionButton, Reveal } from "@/components/site/primitives";
import { blogPostsData } from "@/data/coachingData";

const title = "Exam Strategy & Knowledge Hub — Vidyasetu Classes";
const description =
  "Expert articles, subject-wise revision frameworks, topper interviews, and time management guides authored by senior IIT-JEE and NEET faculty.";



const categories = [
  { id: "all", label: "All Articles" },
  { id: "Strategy", label: "Exam Strategy" },
  { id: "NEET", label: "NEET Medical" },
  { id: "Foundation", label: "Class 9-10 Foundation" },
  { id: "Revision", label: "Revision Tips" },
];

export default function BlogIndexPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPostsData.filter((post) => {
    const matchesCat =
      activeCategory === "all" ? true : post.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredPost = blogPostsData[0];

  return (
    <div className="bg-background">
      <PageHero
        badge="Faculty Insights & Masterclasses"
        title="Vidyasetu Academic Hub &amp; Exam Strategy"
        description="Actionable advice from teachers who have mentored dozens of single-digit All-India Ranks. Discover how to avoid common traps, manage negative marking, and build high-yield revision routines."
        breadcrumbs={[{ label: "Blog & Strategy Hub" }]}
      />

      {/* Featured Lead Post */}
      <section className="section-shell py-12">
        <div className="rounded-3xl border-2 border-primary/30 bg-card p-6 sm:p-10 shadow-lift grid items-center gap-8 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-accent-foreground uppercase tracking-wider">
                Featured Masterclass
              </span>
              <span className="text-xs text-muted-foreground">{featuredPost.readTime}</span>
            </div>

            <h2 className="mt-4 font-display text-2xl sm:text-3xl font-extrabold text-foreground leading-tight hover:text-primary transition-colors">
              <Link href={`/blog/${featuredPost.slug}` as any}>
                {featuredPost.title}
              </Link>
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {featuredPost.excerpt}
            </p>

            <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-primary" /> {featuredPost.author}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-primary" /> {featuredPost.date}
              </span>
            </div>

            <div className="mt-6">
              <ActionButton to={`/blog/${featuredPost.slug}` as any} variant="primary" size="md">
                Read Full Strategy Guide <ArrowRight className="h-4 w-4" />
              </ActionButton>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-surface p-6">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-primary mb-3">
              Key Strategic Takeaways Inside:
            </h4>
            <ul className="space-y-3 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                <span>The 3-phase revision cycle (Concept consolidation, Question mapping, AIATS simulation).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                <span>How to identify and eliminate the 15% silly mistakes causing rank slippage.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                <span>Subject rotation strategies: Alternating heavy calculation with memory-intensive biology/chemistry.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-[69px] z-30 border-y border-border bg-card/95 backdrop-blur-md py-3 shadow-xs">
        <div className="section-shell flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
            {categories.map((cat) => (
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

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles & tips..."
              className="w-full rounded-full border border-border bg-surface py-1.5 pl-9 pr-4 text-xs text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section-shell py-14 sm:py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Reveal key={post.id}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:border-primary/40 hover:shadow-lift">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-lg font-bold text-foreground hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}` as any}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 border-t border-border pt-4 flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    <p className="font-semibold text-foreground">{post.author}</p>
                    <p className="text-[10px]">{post.date}</p>
                  </div>

                  <Link href={`/blog/${post.slug}` as any}
                    className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
                  >
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
