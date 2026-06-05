"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CoverCard,
  LessonCard,
  SummaryCard,
  ActionCard,
  ReviewCard,
  Day,
  Book,
} from "@/types/book";

interface ReflectionEntry {
  question: string;
  answer: string;
  bookSlug: string;
  dayNum: number;
  date: string;
}

interface ActionEntry {
  tag: string;
  question: string;
  answer: string;
  bookSlug: string;
  dayNum: number;
  date: string;
}

interface ReviewEntry {
  title: string;
  points: string[];
  answers: string[];
  bookSlug: string;
  dayNum: number;
  date: string;
}

interface DayInsights {
  reflections: ReflectionEntry[];
  actions: ActionEntry[];
  review: ReviewEntry | null;
}

interface CardReaderProps {
  day: Day;
  book: Book;
}

export default function CardReader({ day, book }: CardReaderProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tab, setTab] = useState<"insights" | "stories" | "applications">("insights");
  const [reflections, setReflections] = useState<Record<number, string>>({});
  const [answers, setAnswers] = useState<string[]>(["", "", ""]);
  const [review, setReview] = useState<ReviewEntry | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [animDir, setAnimDir] = useState<"next" | "prev">("next");
  const touchStart = useRef<number | null>(null);
  const actionIndex = useRef(0);

  const accent = book.accentColor;
  const cards = day.cards;
  const current = cards[currentIndex];
  const total = cards.length;
  const progress = ((currentIndex) / (total - 1)) * 100;

  const insightsKey = () => `unmention-insights-${book.slug}-day-${day.day}`;

  function toISOStringSafe(date: Date) {
    return date.toISOString();
  }

  const getActionIndex = (upToIndex: number) => {
    return cards.slice(0, upToIndex).filter((c) => c.type === "action").length;
  };

  const currentActionIndex = getActionIndex(currentIndex);

  const canGoNext = () => {
    if (current.type === "action") {
      return answers[currentActionIndex].trim().length > 0;
    }
    return true;
  };

  const buildDayInsights = (): DayInsights => {
    const reflectionsEntries: ReflectionEntry[] = cards.flatMap((card, index) => {
      if (card.type !== "lesson") return [];
      const answer = reflections[index]?.trim();
      if (!answer) return [];
      return [
        {
          question: card.reflection,
          answer,
          bookSlug: book.slug,
          dayNum: day.day,
          date: toISOStringSafe(new Date()),
        },
      ];
    });

    let actionIndexCounter = 0;
    const actionEntries: ActionEntry[] = cards.flatMap((card) => {
      if (card.type !== "action") return [];
      const answer = answers[actionIndexCounter]?.trim() ?? "";
      const entry = answer
        ? {
            tag: card.tag,
            question: card.question,
            answer,
            bookSlug: book.slug,
            dayNum: day.day,
            date: toISOStringSafe(new Date()),
          }
        : null;
      actionIndexCounter += 1;
      return entry ? [entry] : [];
    });

    return {
      reflections: reflectionsEntries,
      actions: actionEntries,
      review,
    };
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(insightsKey());
    if (!raw) {
      setLoaded(true);
      return;
    }

    try {
      const data: DayInsights = JSON.parse(raw);
      const reflectionMap = data.reflections.reduce<Record<string, string>>((acc, entry) => {
        acc[entry.question] = entry.answer;
        return acc;
      }, {});

      const nextReflections: Record<number, string> = {};
      cards.forEach((card, index) => {
        if (card.type === "lesson") {
          const saved = reflectionMap[card.reflection];
          if (saved) nextReflections[index] = saved;
        }
      });

      const answerMap = data.actions.reduce<Record<string, string>>((acc, entry) => {
        acc[entry.question] = entry.answer;
        return acc;
      }, {});
      const nextAnswers = cards.reduce<string[]>((acc, card) => {
        if (card.type === "action") {
          acc.push(answerMap[card.question] ?? "");
        }
        return acc;
      }, []);

      setReflections(nextReflections);
      setAnswers((prev) => {
        const filled = [...prev];
        nextAnswers.forEach((answer, index) => {
          filled[index] = answer;
        });
        return filled;
      });
      setReview(data.review ?? null);
    } catch {
      // ignore malformed storage
    } finally {
      setLoaded(true);
    }
  }, [book.slug, day.day]);

  useEffect(() => {
    if (!loaded || typeof window === "undefined") return;
    window.localStorage.setItem(insightsKey(), JSON.stringify(buildDayInsights()));
  }, [loaded, reflections, answers, review, book.slug, day.day]);

  useEffect(() => {
    if (current.type !== "review") return;
    setReview((prev) => {
      if (prev && prev.bookSlug === book.slug && prev.dayNum === day.day && prev.title === current.title) {
        return prev;
      }
      return {
        title: current.title,
        points: current.points,
        answers: answers.map((answer) => answer.trim()),
        bookSlug: book.slug,
        dayNum: day.day,
        date: toISOStringSafe(new Date()),
      };
    });
  }, [current, book.slug, day.day]);

  function navigate(dir: "next" | "prev") {
    if (animating) return;
    if (dir === "next" && currentIndex >= total - 1) return;
    if (dir === "prev" && currentIndex <= 0) return;
    if (dir === "next" && !canGoNext()) return;

    setAnimDir(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((i) => (dir === "next" ? i + 1 : i - 1));
      setTab("insights");
      setAnimating(false);
    }, 280);
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigate("next");
      if (e.key === "ArrowLeft") navigate("prev");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentIndex, animating, answers]);

  function onTouchStart(e: React.TouchEvent) {
    touchStart.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (!touchStart.current) return;
    const dx = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) navigate(dx > 0 ? "next" : "prev");
    touchStart.current = null;
  }

  const slideClass = animating
    ? animDir === "next"
      ? "opacity-0 translate-x-8"
      : "opacity-0 -translate-x-8"
    : "opacity-100 translate-x-0";

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#0C0A09" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Top bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 px-6 pt-5 pb-3 flex flex-col gap-3"
        style={{ background: "linear-gradient(to bottom, #0C0A09 60%, transparent)" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-xs tracking-widest transition-opacity hover:opacity-70"
              style={{ color: accent, fontFamily: "var(--font-mono, monospace)" }}
            >
              ← BACK
            </button>
            <span
              className="text-xs tracking-widest opacity-40"
              style={{ color: "#fff", fontFamily: "var(--font-mono, monospace)" }}
            >
              {book.title.toUpperCase()}
            </span>
          </div>
          <span
            className="text-xs opacity-40"
            style={{ color: "#fff", fontFamily: "var(--font-mono, monospace)" }}
          >
            DAY {day.day} · {currentIndex + 1}/{total}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 w-full rounded-full" style={{ background: "#ffffff10" }}>
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%`, background: accent }}
          />
        </div>
      </div>

      {/* Card area */}
      <div className="fixed inset-0 top-16 bottom-20 overflow-y-auto">
      <div className="flex flex-col items-center justify-start px-4 pt-8 pb-8 max-w-3xl mx-auto w-full">
        <div
          key={currentIndex}
          className={`w-full transition-all duration-280 ease-out ${slideClass}`}
        >
          <CardSwitch
            card={current}
            accent={accent}
            tab={tab}
            setTab={setTab}
            reflections={reflections}
            setReflections={(idx, val) =>
              setReflections((r) => ({ ...r, [idx]: val }))
            }
            cardIndex={currentIndex}
            answers={answers}
            setAnswers={setAnswers}
            actionIndex={currentActionIndex}
            allAnswers={answers}
          />
        </div>
      </div>
      </div>

      {/* Bottom nav */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-6 pb-8 pt-4"
        style={{ background: "linear-gradient(to top, #0C0A09 60%, transparent)" }}
      >
        <button
          onClick={() => navigate("prev")}
          disabled={currentIndex === 0}
          className="w-11 h-11 rounded-xl flex items-center justify-center text-lg transition-all"
          style={{
            border: "1px solid #ffffff12",
            background: "#ffffff06",
            color: "#F5EFE6",
            opacity: currentIndex === 0 ? 0.2 : 1,
          }}
        >
          ←
        </button>

        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {cards.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                height: 5,
                width: i === currentIndex ? 20 : 5,
                background:
                  i === currentIndex
                    ? accent
                    : i < currentIndex
                    ? accent + "50"
                    : "#ffffff18",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => navigate("next")}
          disabled={currentIndex === total - 1 || !canGoNext()}
          className="w-11 h-11 rounded-xl flex items-center justify-center text-lg transition-all"
          style={{
            border: `1px solid ${canGoNext() ? accent + "40" : "#ffffff12"}`,
            background: canGoNext() ? accent + "18" : "#ffffff06",
            color: canGoNext() ? accent : "#ffffff30",
            opacity: currentIndex === total - 1 ? 0.2 : 1,
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}

// ── CARD SWITCH ───────────────────────────────────────────────────────────────
interface CardSwitchProps {
  accent: string;
  tab: "insights" | "stories" | "applications";
  setTab: (t: "insights" | "stories" | "applications") => void;
  reflections: Record<number, string>;
  setReflections: (idx: number, val: string) => void;
  cardIndex: number;
  answers: string[];
  setAnswers: (answers: string[]) => void;
  actionIndex: number;
  allAnswers: string[];
}

function CardSwitch({ card, ...props }: { card: Card } & CardSwitchProps) {
  if (card.type === "cover") return <CoverCardUI card={card} {...props} />;
  if (card.type === "lesson") return <LessonCardUI card={card} {...props} />;
  if (card.type === "summary") return <SummaryCardUI card={card} {...props} />;
  if (card.type === "action") return <ActionCardUI card={card} {...props} />;
  if (card.type === "review") return <ReviewCardUI card={card} {...props} />;
  return null;
}

// ── SHARED STYLES ─────────────────────────────────────────────────────────────
const cardBase: React.CSSProperties = {
  background: "linear-gradient(145deg, #181410, #131109)",
  border: "1px solid #ffffff0C",
  borderRadius: 20,
  padding: "32px 28px",
  boxShadow: "0 32px 80px #00000080, inset 0 1px 0 #ffffff06",
};

function Tag({ text, accent }: { text?: string; accent: string }) {
  if (!text) return null;
  return (
    <p
      className="text-xs tracking-widest mb-4 uppercase"
      style={{ color: accent, fontFamily: "var(--font-mono, monospace)" }}
    >
      {text}
    </p>
  );
}

// ── COVER ─────────────────────────────────────────────────────────────────────
function CoverCardUI({ card, accent, ...props }: { card: CoverCard } & CardSwitchProps) {
  return (
    <div
      style={{
        ...cardBase,
        background: "linear-gradient(160deg, #1A0E04 0%, #0C0A09 70%)",
        border: `1px solid ${accent}20`,
        minHeight: 420,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <p
          className="text-xs tracking-widest mb-10"
          style={{ color: accent, fontFamily: "var(--font-mono, monospace)" }}
        >
          UNMENTION · DAY {card.subtitle?.split(" ")[1] || "1"}
        </p>
        <h1
          className="text-5xl font-bold leading-tight mb-4"
          style={{
            fontFamily: "var(--font-serif, Georgia, serif)",
            color: "#F5EFE6",
          }}
          dangerouslySetInnerHTML={{ __html: card.title }}
        />
        <p
          className="text-sm mt-4"
          style={{ color: "#8C7B6A", fontFamily: "var(--font-sans, sans-serif)" }}
        >
          {card.author}
        </p>
      </div>
      <div>
        <div
          className="w-12 h-0.5 mb-6"
          style={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
        />
        <p
          className="text-xs flex items-center gap-2"
          style={{ color: "#ffffff25", fontFamily: "var(--font-mono, monospace)" }}
        >
          <span
            className="inline-block w-2 h-2 rounded-full animate-pulse"
            style={{ background: accent }}
          />
          Tap → to begin
        </p>
      </div>
    </div>
  );
}

// ── LESSON ────────────────────────────────────────────────────────────────────
function LessonCardUI({
  card,
  accent,
  tab,
  setTab,
  reflections,
  setReflections,
  cardIndex,
}: { card: LessonCard } & CardSwitchProps) {
  const content = {
    insights: card.insights,
    stories: card.stories,
    applications: card.applications,
  };
  const contentLinks = [
    { key: "stories", label: "Want to read stories?" },
    { key: "applications", label: "Want to read applications?" },
  ] as const;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Main card */}
        <div style={cardBase}>
          <Tag text={card.chapterRef} accent={accent} />
          <h2
            className="text-3xl font-bold leading-tight mb-4"
            style={{
              fontFamily: "var(--font-serif, Georgia, serif)",
              color: "#F5EFE6",
            }}
          >
            {card.title}
          </h2>

          {/* Quote */}
          {card.quote && (
            <div
              className="mb-6 pl-4"
              style={{ borderLeft: `3px solid ${accent}` }}
            >
              <p
                className="text-base italic leading-relaxed"
                style={{
                  color: "#E8D5B7",
                  fontFamily: "var(--font-serif, Georgia, serif)",
                }}
              >
                "{card.quote}"
              </p>
            </div>
          )}

          {/* Tabs */}
          {/* Tab content — capped at 3 paragraphs */}
          <div className="flex flex-col gap-4">
            {content[tab].map((para, i) => (
              <p
                key={i}
                className="text-sm leading-relaxed"
                style={{
                  color: "#B8B0A4",
                  fontFamily: "var(--font-sans, sans-serif)",
                  lineHeight: 1.85,
                }}
              >
                {para}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start gap-2">
            {tab !== "insights" && (
              <button
                type="button"
                onClick={() => setTab("insights")}
                className="text-xs tracking-wide transition-opacity hover:opacity-70"
                style={{
                  color: "#ffffff45",
                  fontFamily: "var(--font-mono, monospace)",
                }}
              >
                Read insights
              </button>
            )}
            {contentLinks.map((link) => (
              <button
                key={link.key}
                type="button"
                onClick={() => setTab(link.key)}
                className="text-xs tracking-wide transition-opacity hover:opacity-70 disabled:opacity-100"
                disabled={tab === link.key}
                style={{
                  color: tab === link.key ? accent : "#ffffff45",
                  cursor: tab === link.key ? "default" : "pointer",
                  fontFamily: "var(--font-mono, monospace)",
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

        </div>

        {/* Reflection card — separate below */}
        <div
          style={{
            ...cardBase,
            background: `linear-gradient(135deg, ${accent}08, #131109)`,
            border: `1px solid ${accent}18`,
            padding: "24px",
          }}
        >
        <p
          className="text-xs tracking-widest mb-3"
          style={{ color: accent, fontFamily: "var(--font-mono, monospace)" }}
        >
          REFLECT
        </p>
        <p
          className="text-sm italic mb-4 leading-relaxed"
          style={{ color: "#8C7B6A", fontFamily: "var(--font-sans, sans-serif)" }}
        >
          {card.reflection}
        </p>
        <textarea
          value={reflections[cardIndex] || ""}
          onChange={(e) => setReflections(cardIndex, e.target.value)}
          placeholder="Your thought here (optional)..."
          className="w-full rounded-xl p-4 text-sm leading-relaxed resize-none focus:outline-none transition-all"
          rows={3}
          style={{
            background: "#ffffff06",
            border: "1px solid #ffffff10",
            color: "#F5EFE6",
            fontFamily: "var(--font-sans, sans-serif)",
          }}
        />
        </div>
      </div>
  );
}

// ── SUMMARY ───────────────────────────────────────────────────────────────────
function SummaryCardUI({ card, accent, ...props }: { card: SummaryCard } & CardSwitchProps) {
  return (
    <div style={cardBase}>
      <Tag text="DAY SUMMARY" accent={accent} />
      <h2
        className="text-3xl font-bold mb-8"
        style={{
          fontFamily: "var(--font-serif, Georgia, serif)",
          color: "#F5EFE6",
        }}
      >
        {card.title}
      </h2>
      <div className="flex flex-col gap-4">
        {card.points.map((point, i) => (
          <div key={i} className="flex gap-4 items-start">
            <span
              className="text-xs mt-1 shrink-0 w-6 h-6 rounded-md flex items-center justify-center font-bold"
              style={{
                background: accent + "20",
                color: accent,
                fontFamily: "var(--font-mono, monospace)",
              }}
            >
              {i + 1}
            </span>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#B8B0A4", fontFamily: "var(--font-sans, sans-serif)" }}
            >
              {point}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ACTION ────────────────────────────────────────────────────────────────────
function ActionCardUI({
  card,
  accent,
  answers,
  setAnswers,
  actionIndex,
}: { card: ActionCard; accent: string } & CardSwitchProps) {
  const totalActions = 3;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={cardBase}>
        <div className="flex items-center justify-between mb-2">
          <Tag text={card.tag} accent={accent} />
          <span
            className="text-xs opacity-40"
            style={{ color: "#fff", fontFamily: "var(--font-mono, monospace)" }}
          >
            {actionIndex + 1}/{totalActions}
          </span>
        </div>

        {/* Progress segments */}
        <div className="flex gap-2 mb-8">
          {Array.from({ length: totalActions }).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-0.5 rounded-full transition-all duration-300"
              style={{
                background: i <= actionIndex ? accent : "#ffffff15",
              }}
            />
          ))}
        </div>

        <h2
          className="text-2xl font-bold leading-snug mb-8"
          style={{
            fontFamily: "var(--font-serif, Georgia, serif)",
            color: "#F5EFE6",
          }}
        >
          {card.question}
        </h2>

        <textarea
          value={answers[actionIndex] || ""}
          onChange={(e) => {
            const newAnswers = [...answers];
            newAnswers[actionIndex] = e.target.value;
            setAnswers(newAnswers);
          }}
          placeholder={card.placeholder || "Write your commitment here..."}
          autoFocus
          rows={4}
          className="w-full rounded-xl p-4 text-sm leading-relaxed resize-none focus:outline-none transition-all"
          style={{
            background: "#ffffff06",
            border: `1px solid ${answers[actionIndex]?.trim() ? accent + "40" : "#ffffff10"}`,
            color: "#F5EFE6",
            fontFamily: "var(--font-sans, sans-serif)",
          }}
        />

        <p
          className="text-xs mt-3 transition-colors"
          style={{
            color: answers[actionIndex]?.trim() ? accent + "80" : "#ffffff20",
            fontFamily: "var(--font-mono, monospace)",
          }}
        >
          {answers[actionIndex]?.trim()
            ? "✓ Tap → to continue"
            : "One sentence is enough — make it specific"}
        </p>
      </div>

      {/* Hint */}
      {card.hint && (
        <div
          style={{
            ...cardBase,
            padding: "18px 24px",
            background: accent + "08",
            border: `1px solid ${accent}18`,
          }}
        >
          <p
            className="text-xs leading-relaxed"
            style={{ color: accent + "80", fontFamily: "var(--font-sans, sans-serif)" }}
          >
            {card.hint}
          </p>
        </div>
      )}
    </div>
  );
}

// ── REVIEW ────────────────────────────────────────────────────────────────────
function ReviewCardUI({
  card,
  accent,
  allAnswers,
}: { card: ReviewCard; accent: string } & CardSwitchProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={cardBase}>
        <Tag text="YOUR COMMITMENTS" accent={accent} />
        <h2
          className="text-3xl font-bold mb-8"
          style={{
            fontFamily: "var(--font-serif, Georgia, serif)",
            color: "#F5EFE6",
          }}
        >
          {card.title}
        </h2>

        <div className="flex flex-col gap-4">
          {card.points.map((point, i) => (
            <div
              key={i}
              className="rounded-xl p-5"
              style={{
                background: accent + "08",
                border: `1px solid ${accent}18`,
              }}
            >
              <p
                className="text-xs mb-2 tracking-widest"
                style={{ color: accent + "70", fontFamily: "var(--font-mono, monospace)" }}
              >
                COMMITMENT {i + 1}
              </p>
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ color: "#8C7B6A", fontFamily: "var(--font-sans, sans-serif)" }}
              >
                {point}
              </p>
              {allAnswers[i] ? (
                <p
                  className="text-sm font-medium leading-relaxed"
                  style={{ color: "#F5EFE6", fontFamily: "var(--font-sans, sans-serif)" }}
                >
                  "{allAnswers[i]}"
                </p>
              ) : (
                <p
                  className="text-sm italic"
                  style={{ color: "#ffffff20", fontFamily: "var(--font-sans, sans-serif)" }}
                >
                  Not answered
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Screenshot prompt */}
      <div
        style={{
          ...cardBase,
          padding: "20px 24px",
          textAlign: "center",
          background: "linear-gradient(135deg, #1A0E04, #131109)",
          border: `1px solid ${accent}20`,
        }}
      >
        <p
          className="text-xs mb-1"
          style={{ color: "#ffffff30", fontFamily: "var(--font-mono, monospace)" }}
        >
          📸 Screenshot this to save your commitments
        </p>
        <p
          className="text-xs"
          style={{ color: accent + "50", fontFamily: "var(--font-mono, monospace)" }}
        >
          unmention.app
        </p>
      </div>
    </div>
  );
}
