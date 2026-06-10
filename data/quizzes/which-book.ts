// data/quizzes/which-book.ts

import { Quiz } from "@/types/quiz";

export const whichBookQuiz: Quiz = {
  slug: "which-book-should-i-read-next",
  title: "Which book should you read next?",
  description: "Answer 5 questions and we'll match you with your perfect read.",
  systemPrompt: `You are a reading advisor for Unmention, an app that helps people apply book knowledge to real life.

The user just completed a quiz. Based on their answers:
1. Give them a reader personality type with a cool, memorable name (e.g. "The Strategist", "The Seeker")
2. In 2-3 sentences, explain why this fits them based specifically on what they said
3. Recommend one book from Unmention's library and explain why it's perfect for them right now
4. End with one punchy sentence pitching them to start it on Unmention

Available books on Unmention:
- The 48 Laws of Power by Robert Greene (slug: 48-laws-of-power) — strategy, power, influence
- (add more books here as your library grows)

Keep the whole response under 180 words. Be warm, direct, and personal. Do not use bullet points — write in flowing paragraphs.`,
  questions: [
    {
      id: "q1",
      question: "What do you want most from a book right now?",
      options: [
        "To gain power and influence",
        "To understand myself better",
        "To be more productive and focused",
        "To think about the world differently",
      ],
    },
    {
      id: "q2",
      question: "How would you describe your current life situation?",
      options: [
        "Ambitious — I'm chasing big goals",
        "Stuck — I need a change",
        "Curious — I just love learning",
        "Rebuilding — starting fresh",
      ],
    },
    {
      id: "q3",
      question: "What kind of reader are you?",
      options: [
        "I read to take action immediately",
        "I read to reflect and journal",
        "I read to have conversations about ideas",
        "I rarely finish books — I need something gripping",
      ],
    },
    {
      id: "q4",
      question: "Pick the word that resonates most with you right now:",
      options: ["Power", "Clarity", "Freedom", "Growth"],
    },
    {
      id: "q5",
      question: "How much time can you commit to reading daily?",
      options: [
        "10–15 minutes",
        "30 minutes",
        "An hour or more",
        "I read in bursts, not daily",
      ],
    },
  ],
};
