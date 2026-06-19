import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Suraksha",
};

function CategoryPill({ category, posts }: { category: string; posts: { category: string; categoryLabel: string }[] }) {
  const styles: Record<string, string> = {
    prevention: "bg-lime text-lime-foreground",
    legal: "bg-primary text-white",
    story: "bg-ink text-ink-foreground",
    "legal-tech": "",
    "practice-guide": "bg-purple-100 text-purple-900",
    "case-study": "bg-amber-100 text-amber-900",
  };
  const customBg: Record<string, string> = {
    "legal-tech": "#DA70D6",
  };
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${styles[category] ?? "bg-muted text-muted-foreground"}`}
      style={customBg[category] ? { backgroundColor: customBg[category] } : undefined}
    >
      {posts.find((p) => p.category === category)?.categoryLabel ?? category}
    </span>
  );
}

export default async function BlogPage() {
  const { data } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, category, category_label, read_time, date, featured")
    .order("date", { ascending: false });

  const posts = (data ?? [])
    .filter((p) => p.category !== "legal-tech")
    .map((p) => ({
      ...p,
      categoryLabel: p.category_label,
      readTime: p.read_time,
    }));

  const featured = posts.find((p) => p.featured);
  const remaining = posts.filter((p) => !p.featured);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <span className="eyebrow text-lime">● Our Blog</span>
          <h1 className="mt-3 font-display text-[clamp(2rem,6vw,3.5rem)] font-extrabold leading-[1] tracking-tight">
            Scam Awareness
          </h1>
          <p className="mt-4 max-w-xl text-ink-foreground/80">
            Plain language guides — written for when it matters.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-12">
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group block rounded-2xl bg-ink p-8 text-ink-foreground shadow-[4px_4px_0_0_var(--foreground)] transition-transform hover:-translate-y-1"
            >
              <span className="inline-block rounded-full bg-lime px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-lime-foreground">
                {featured.categoryLabel}
              </span>
              <h2 className="mt-4 font-display text-2xl font-extrabold leading-tight md:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 max-w-2xl text-ink-foreground/80">
                {featured.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs text-ink-foreground/60">
                <span>{featured.date}</span>
                <span>{featured.readTime}</span>
              </div>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-lime">
                Read article <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          )}

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {remaining.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border-2 border-border bg-card p-6 shadow-[4px_4px_0_0_var(--foreground)] transition-transform hover:-translate-y-1"
              >
                <CategoryPill category={post.category} posts={posts} />
                <h3 className="mt-3 font-display font-bold text-base leading-snug">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{post.date} · {post.readTime}</span>
                  <span className="font-semibold text-foreground transition-transform group-hover:translate-x-1">Read →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
