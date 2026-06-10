// app/quiz/page.tsx
import { quizzes } from "@/data/quizzes/index";
import QuizListClient from "@/components/quiz/QuizListClient";

export default function QuizPage() {
  return <QuizListClient quizzes={quizzes} />;
}
