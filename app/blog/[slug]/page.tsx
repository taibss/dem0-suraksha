import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/data/blog";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  return {
    title: post ? `${post.title} — Suraksha` : "Blog — Suraksha",
  };
}

function renderContent(content: string) {
  const lines = content.split("\n").filter((l) => l.trim());
  const elements: React.ReactNode[] = [];

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="font-display text-2xl font-bold mt-8 mb-3">
          {trimmed.replace("## ", "")}
        </h2>
      );
    } else if (trimmed.startsWith("- ")) {
      const text = trimmed.replace("- ", "");
      elements.push(
        <li key={i} className="text-base leading-relaxed text-foreground ml-4 list-disc">
          <span dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>') }} />
        </li>
      );
    } else if (/^\d+\./.test(trimmed)) {
      const text = trimmed.replace(/^\d+\.\s*/, "");
      elements.push(
        <li key={i} className="text-base leading-relaxed text-foreground ml-4 list-decimal">
          <span dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>') }} />
        </li>
      );
    } else {
      elements.push(
        <p key={i} className="text-base leading-relaxed text-foreground mb-4">
          <span dangerouslySetInnerHTML={{ __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>') }} />
        </p>
      );
    }
  });

  return elements;
}

export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-3xl px-5 py-10">
          <span className="inline-block rounded-full bg-lime px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-lime-foreground">
            {post.categoryLabel}
          </span>
          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight tracking-tight">
            {post.title}
          </h1>
          <p className="mt-3 text-lg text-ink-foreground/80">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-lime">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-2xl px-5 py-10">
          {renderContent(post.content)}

          <div className="mt-10 rounded-2xl bg-primary p-6 text-white">
            <p className="font-display font-bold text-lg">Got caught in this?</p>
            <p className="mt-1 text-sm text-white/80">Get your personal action plan — free, instant.</p>
            <Link
              href="/help"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-primary"
            >
              Get my action plan →
            </Link>
          </div>

          <Link href="/blog" className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            ← Back to Blog
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
