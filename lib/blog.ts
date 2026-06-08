import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "@/types/blog";

const blogsDir = path.join(process.cwd(), "content/blog");

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(blogsDir);
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const file = fs.readFileSync(path.join(blogsDir, filename), "utf8");
      const { data } = matter(file);
      return {
        slug: filename.replace(".mdx", ""),
        ...data,
      } as BlogPost;
    });
}

export function getPost(slug: string) {
  const file = fs.readFileSync(
    path.join(blogsDir, `${slug}.mdx`),
    "utf8"
  );
  const { data, content } = matter(file);
  return {
    frontmatter: data as BlogPost,
    content,
  };
}