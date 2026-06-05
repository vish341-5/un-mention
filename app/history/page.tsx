"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Bell, ChevronRight, Lightbulb } from "lucide-react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ClerkUserButton } from "@/components/auth/clerk-user-button";
import { books } from "@/data/books/index";
import type { Book } from "@/types/book";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ReflectionEntry {
  question: string;
  answer: string;
  bookSlug: string;
  dayNum: number;
  date: string;
}

export interface ActionEntry {
  tag: string;
  question: string;
  answer: string;
  bookSlug: string;
  dayNum: number;
  date: string;
}

interface DayInsights {
  reflections: ReflectionEntry[];
  actions: ActionEntry[];
}

// ── localStorage helpers ──────────────────────────────────────────────────────

function insightsKey(slug: string, dayNum: number) {
  return `unmention-insights-${slug}-day-${dayNum}`;
}

function getAllInsights(slugs: string[]): {
  reflections: ReflectionEntry[];
  actions: ActionEntry[];
} {
  const reflections: ReflectionEntry[] = [];
  const actions: ActionEntry[] = [];

  if (typeof window === "undefined") return { reflections, actions };

  slugs.forEach((slug) => {
    for (let day = 1; day <= 7; day++) {
      try {
        const raw = window.localStorage.getItem(insightsKey(slug, day));
        if (!raw) continue;
        const data: DayInsights = JSON.parse(raw);
        reflections.push(...(data.reflections ?? []));
        actions.push(...(data.actions ?? []));
      } catch {
        // skip malformed
      }
    }
  });

  // sort newest first
  const byDate = (a: { date: string }, b: { date: string }) =>
    new Date(b.date).getTime() - new Date(a.date).getTime();

  return {
    reflections: reflections.sort(byDate),
    actions: actions.sort(byDate),
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ── Book cover lookup ─────────────────────────────────────────────────────────

function getCover(slug: string): string {
  return books.find((b: Book) => b.slug === slug)?.coverImage ?? "";
}

function getBookTitle(slug: string): string {
  return books.find((b: Book) => b.slug === slug)?.title ?? slug;
}

// ── Entry Row ─────────────────────────────────────────────────────────────────

function EntryRow({
  cover,
  bookTitle,
  question,
  answer,
  date,
  onClick,
}: {
  cover: string;
  bookTitle: string;
  question: string;
  answer: string;
  date: string;
  onClick?: () => void;
}) {
  return (
    <div
      className="flex-col items-center gap-4 p-4 lg:p-5 rounded-2xl transition-colors cursor-pointer hover:opacity-90"
      style={{ backgroundColor: "var(--background)", border: "1px solid var(--border)" }}
      onClick={onClick}
    >
      {/* Cover */}
      {cover && (
        <div className="relative shrink-0 w-12 h-16 rounded-lg overflow-hidden shadow-sm">
          <Image src={cover} alt={bookTitle} fill className="object-cover" />
        </div>
      )}

      {/* Left: question + meta */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-snug" style={{ color: "var(--foreground)" }}>
          {question}
        </p>
        <div className="flex items-center gap-2 mt-1">
        <p className="text-xs mt-0.5" style={{ color: "var(--ink-muted)" }}>{bookTitle}</p>
        <p className="text-xs mt-0.5" style={{ color: "var(--ink-muted)" }}>{formatDate(date)}</p>
        </div>
      </div>

      
      {/* Right: answer preview */}
      <p
        className=" lg:block flex-1 text-sm leading-relaxed line-clamp-2"
        style={{ color: "var(--foreground)" }}
      >
        {answer}
      </p>

      
    </div>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────

function EmptyState({ tab }: { tab: string }) {
  const messages: Record<string, { emoji: string; title: string; body: string }> = {
    Reflections: {
      emoji: "💭",
      title: "No reflections yet",
      body: "As you read through lesson cards, you'll be asked reflection questions. Your answers will appear here.",
    },
    Actions: {
      emoji: "⚡",
      title: "No actions yet",
      body: "Action questions from each day's cards will show up here once you start answering them.",
    },
  };

  const { emoji, title, body } = messages[tab] ?? messages["Reflections"];

  return (
    <div
      className="rounded-2xl lg:rounded-3xl p-12 flex flex-col items-center gap-4 text-center"
      style={{ backgroundColor: "var(--background)", border: "1.5px dashed var(--border)" }}
    >
      <div
        className="grid h-14 w-14 place-items-center rounded-2xl text-2xl"
        style={{ backgroundColor: "var(--background-secondary)" }}
      >
        {emoji}
      </div>
      <div>
        <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{title}</p>
        <p className="text-xs mt-1 max-w-xs leading-relaxed" style={{ color: "var(--ink-muted)" }}>{body}</p>
      </div>
      <Link
        href="/library"
        className="text-xs font-medium px-4 py-2 rounded-full transition-opacity hover:opacity-80"
        style={{ backgroundColor: "var(--background-secondary)", color: "var(--gold)", border: "1px solid var(--border)" }}
      >
        Go to Library →
      </Link>
    </div>
  );
}

// ── Tabs ──────────────────────────────────────────────────────────────────────

const TABS = ["Reflections", "Actions"] as const;
type Tab = typeof TABS[number];

// ── Book Filter Dropdown ──────────────────────────────────────────────────────

function BookFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-xl px-3 py-2 text-sm font-medium appearance-none pr-8 cursor-pointer"
      style={{
        backgroundColor: "var(--background)",
        border: "1px solid var(--border)",
        color: "var(--foreground)",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238C8074' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 10px center",
      }}
    >
      <option value="all">All Books</option>
      {books.map((b: Book) => (
        <option key={b.slug} value={b.slug}>{b.title}</option>
      ))}
    </select>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function HistoryPage() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("Reflections");
  const [bookFilter, setBookFilter] = useState("all");
  const [data, setData] = useState<{
    reflections: ReflectionEntry[];
    actions: ActionEntry[];
  }>({ reflections: [], actions: [] });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const slugs = books.map((b: Book) => b.slug);
    setData(getAllInsights(slugs));
  }, []);

  const filtered = {
    reflections: bookFilter === "all" ? data.reflections : data.reflections.filter((r) => r.bookSlug === bookFilter),
    actions: bookFilter === "all" ? data.actions : data.actions.filter((a) => a.bookSlug === bookFilter),
  };

  return (
    <>
      <SidebarProvider
        style={{ "--sidebar-width": "260px", backgroundColor: "var(--background-secondary)" } as React.CSSProperties}
      >
        {isDesktop && <AppSidebar />}

        <SidebarInset className="flex-1 overflow-auto" style={{ backgroundColor: "var(--background-secondary)" }}>

          {/* ── Top bar ── */}
          <div
            className="sticky top-0 z-10 flex items-center justify-between px-5 lg:px-8 py-4"
            style={{ backgroundColor: "var(--background-secondary)", borderBottom: "1px solid var(--border)" }}
          >
            <div />
            <div className="hidden lg:flex items-center gap-3">
              <button
                className="grid h-9 w-9 place-items-center rounded-full hover:opacity-80"
                style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
                aria-label="Notifications"
              >
                <Bell size={16} />
              </button>
              <ClerkUserButton />
            </div>
          </div>

          {/* ── Content ── */}
          <div className="p-5 lg:p-8 max-w-4xl mx-auto space-y-6">

            {/* Title */}
            <div>
              <h1
                className="text-3xl lg:text-4xl font-semibold"
                style={{ fontFamily: "var(--font-serif)", color: "var(--foreground)" }}
              >
                History
              </h1>
              <p className="mt-1 text-sm" style={{ color: "var(--ink-muted)" }}>
                Your reflections. Your actions. Your growth.
              </p>
            </div>

            {/* ── Tabs + Filter ── */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-1">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="px-4 py-2 text-sm font-medium rounded-xl transition-colors"
                    style={{
                      color: activeTab === tab ? "var(--gold)" : "var(--ink-muted)",
                      borderBottom: activeTab === tab ? "2px solid var(--gold)" : "2px solid transparent",
                      backgroundColor: "transparent",
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <BookFilter value={bookFilter} onChange={setBookFilter} />
            </div>

            {/* ── Tab Content ── */}
            <div className="space-y-3">

              {/* Reflections */}
              {activeTab === "Reflections" && (
                filtered.reflections.length === 0 ? (
                  <EmptyState tab="Reflections" />
                ) : (
                  filtered.reflections.map((r, i) => (
                    <EntryRow
                      key={i}
                      cover={getCover(r.bookSlug)}
                      bookTitle={getBookTitle(r.bookSlug)}
                      question={r.question}
                      answer={r.answer}
                      date={r.date}
                    />
                  ))
                )
              )}

              {/* Actions */}
              {activeTab === "Actions" && (
                filtered.actions.length === 0 ? (
                  <EmptyState tab="Actions" />
                ) : (
                  filtered.actions.map((a, i) => (
                    <EntryRow
                      key={i}
                      cover={getCover(a.bookSlug)}
                      bookTitle={getBookTitle(a.bookSlug)}
                      question={a.question}
                      answer={a.answer}
                      date={a.date}
                    />
                  ))
                )
              )}

              

            </div>

            {/* ── Footer nudge ── */}
            <div
              className="rounded-2xl p-5 flex items-center gap-4"
              style={{ backgroundColor: "var(--background)", border: "1px solid var(--border)" }}
            >
              <div
                className="grid h-10 w-10 place-items-center rounded-xl shrink-0"
                style={{ backgroundColor: "var(--background-secondary)" }}
              >
                <Lightbulb size={18} style={{ color: "var(--gold)" }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                  Keep reflecting. Keep growing.
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--ink-muted)" }}>
                  The more you reflect and take action, the more you'll get out of every book.
                </p>
              </div>
            </div>

          </div>
        </SidebarInset>
      </SidebarProvider>

    </>
  );
}
