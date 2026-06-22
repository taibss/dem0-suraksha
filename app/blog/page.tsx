import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Suraksha",
};

function AnimatedCard({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <div
      className="h-full"
      style={{
        animation: `fadeUp 0.5s ease forwards`,
        animationDelay: `${index * 0.35}s`,
        opacity: 0,
      }}
    >
      {children}
    </div>
  );
}

export default async function BlogPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/blog?action=list`, { cache: "no-store" });
  const allPosts = await res.json();
  const posts = allPosts.filter((p: { category: string }) => p.category !== "legal-tech");

  const featured = posts.find((p) => p.featured);
  const remaining = posts.filter((p) => !p.featured);

  return (
    <div className="min-h-screen">
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <SiteHeader />
      <section style={{ backgroundColor: "#2BD1FC" }}>
        <div className="mx-auto max-w-6xl px-5 py-28">
          <span className="eyebrow" style={{ color: "#17243F" }}>● Our Blog</span>
          <h1 className="mt-3 font-display text-[clamp(2rem,6vw,3.5rem)] font-extrabold leading-[1] tracking-tight" style={{ color: "#17243F" }}>
            Scam Awareness
          </h1>
          <p className="mt-4 max-w-xl" style={{ color: "rgba(23,36,63,0.8)" }}>
            Plain language guides — written for when it matters.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-12">
          {featured && (
            <AnimatedCard index={0}>
              <Link
                href={`/blog/${featured.slug}`}
                className="group block rounded-2xl p-8 shadow-[4px_4px_0_0_var(--foreground)] transition-transform hover:-translate-y-1"
                style={{ backgroundColor: "#DEF408", color: "#000" }}
              >
                <span className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest" style={{ backgroundColor: "#000", color: "#AEFDCF" }}>
                  {featured.categoryLabel}
                </span>
                <h2 className="mt-4 font-display text-2xl font-extrabold leading-tight md:text-3xl" style={{ color: "#000" }}>
                  {featured.title}
                </h2>
                <p className="mt-3 max-w-2xl" style={{ color: "#000", opacity: 0.8 }}>
                  {featured.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs" style={{ color: "#000", opacity: 0.6 }}>
                  <span>{featured.date}</span>
                  <span>{featured.readTime}</span>
                </div>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold" style={{ color: "#000" }}>
                  Read article <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            </AnimatedCard>
          )}

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {remaining.map((post, i) => (
              <AnimatedCard key={post.slug} index={i + 1}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col rounded-2xl p-6 shadow-[4px_4px_0_0_var(--foreground)] transition-transform hover:-translate-y-1"
                  style={{ backgroundColor: "#AEF5E5", color: "#000" }}
                >
                  <span className="inline-block w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest" style={{ backgroundColor: "#172540", color: "#DEF408" }}>
                    {post.categoryLabel}
                  </span>
                  <h3 className="mt-3 font-display font-bold text-base leading-snug" style={{ color: "#000" }}>
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm" style={{ color: "#000", opacity: 0.8 }}>
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs" style={{ color: "#000", opacity: 0.6 }}>
                    <span>{post.date} · {post.readTime}</span>
                    <span className="font-semibold transition-transform group-hover:translate-x-1" style={{ color: "#000" }}>Read →</span>
                  </div>
                </Link>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
