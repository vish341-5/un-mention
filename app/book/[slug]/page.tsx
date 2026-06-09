"use client";

import { isDayUnlocked, getProgressPercent } from "@/lib/progress";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ArrowLeft, Bell, CheckCircle2, Lock, X } from "lucide-react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ClerkUserButton } from "@/components/auth/clerk-user-button";
import CardReader from "@/components/reader/CardReader";
import { books } from "@/data/books/index";
import type { Book, Day } from "@/types/book";

const progressKey = (slug: string) => `unmention-progress-${slug}`;

function getCompletedDays(slug: string): number[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(progressKey(slug));
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function getDayStatus(dayNum: number, completedDays: number[]): "completed" | "in-progress" | "locked" {
  if (completedDays.includes(dayNum)) return "completed";
  const maxCompleted = completedDays.length > 0 ? Math.max(...completedDays) : 0;
  if (dayNum === maxCompleted + 1) return "in-progress";
  return "locked";
}

function getDaySubtitle(day: Day): string {
  const cover = day.cards.find((card) => card.type === "cover");
  return cover && "subtitle" in cover ? cover.subtitle ?? "" : "";
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height: 5, backgroundColor: "var(--border)" }}>
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${value}%`, backgroundColor: "var(--gold)" }}
      />
    </div>
  );
}

function DayModal({ day, book, onClose }: { day: Day; book: Book; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-50 grid h-10 w-10 place-items-center rounded-full bg-[rgba(255,255,255,0.08)] text-white transition-opacity hover:opacity-80"
        aria-label="Close reader"
      >
        <X size={18} />
      </button>
      <div className="relative h-full w-full">
        <CardReader day={day} book={book} />
      </div>
    </div>
  );
}

export default function BookDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);

  const { slug } = React.use(params);
  const book = books.find((b: Book) => b.slug === slug);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (slug) setCompletedDays(getCompletedDays(slug));
  }, [slug]);

  if (!book) {
    return (
      <div className="p-8 text-sm" style={{ color: "var(--ink-muted)" }}>
        Book not found.
      </div>
    );
  }

  const totalDays = book.days.length;
  const completedCount = completedDays.length;
  const percent = totalDays > 0 ? Math.round((completedCount / totalDays) * 100) : 0;
  const currentDayNum = Math.min(completedCount + 1, totalDays);

  return (
    <>
      <SidebarProvider
        style={{ "--sidebar-width": "260px", backgroundColor: "var(--background-secondary)" } as React.CSSProperties}
      >
        {isDesktop && <AppSidebar />}

        <SidebarInset className="flex-1 overflow-auto" style={{ backgroundColor: "var(--background-secondary)" }}>
          <div className="p-5 lg:p-8 max-w-4xl mx-auto space-y-6">
            <div
              className="sticky top-0 z-10 flex items-center justify-between px-5 lg:px-8 py-4"
              style={{ backgroundColor: "var(--background-secondary)", borderBottom: "1px solid var(--border)" }}
            >
              <Link
                href="/"
                className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
                style={{ color: "var(--foreground)" }}
              >
                <ArrowLeft size={16} />
                Back to Home
              </Link>

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

            <div
              className="rounded-2xl lg:rounded-3xl p-5 lg:p-8 flex flex-col lg:flex-row gap-6"
              style={{ backgroundColor: "var(--background)", border: "1px solid var(--border)" }}
            >
              <div className="relative shrink-0 h-44 w-32 lg:h-56 lg:w-40 rounded-xl overflow-hidden shadow-lg self-start">
                <Image src={book.coverImage} alt={book.title} fill className="object-cover" />
              </div>

              <div className="flex flex-col justify-between gap-4 flex-1">
                <div>
                  <h1
                    className="text-2xl lg:text-4xl font-semibold leading-tight"
                    style={{ fontFamily: "var(--font-serif)", color: "var(--foreground)" }}
                  >
                    {book.title}
                  </h1>
                  <p className="mt-1 text-sm" style={{ color: "var(--ink-muted)" }}>{book.author}</p>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
                    {book.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      const day = book.days.find((d) => d.day === currentDayNum);
                      if (day) setSelectedDay(day);
                    }}
                    className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}
                  >
                    {completedCount === 0 ? "Start Day 1" : "Continue Reading"} →
                  </button>
                  <button
                    className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium hover:opacity-80"
                    style={{ backgroundColor: "var(--background-secondary)", color: "var(--foreground)", border: "1px solid var(--border)" }}
                  >
                    {percent}% Complete
                  </button>
                </div>
              </div>
            </div>

            <div
              className="rounded-2xl lg:rounded-3xl p-5 lg:p-6"
              style={{ backgroundColor: "var(--background)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold" style={{ color: "var(--foreground)" }}>
                  Reading Progress
                </h2>
                <span className="text-sm font-semibold" style={{ color: "var(--gold)" }}>
                  {percent}% complete
                </span>
              </div>
              <ProgressBar value={percent} />
            </div>

            <div
              className="rounded-2xl lg:rounded-3xl p-5 lg:p-6"
              style={{ backgroundColor: "var(--background)", border: "1px solid var(--border)" }}
            >
              <h2 className="text-base font-semibold mb-4" style={{ color: "var(--foreground)" }}>
                Your {totalDays}-Day Journey
              </h2>
              <div className="space-y-1">
                {book.days.map((day) => {
                  const status = getDayStatus(day.day, completedDays);
                  return (
                    <button
                      key={day.day}
                      type="button"
                      onClick={() => status !== "locked" && setSelectedDay(day)}
                      className="w-full text-left"
                      style={{ opacity: status === "locked" ? 0.55 : 1 }}
                    >
                      <div
                        className="flex items-center justify-between gap-3 rounded-2xl p-4 transition-colors"
                        style={{
                          backgroundColor: status === "in-progress" ? "var(--background-secondary)" : "var(--background)",
                          border: "1px solid var(--border)",
                          cursor: status === "locked" ? "not-allowed" : "pointer",
                        }}
                      >
                        <div>
                          <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                            Day {day.day}: {day.title}
                          </p>
                          <p className="text-xs mt-1" style={{ color: "var(--ink-muted)" }}>
                            {getDaySubtitle(day)}
                          </p>
                        </div>
                        <span className="text-xs font-semibold" style={{ color: "var(--foreground-muted)" }}>
                          {status === "completed" ? "Done" : status === "in-progress" ? "Continue" : "Locked"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
      {selectedDay && <DayModal day={selectedDay} book={book} onClose={() => setSelectedDay(null)} />}
    </>
  );
}
