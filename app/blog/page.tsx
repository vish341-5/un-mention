import { getAllPosts } from "@/lib/blog";
import BlogClient from "@/components/blog/BlogClient";

export default function Page() {
  const posts = getAllPosts();
  return <BlogClient posts={posts} />;
}