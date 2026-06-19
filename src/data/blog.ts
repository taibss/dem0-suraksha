export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: "prevention" | "legal" | "story" | "legal-tech" | "practice-guide" | "case-study";
  categoryLabel: string;
  readTime: string;
  date: string;
  featured: boolean;
  content: string;
};
