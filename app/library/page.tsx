"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Bell, BookOpen } from "lucide-react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ClerkUserButton } from "@/components/auth/clerk-user-button";
import { books } from "@/data/books/index";
import type { Book } from "@/types/book";

// ── Helpers ───────────────────────────────────────────────────────────────────

function getProgress(slug: string): number[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(`unmention-progress-${slug}`);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function progressPercent(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

// ── Progress Bar ──────────────────────────────────────────────────────────────

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height: 4, backgroundColor: "var(--border)" }}>
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${value}%`, backgroundColor: "var(--gold)" }}
      />
    </div>
  );
}

// ── Reading Journey Card ──────────────────────────────────────────────────────

function JourneyCard({ book, completedDays }: { book: Book; completedDays: number[] }) {
  const total = book.days.length;
  const completed = completedDays.length;
  const percent = progressPercent(completed, total);
  const currentDay = Math.min(completed + 1, total);

  return (
    <Link
      href={`/book/${book.slug}`}
      className="flex gap-4 rounded-2xl p-4 transition-opacity hover:opacity-90 min-w-[260px] lg:min-w-0"
      style={{ backgroundColor: "var(--background)", border: "1px solid var(--border)" }}
    >
      {/* Cover */}
      <div className="relative flex-shrink-0 w-24 h-32 rounded-xl overflow-hidden shadow-md">
        <Image src={book.coverImage} alt={book.title} fill className="object-cover" />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between flex-1 py-1 min-w-0">
        <div>
          <p className="text-xs font-medium mb-1" style={{ color: "var(--gold)" }}>
            7-day learning journey
          </p>
          <h3
            className="text-base font-semibold leading-tight"
            style={{ fontFamily: "var(--font-serif)", color: "var(--foreground)" }}
          >
            {book.title}
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "var(--ink-muted)" }}>{book.author}</p>
        </div>

        <div>
          <ProgressBar value={percent} />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs" style={{ color: "var(--ink-muted)" }}>
              Day {currentDay} of {total}
            </span>
            <span className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
              {percent}%
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── All Books Card ────────────────────────────────────────────────────────────

function BookCard({ book }: { book: Book }) {
  return (
    <Link
      href={`/book/${book.slug}`}
      className="flex flex-col rounded-2xl p-4 transition-opacity hover:opacity-90"
      style={{ backgroundColor: "var(--background)", border: "1px solid var(--border)" }}
    >
      {/* Cover */}
      <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden shadow-md mb-3">
        <Image src={book.coverImage} alt={book.title} fill className="object-cover" />
      </div>

      <h3 className="text-sm font-semibold leading-snug" style={{ color: "var(--foreground)" }}>
        {book.title}
      </h3>
      <p className="text-xs mt-0.5" style={{ color: "var(--ink-muted)" }}>{book.author}</p>

      <div className="mt-2 flex items-center gap-1.5 text-xs" style={{ color: "var(--ink-muted)" }}>
        <BookOpen size={11} /> 7-day journey
      </div>
    </Link>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────

function EmptyJourneys() {
  return (
    <div
      className="rounded-2xl lg:rounded-3xl p-10 flex flex-col items-center gap-4 text-center"
      style={{ backgroundColor: "var(--background)", border: "1.5px dashed var(--border)" }}
    >
      <div
        className="grid h-14 w-14 place-items-center rounded-2xl text-2xl"
        style={{ backgroundColor: "var(--background-secondary)" }}
      >
        📖
      </div>
      <div>
        <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
          No reading journeys yet
        </p>
        <p className="text-xs mt-1 max-w-xs" style={{ color: "var(--ink-muted)" }}>
          Pick a book below and start your first 7-day journey. Just 10–15 minutes a day.
        </p>
      </div>
      <div
        className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full"
        style={{ backgroundColor: "var(--background-secondary)", color: "var(--gold)", border: "1px solid var(--border)" }}
      >
        ↓ Browse books below
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function LibraryPage() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [progressMap, setProgressMap] = useState<Record<string, number[]>>({});

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const map: Record<string, number[]> = {};
    books.forEach((b: Book) => {
      map[b.slug] = getProgress(b.slug);
    });
    setProgressMap(map);
  }, []);

  const startedBooks = books.filter(
    (b: Book) => progressMap[b.slug] && progressMap[b.slug].length > 0
  );

  return (
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
          <div /> {/* spacer */}
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
        <div className="p-5 lg:p-8 max-w-5xl mx-auto space-y-10">

          {/* Page title */}
          <div>
            <h1
              className="text-3xl lg:text-4xl font-semibold"
              style={{ fontFamily: "var(--font-serif)", color: "var(--foreground)" }}
            >
              Your Library
            </h1>
            <p className="mt-1 text-sm" style={{ color: "var(--ink-muted)" }}>
              Your collection of books and learning journeys.
            </p>
          </div>

          {/* ── Reading Journeys ── */}
          <section>
            <h2 className="text-base font-semibold mb-4" style={{ color: "var(--foreground)" }}>
              Reading Journeys
            </h2>

            {startedBooks.length === 0 ? (
              <EmptyJourneys />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {startedBooks.map((book: Book) => (
                  <JourneyCard
                    key={book.slug}
                    book={book}
                    completedDays={progressMap[book.slug] ?? []}
                  />
                ))}
              </div>
            )}
          </section>

          {/* ── All Books ── */}
          <section>
            <h2 className="text-base font-semibold mb-4" style={{ color: "var(--foreground)" }}>
              All Books
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {books.map((book: Book) => (
                <BookCard key={book.slug} book={book} />
              ))}
            </div>
          </section>

        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
