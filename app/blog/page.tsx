import { getAllPosts } from "@/lib/blog";
import Link from "next/link";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1
        className="text-5xl font-bold mb-4"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        The Unmention Blog
      </h1>
      <p className="text-lg mb-16" style={{ color: "var(--ink-muted)" }}>
        Book summaries that actually help you apply what you read.
      </p>

      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div className="p-6 rounded-xl border hover:border-[var(--gold)] transition-all"
              style={{ borderColor: "var(--border)" }}>
              <p className="text-xs tracking-widest mb-2"
                style={{ color: "var(--gold)", fontFamily: "monospace" }}>
                {post.category.toUpperCase()} · {post.readTime}
              </p>
              <h2 className="text-2xl font-bold mb-2"
                style={{ fontFamily: "var(--font-serif)" }}>
                {post.title}
              </h2>
              <p style={{ color: "var(--ink-muted)" }}>
                {post.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}