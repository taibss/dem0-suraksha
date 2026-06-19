import "dotenv/config";
import { supabase } from "../src/lib/supabase";

async function verify() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug, category, category_label")
    .order("slug");

  if (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }

  console.log(`Total posts: ${data.length}\n`);

  const cats: Record<string, number> = {};
  data.forEach((p) => {
    cats[p.category] = (cats[p.category] || 0) + 1;
  });

  console.log("Posts by category:");
  Object.entries(cats).forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count}`);
  });

  console.log("\nAll posts:");
  data.forEach((p) => console.log(`  ${p.slug} [${p.category}]`));
}

verify();
