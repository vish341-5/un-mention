// types/quiz.ts

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
}

export interface QuizAnswer {
  questionId: string;
  question: string;
  selected: string;
  custom?: string;
}

export interface Quiz {
  slug: string;
  title: string;
  description: string;
  coverImage?: string;
  systemPrompt: string;
  questions: QuizQuestion[];
}
