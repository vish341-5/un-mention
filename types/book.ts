// types/book.ts

export type CardType =
  | "cover"
  | "lesson"
  | "summary"
  | "action"
  | "review";

export interface CoverCard {
  type: "cover";
  title: string;
  subtitle?: string;
  author?: string;
}

export interface LessonCard {
  type: "lesson";
  title: string;
  quote?: string;
  insights: string[];
  stories: string[];
  applications: string[];
  reflection: string;
  chapterRef?: string;
}

export interface SummaryCard {
  type: "summary";
  title: string;
  points: string[];
}

export interface ActionCard {
  type: "action";
  tag: string;
  question: string;
  placeholder?: string;
  hint?: string;
}

export interface ReviewCard {
  type: "review";
  title: string;
  points: string[];
}

export type Card =
  | CoverCard
  | LessonCard
  | SummaryCard
  | ActionCard
  | ReviewCard;

export interface Day {
  day: number;
  title: string;
  cards: Card[];
}

export interface Book {
  slug: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  theme: string;
  accentColor: string;
  days: Day[];
}