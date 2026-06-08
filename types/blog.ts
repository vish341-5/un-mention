export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readTime: string;
  category: "summary" | "guide" | "list";
  book?: string;
}