import Link from "next/link";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { PageHero } from "@/components/site/PageHero";
import { ActionButton, Reveal } from "@/components/site/primitives";
import { blogPostsData, coursesData } from "@/data/coachingData";



export default function BlogPostDetailPage() {
  const { slug } = Route.useParams();
  const post = blogPostsData.find((p) => p.slug === slug) || blogPostsData[0];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="bg-background">
      <PageHero
        badge={post.category}
        title={post.title}
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      >
        <div className="flex flex-wrap items-center gap-6 text-xs text-primary-foreground/80 pt-2">
          <span className="flex items-center gap-1.5 font-semibold text-white">
            <User className="h-4 w-4 text-accent" /> {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-accent" /> {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-accent" /> {post.readTime}
          </span>
        </div>
      </PageHero>

      {/* Article Body & Sidebar */}
      <section className="section-shell py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr]">
          {/* Main Article Content */}
          <article className="prose prose-blue max-w-none text-foreground space-y-6 text-base leading-relaxed">
            <div className="rounded-3xl border border-border bg-surface p-6 shadow-soft not-prose">
              <span className="font-display text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-accent" /> Executive Summary
              </span>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="space-y-6 text-muted-foreground text-sm sm:text-base">
              <h2 className="font-display text-2xl font-bold text-foreground">
                1. The Root Cause of Rank Fluctuations
              </h2>
              <p>
                In high-stakes exams like JEE Advanced and NEET UG, over 70% of candidates who miss the cutoff do not suffer from lack of effort; they suffer from unstructured revision. Trying to re-read 800-page textbooks in the last 6 months leads to cognitive fatigue without active recall.
              </p>
              <p>
                At Vidyasetu, we implement the <strong>3-Tier Recall Matrix</strong>:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground">
                <li><strong>Tier 1 (Core Formulas & Exceptions):</strong> 30-minute daily flashcard review every morning before problem solving.</li>
                <li><strong>Tier 2 (Pattern Recognition):</strong> Solving 20 multi-concept mixed questions across Physics, Chem, and Math.</li>
                <li><strong>Tier 3 (Forensic Mock Analysis):</strong> Cataloging every incorrect mock question in an individual <em>Error Logbook</em>.</li>
              </ul>

              <h2 className="mt-8 font-display text-2xl font-bold text-foreground">
                2. Eliminating Negative Marking Traps
              </h2>
              <p>
                Every wrong bubble in NEET costs 5 marks (+4 lost opportunity plus -1 negative). In JEE Advanced, partial marking schemes require surgical precision. The golden rule is <em>Selective Skipping</em>: if you cannot outline the physical equations within 45 seconds of reading a problem, flag it for Round 2.
              </p>

              <div className="rounded-2xl border-l-4 border-accent bg-accent-soft p-4 not-prose text-xs sm:text-sm text-accent-foreground font-medium">
                &ldquo;A rank in Top 500 is not achieved by solving the hardest 5% questions; it is secured by achieving 100% accuracy in the standard 70% questions.&rdquo;
              </div>

              <h2 className="mt-8 font-display text-2xl font-bold text-foreground">
                3. Weekly Routine of Top 100 Rankers
              </h2>
              <p>
                Consistency beats intensity. Aim for 6 hours of hyper-focused self-study outside of classroom lectures rather than erratic 14-hour marathon sessions. Prioritize 7 hours of uninterrupted sleep to consolidate memory engrams.
              </p>
            </div>

            {/* Share & Feedback */}
            <div className="mt-10 border-t border-border pt-6 flex flex-wrap items-center justify-between gap-4 not-prose">
              <Link href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
              >
                <ArrowLeft className="h-4 w-4" /> Back to All Articles
              </Link>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold text-foreground hover:border-primary transition-colors"
              >
                <Share2 className="h-4 w-4" /> Share Article
              </button>
            </div>
          </article>

          {/* Sidebar: Author Bio & Recommended Programs */}
          <aside className="space-y-6">
            {/* Author Profile */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
                About the Author
              </h4>
              <div className="mt-4 flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white font-bold font-display text-lg">
                  {post.author[0]}
                </span>
                <div>
                  <h5 className="font-display text-base font-bold text-foreground">{post.author}</h5>
                  <p className="text-xs text-primary font-semibold">Senior Academic Council Member</p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                20+ years of classroom teaching experience across Kota and Central India. Mentored 300+ students into IIT Bombay, IIT Delhi, and AIIMS New Delhi.
              </p>
            </div>

            {/* Recommended Coaching Course */}
            <div className="rounded-3xl border-2 border-primary/30 bg-card p-6 shadow-lift">
              <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold text-accent-foreground uppercase tracking-wider">
                Recommended Course
              </span>
              <h4 className="mt-3 font-display text-lg font-bold text-foreground">
                {coursesData[0].name}
              </h4>
              <p className="mt-2 text-xs text-muted-foreground">
                {coursesData[0].description}
              </p>
              <div className="mt-4">
                <ActionButton to={`/courses/${coursesData[0].slug}` as any} variant="primary" size="sm" className="w-full">
                  Explore Course Batches <ArrowRight className="h-3 w-3" />
                </ActionButton>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
