import "dotenv/config";
import { readFileSync } from "fs";
import { supabase } from "../src/lib/supabase";

function parseBlogs(fileContent: string) {
  const posts = [];
  const sections = fileContent.split(/^## Post \d+/m).slice(1);

  for (const section of sections) {
    const metaMatch = section.match(/```([\s\S]*?)```/);
    if (!metaMatch) continue;

    const meta = metaMatch[1];
    const slug = meta.match(/Slug:\s*(.+)/)?.[1]?.trim();
    const titleTag = meta.match(/Title tag:\s*(.+)/)?.[1]?.trim();
    const excerpt = meta.match(/Meta description:\s*(.+)/)?.[1]?.trim();
    const keyword = meta.match(/Target keyword:\s*(.+)/)?.[1]?.trim();

    const contentAfterMeta = section.slice(metaMatch.index! + metaMatch[0].length).trim();
    const content = contentAfterMeta.replace(/^```/gm, "").trim();

    if (slug && titleTag && content) {
      posts.push({
        slug: slug.replace(/^\//, ""),
        title: titleTag.replace(/ \| LawgicHub$/, "").replace(/ \| Suraksha$/, ""),
        excerpt: excerpt || "",
        category: "legal-tech",
        category_label: "Legal Tech",
        read_time: "5 min read",
        date: "June 2026",
        featured: false,
        content: content,
      });
    }
  }
  return posts;
}

async function importBlogs() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: npx tsx scripts/import-blogs.ts <path-to-md-file>");
    process.exit(1);
  }

  const fileContent = readFileSync(filePath, "utf-8");
  const posts = parseBlogs(fileContent);

  if (posts.length === 0) {
    console.error("No posts found in the file.");
    process.exit(1);
  }

  console.log(`Found ${posts.length} posts. Importing...`);

  const { error } = await supabase.from("blog_posts").upsert(posts, {
    onConflict: "slug",
  });

  if (error) {
    console.error("Import failed:", error.message);
    process.exit(1);
  }

  console.log(`Imported ${posts.length} blog posts.`);
}

importBlogs();
