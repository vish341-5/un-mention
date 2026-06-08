import { getPost } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";

interface Props {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: Props) {
  const { frontmatter, content } = getPost(params.slug);

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <p
        className="text-xs tracking-widest mb-4"
        style={{ color: "#C9954A", fontFamily: "monospace" }}
      >
        {frontmatter.category.toUpperCase()} · {frontmatter.readTime}
      </p>
      <h1
        className="text-5xl font-bold mb-6"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {frontmatter.title}
      </h1>
      <p
        className="text-lg mb-16"
        style={{ color: "var(--ink-muted)" }}
      >
        {frontmatter.description}
      </p>
      <article className="prose prose-lg max-w-none">
        <MDXRemote source={content} />
      </article>
    </div>
  );
}