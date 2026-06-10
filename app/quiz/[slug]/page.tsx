import { quizzes } from "@/data/quizzes/index";
import { notFound } from "next/navigation";
import QuizClient from "@/components/quiz/QuizClient";

export default async function QuizSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = quizzes.find((q) => q.slug === slug);
  if (!quiz) notFound();
  return <QuizClient quiz={quiz} />;
}