import Link from "next/link";
import { BlogPost } from "@/types/blog";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div
        className="p-6 rounded-xl border hover:border-[#C9954A] transition-all cursor-pointer"
        style={{ borderColor: "var(--border)" }}
      >
        <p
          className="text-xs tracking-widest mb-2"
          style={{ color: "#C9954A", fontFamily: "monospace" }}
        >
          {post.category.toUpperCase()} · {post.readTime}
        </p>
        <h2
          className="text-2xl font-bold mb-2"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {post.title}
        </h2>
        <p style={{ color: "var(--ink-muted)" }}>
          {post.description}
        </p>
        <p
          className="text-xs mt-4"
          style={{ color: "var(--ink-muted)", fontFamily: "monospace" }}
        >
          {post.publishedAt}
        </p>
      </div>
    </Link>
  );
}