"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X, Home as HomeIcon, BookOpen, Lightbulb,BookText } from "lucide-react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ClerkUserButton } from "@/components/auth/clerk-user-button";
import { books } from "@/data/books/index";
import type { Book } from "@/types/book";

const progressKey = (slug: string) => `unmention-progress-${slug}`;

function getBookProgress(slug: string): number {
  if (typeof window === "undefined") return 0;
  try {
    const stored = window.localStorage.getItem(progressKey(slug));
    if (!stored) return 0;
    const completedDays = JSON.parse(stored);
    if (!Array.isArray(completedDays)) return 0;
    return Math.round((completedDays.length / 7) * 100);
  } catch {
    return 0;
  }
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: "var(--border)" }}>
      <div
        className="h-1.5 rounded-full transition-all"
        style={{ width: `${value}%`, backgroundColor: "var(--gold)" }}
      />
    </div>
  );
}

const NAV_ITEMS = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/library", label: "Library", Icon: BookOpen },
  { href: "/history", label: "History", Icon: Lightbulb },
  { href: "/blog", label: "Blog", Icon: BookText},

];

export default function Home() {
  const [progressBySlug, setProgressBySlug] = useState<Record<string, number>>({});
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
  function loadProgress() {
    const loaded = books.reduce<Record<string, number>>((acc, book) => {
      acc[book.slug] = getBookProgress(book.slug);
      return acc;
    }, {});
    setProgressBySlug(loaded);
  }

  loadProgress();
  window.addEventListener('focus', loadProgress);
  return () => window.removeEventListener('focus', loadProgress);
}, []);

  const featured = books.find((b) => b.slug === "48-laws-of-power")!;

  return (
    <>
      {/* Mobile nav drawer — portaled to body, only rendered client-side */}
      {mounted && mobileNavOpen && createPortal(
        <>
          <div
            className="fixed inset-0 z-40"
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
            onClick={() => setMobileNavOpen(false)}
          />
          <div
            className="fixed top-0 left-0 z-50 h-full w-64 max-w-full flex flex-col overflow-y-auto"
            style={{ backgroundColor: "var(--background-secondary)" }}
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between px-6 pt-8 pb-6">
              <div className="flex items-baseline">
                <span
                  className="text-xl font-bold"
                  style={{ fontFamily: "var(--font-serif)", color: "var(--foreground)" }}
                >
                  Un
                </span>
                <span className="text-xl font-bold" style={{ color: "var(--gold)" }}>
                  mention
                </span>
              </div>
              <ClerkUserButton />
              <button
                onClick={() => setMobileNavOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-xl"
                style={{ color: "var(--foreground-muted)" }}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex flex-col gap-1 px-4">
              {NAV_ITEMS.map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors"
                  style={{ color: "var(--foreground-muted)", textDecoration: "none" }}
                >
                  <Icon size={16} />
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </>,
        document.body
      )}

      <SidebarProvider
        style={
          {
            "--sidebar-width": "260px",
            backgroundColor: "var(--background-secondary)",
          } as React.CSSProperties
        }
      >
        {/* Only render AppSidebar on desktop — prevents nested <a> on mobile */}
        {isDesktop && <AppSidebar />}

        <SidebarInset
          className="flex-1 overflow-auto"
          style={{ backgroundColor: "var(--background-secondary)" }}
        >
          {/* ── Mobile top header ── */}
          <div
            className="flex lg:hidden items-center justify-between px-5 pt-5 pb-4"
            style={{ backgroundColor: "var(--background-secondary)" }}
          >
            <button
              onClick={() => setMobileNavOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-xl transition-colors"
              style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>

            <div className="flex items-baseline">
              <span
                className="text-xl font-bold"
                style={{ fontFamily: "var(--font-serif)", color: "var(--foreground)" }}
              >
                Un
              </span>
              <span className="text-xl font-bold" style={{ color: "var(--gold)" }}>
                mention
              </span>
            </div>

            <ClerkUserButton />
          </div>

          {/* ── Main content ── */}
          <div className="p-4 lg:p-6">

            {/* ── Desktop top bar ── */}
            <div className="hidden lg:flex mb-6 items-start justify-between gap-6">
              <div>
                <p
                  className="text-xs uppercase tracking-[0.3em]"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  Welcome to Unmention
                </p>
                <h1
                  className="mt-2 text-4xl font-semibold leading-tight"
                  style={{ fontFamily: "var(--font-serif)", color: "var(--foreground)" }}
                >
                  Let&apos;s turn knowledge into{" "}
                  <br />
                  real-life change.
                </h1>
                <p className="mt-3 text-sm" style={{ color: "var(--foreground-muted)" }}>
                  You&apos;re here to learn with purpose. Let&apos;s begin.
                </p>
              </div>
              <div className="flex flex-shrink-0 items-center gap-2 pt-1">
                <ClerkUserButton />
              </div>
            </div>

            {/* ── Mobile headline ── */}
            <div className="lg:hidden mb-5">
              <p
                className="text-xs uppercase tracking-[0.3em]"
                style={{ color: "var(--foreground-muted)" }}
              >
                Welcome to Unmention
              </p>
              <h1
                className="mt-2 text-3xl font-semibold leading-tight"
                style={{ fontFamily: "var(--font-serif)", color: "var(--foreground)" }}
              >
                Let&apos;s turn knowledge into{" "}
                <span style={{ color: "var(--gold)" }}>real-life change.</span>
              </h1>
              <p className="mt-2 text-sm" style={{ color: "var(--foreground-muted)" }}>
                You&apos;re here to learn with purpose. Let&apos;s begin.
              </p>
            </div>

            {/* ── Hero card ── */}
            <div
              className="mb-6 rounded-3xl p-5 lg:p-8"
              style={{ backgroundColor: "var(--ink)" }}
            >
              <div className="flex flex-col gap-5 lg:gap-6">
                <div>
                  <p
                    className="text-xs uppercase tracking-[0.3em]"
                    style={{ color: "var(--gold)" }}
                  >
                    Start your first book
                  </p>
                  <div className="mt-4 flex items-start gap-4 lg:gap-6">
                    <div className="relative h-[120px] w-[86px] lg:h-[140px] lg:w-[100px] flex-shrink-0 overflow-hidden rounded-lg shadow-md">
                      <Image
                        src={featured.coverImage}
                        alt={featured.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h2
                        className="text-2xl lg:text-3xl font-semibold leading-tight"
                        style={{ fontFamily: "var(--font-serif)", color: "var(--paper)"}}
                      >
                        {featured.title}
                      </h2>
                      <p className="mt-2 text-sm" style={{ color: "var(--paper-secondary)" }}>
                        {featured.author}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature pills */}
                <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:gap-4 hidden md:block ">
                  {[
                    { icon: "📖", title: "7-day learning journey", desc: "One day, one law. Focused and actionable." },
                    { icon: "✏️", title: "Reflect & apply", desc: "Answer guided questions and create action plans." },
                    { icon: "✦", title: "AI coaching", desc: "Dive deeper, get clarity, and apply it your way." },
                  ].map(({ icon, title, desc }) => (
                    <div
                      key={title}
                      className="flex items-start gap-3 rounded-2xl p-3 lg:p-4 lg:min-w-[160px] lg:flex-1"
                      style={{ backgroundColor: "oklch(0.18 0 0)" }}
                    >
                      <div
                        className="mt-0.5 grid h-8 w-8 flex-shrink-0 place-items-center rounded-full text-sm"
                        style={{ backgroundColor: "oklch(0.22 0 0)" }}
                      >
                        {icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "var(--paper)" }}>
                          {title}
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed" style={{ color: "var(--paper-secondary)" }}>
                          {desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-4">
                  <Link
                    href={`/book/${featured.slug}`}
                    className="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "var(--gold)", color: "var(--ink)" }}
                  >
                    Start Day 1
                  </Link>
                  <p className="text-xs" style={{ color: "var(--paper-secondary)" }}>
                    🕐 Just 10–15 minutes a day
                  </p>
                </div>
              </div>
            </div>

            {/* ── Library section ── */}
            <div>
              <div className="mb-4 lg:mb-5 flex items-end justify-between">
                <div>
                  <p
                    className="text-xs uppercase tracking-[0.28em]"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    Your Library
                  </p>
                  <h2
                    className="mt-1 text-2xl font-semibold"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Start reading
                  </h2>
                </div>
                <Link
                  href="/library"
                  className="text-sm font-medium hover:underline"
                  style={{ color: "var(--gold)" }}
                >
                  View all →
                </Link>
              </div>

              <div className="flex flex-col gap-3 lg:grid lg:gap-5 lg:grid-cols-3">
                {books.map((book: Book) => {
                  const progress = progressBySlug[book.slug] ?? 0;
                  return (
                    <div
                      key={book.slug}
                      className="rounded-2xl lg:rounded-3xl p-4 lg:p-5 lg:flex lg:flex-col lg:gap-4"
                      style={{
                        backgroundColor: "var(--paper)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <div className="flex gap-4 items-center lg:items-start">
                        <div className="relative h-[72px] w-[50px] lg:h-[108px] lg:w-[76px] flex-shrink-0 overflow-hidden rounded-md shadow-sm">
                          <Image
                            src={book.coverImage}
                            alt={book.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className="font-semibold text-sm leading-snug"
                            style={{ color: "var(--foreground)" }}
                          >
                            {book.title}
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: "var(--foreground-muted)" }}>
                            {book.author}
                          </p>
                          <div className="mt-2 flex items-center justify-between lg:hidden">
                            <div
  className="flex items-center gap-1.5 text-xs"
  style={{ color: "var(--foreground-muted)" }}
>
  {progressBySlug[book.slug] > 0 ? (
    <>
      <span>📖</span>
      <span>Day {Math.ceil((progressBySlug[book.slug] / 100) * 7)} of 7</span>
    </>
  ) : (
    <>
      <span>🔒</span>
      <span>Not started</span>
    </>
  )}
</div>
                            <span className="text-xs font-medium" style={{ color: "var(--foreground-muted)" }}>
                              {progress}%
                            </span>
                          </div>
                          <div className="mt-2 lg:hidden">
                            <ProgressBar value={progress} />
                          </div>
                        </div>
                        <div
                          className="hidden lg:block text-right text-xs font-medium flex-shrink-0"
                          style={{ color: "var(--foreground-muted)" }}
                        >
                          {progress}%
                        </div>
                      </div>

                      <div
                        className="hidden lg:block rounded-2xl p-4 space-y-2"
                        style={{ backgroundColor: "var(--paper-secondary)" }}
                      >
                        <ProgressBar value={progress} />
                        <div
  className="flex items-center gap-1.5 text-xs"
  style={{ color: "var(--foreground-muted)" }}
>
  {progressBySlug[book.slug] > 0 ? (
    <>
      <span>📖</span>
      <span>Day {Math.ceil((progressBySlug[book.slug] / 100) * 7)} of 7</span>
    </>
  ) : (
    <>
      <span>🔒</span>
      <span>Not started</span>
    </>
  )}
</div>
                      </div>

                      <Link
                        href={`/book/${book.slug}`}
                        className="mt-3 lg:mt-0 block w-full rounded-full py-2.5 text-center text-sm font-medium transition-opacity hover:opacity-90"
                        style={{ backgroundColor: "var(--gold)", color: "var(--background)" }}
                      >
                        {progressBySlug[book.slug] > 0 ? "Continue Reading" : "Start Day 1"}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Bottom CTA ── */}
            <div
              className="mt-6 lg:mt-8 rounded-3xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 px-6 lg:px-8 py-6"
              style={{ backgroundColor: "var(--paper)" }}
            >
              <div>
                <h3
                  className="text-xl font-semibold"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Ready to build a better you?
                </h3>
                <p className="mt-1 text-sm" style={{ color: "var(--foreground-muted)" }}>
                  Pick a book, commit to 7 days, and take action that lasts.
                </p>
              </div>
              <Link
                href="/library"
                className="flex-shrink-0 flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}
              >
                Explore Library →
              </Link>
            </div>

          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
