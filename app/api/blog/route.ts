import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  if (action === "list") {
    const { data } = await supabase
      .from("blog_posts")
      .select("slug, title, excerpt, category, category_label, read_time, date, featured")
      .order("date", { ascending: false });

    const posts = (data ?? []).map((p) => ({
      ...p,
      categoryLabel: p.category_label,
      readTime: p.read_time,
    }));

    return Response.json(posts);
  }

  if (action === "single") {
    const slug = searchParams.get("slug");
    if (!slug) return Response.json({ error: "slug required" }, { status: 400 });

    const { data } = await supabase
      .from("blog_posts")
      .select("slug, title, excerpt, category, category_label, read_time, date, featured, content")
      .eq("slug", slug)
      .single();

    if (!data) return Response.json({ error: "not found" }, { status: 404 });

    return Response.json({ ...data, categoryLabel: data.category_label, readTime: data.read_time });
  }

  if (action === "slugs") {
    const { data } = await supabase
      .from("blog_posts")
      .select("slug");

    return Response.json(data ?? []);
  }

  return Response.json({ error: "Invalid action" }, { status: 400 });
}
