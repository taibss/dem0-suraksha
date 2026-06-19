import "dotenv/config";
import { BLOG_POSTS } from "../src/data/blog";
import { supabase } from "../src/lib/supabase";

async function seed() {
  const posts = BLOG_POSTS.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    category_label: post.categoryLabel,
    read_time: post.readTime,
    date: post.date,
    featured: post.featured,
    content: post.content,
  }));

  const { error } = await supabase.from("blog_posts").upsert(posts, {
    onConflict: "slug",
  });

  if (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }

  console.log(`Seeded ${posts.length} blog posts.`);
}

seed();
