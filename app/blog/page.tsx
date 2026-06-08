import BlogCard from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/blog";

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
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}