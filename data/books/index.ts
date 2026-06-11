import type { Book, Day } from "@/types/book";

import lawsDay1 from "./48-laws-of-power/day1";
import lawsDay2 from "./48-laws-of-power/day2";
import lawsDay3 from "./48-laws-of-power/day3";
import lawsDay4 from "./48-laws-of-power/day4";
import lawsDay5 from "./48-laws-of-power/day5";
import lawsDay6 from "./48-laws-of-power/day6";
import lawsDay7 from "./48-laws-of-power/day7";

import atomicDay1 from "./atomic-habits/day1";
import atomicDay2 from "./atomic-habits/day2";
import atomicDay3 from "./atomic-habits/day3";
import atomicDay4 from "./atomic-habits/day4";
import atomicDay5 from "./atomic-habits/day5";
import atomicDay6 from "./atomic-habits/day6";
import atomicDay7 from "./atomic-habits/day7";

import zeroDay1 from "./zero-to-one/day1";
import zeroDay2 from "./zero-to-one/day2";
import zeroDay3 from "./zero-to-one/day3";
import zeroDay4 from "./zero-to-one/day4";
import zeroDay5 from "./zero-to-one/day5";
import zeroDay6 from "./zero-to-one/day6";
import zeroDay7 from "./zero-to-one/day7";

import humanNatureDay1 from "./laws-of-human-nature/day1";
import humanNatureDay2 from "./laws-of-human-nature/day2";
import humanNatureDay3 from "./laws-of-human-nature/day3";
import humanNatureDay4 from "./laws-of-human-nature/day4";
import humanNatureDay5 from "./laws-of-human-nature/day5";
import humanNatureDay6 from "./laws-of-human-nature/day6";
import humanNatureDay7 from "./laws-of-human-nature/day7";

import shoeDay1 from "./shoe-dog/day1";
import shoeDay2 from "./shoe-dog/day2";
import shoeDay3 from "./shoe-dog/day3";
import shoeDay4 from "./shoe-dog/day4";
import shoeDay5 from "./shoe-dog/day5";
import shoeDay6 from "./shoe-dog/day6";
import shoeDay7 from "./shoe-dog/day7";


const lawsDays: Day[] = [
  lawsDay1 as Day,
  lawsDay2 as Day,
  lawsDay3 as Day,
  lawsDay4 as Day,
  lawsDay5 as Day,
  lawsDay6 as Day,
  lawsDay7 as Day,
];

const atomicDays: Day[] = [
  atomicDay1 as Day,
  atomicDay2 as Day,
  atomicDay3 as Day,
  atomicDay4 as Day,
  atomicDay5 as Day,
  atomicDay6 as Day,
  atomicDay7 as Day,
];

const zeroDays: Day[] = [
  zeroDay1 as Day,
  zeroDay2 as Day,
  zeroDay3 as Day,
  zeroDay4 as Day,
  zeroDay5 as Day,
  zeroDay6 as Day,
  zeroDay7 as Day,
];

const humanNatureDays: Day[] = [
  humanNatureDay1 as Day,
  humanNatureDay2 as Day,
  humanNatureDay3 as Day,
  humanNatureDay4 as Day,
  humanNatureDay5 as Day,
  humanNatureDay6 as Day,
  humanNatureDay7 as Day,
];

const shoeDays: Day[] = [
  shoeDay1 as Day,
  shoeDay2 as Day,
  shoeDay3 as Day,
  shoeDay4 as Day,
  shoeDay5 as Day,
  shoeDay6 as Day,
  shoeDay7 as Day,
]

export const books: Book[] = [
  {
    slug: "48-laws-of-power",
    title: "48 Laws of Power",
    author: "By Robert Greene",
    description: "7-day learning journey. One day, one law. Focused and actionable.",
    coverImage: "/images/48-laws-of-power.jpeg",
    theme: "gold",
    accentColor: "var(--accent-laws)",
    days: lawsDays,
  },
  {
    slug: "atomic-habits",
    title: "Atomic Habits",
    author: "By James Clear",
    description: "A practical, seven-day habit-building guide for consistent change.",
    coverImage: "/images/atomic-habit.jpeg",
    theme: "green",
    accentColor: "var(--accent-atomic)",
    days: atomicDays,
  },
  {
    slug: "zero-to-one",
    title: "Zero to One",
    author: "By Peter Thiel",
    description: "Daily lessons on building the future and creating something new.",
    coverImage: "/images/zero-to-one.jpeg",
    theme: "blue",
    accentColor: "var(--accent-zero)",
    days: zeroDays,
  },
  {
    slug: "laws-of-human-nature",
    title: "The Laws of Human Nature",
    author: "By Robert Greene",
    description: "Master the hidden forces that drive human behavior and use them to your advantage.",
    coverImage: "/images/laws-of-human-nature.jpg",
    theme: "red",
    accentColor: "var(--accent-humanNature)",
    days: humanNatureDays,
  },
  {
    slug: "shoe-dog",
    title: "Shoe Dog",
    author: "By Phil Knight",
    description: "The raw, honest memoir of how Nike was built from nothing into a global empire.",
    coverImage: "/images/shoe-dog.jpg",
    theme: "black",
    accentColor: "var(--accent-shoe)",
    days: shoeDays,
  },
];

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((book) => book.slug === slug);
}

export function getDay(slug: string, dayNum: number): Day | undefined {
  const book = getBookBySlug(slug);
  return book?.days.find((day) => day.day === dayNum);
}
