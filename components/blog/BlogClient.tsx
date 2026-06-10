"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X, Home as HomeIcon, BookOpen, Lightbulb, BookText } from "lucide-react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ClerkUserButton } from "@/components/auth/clerk-user-button";
import type { BlogPost } from "@/types/blog";

const NAV_ITEMS = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/library", label: "Library", Icon: BookOpen },
  { href: "/history", label: "History", Icon: Lightbulb },
  { href: "/blog", label: "Blog", Icon: BookText },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
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

  // Group by year
  const grouped = posts.reduce<Record<string, BlogPost[]>>((acc, post) => {
    const year = new Date(post.publishedAt).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {});
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <>
      {/* Mobile nav drawer */}
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
                <span className="text-xl font-bold" style={{ fontFamily: "var(--font-serif)", color: "var(--foreground)" }}>Un</span>
                <span className="text-xl font-bold" style={{ color: "var(--gold)" }}>mention</span>
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
        style={{ "--sidebar-width": "260px", backgroundColor: "var(--background-secondary)" } as React.CSSProperties}
      >
        {isDesktop && <AppSidebar />}

        <SidebarInset className="flex-1 overflow-auto" style={{ backgroundColor: "var(--background-secondary)" }}>

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
              <span className="text-xl font-bold" style={{ fontFamily: "var(--font-serif)", color: "var(--foreground)" }}>Un</span>
              <span className="text-xl font-bold" style={{ color: "var(--gold)" }}>mention</span>
            </div>
            <ClerkUserButton />
          </div>

          {/* ── Main content ── */}
          <div className="p-4 lg:p-6">

            {/* ── Desktop top bar ── */}
            <div className="hidden lg:flex mb-6 items-start justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--foreground-muted)" }}>
                  Unmention
                </p>
                <h1 className="mt-2 text-4xl font-semibold leading-tight" style={{ fontFamily: "var(--font-serif)", color: "var(--foreground)" }}>
                  The <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Blog</span>
                </h1>
                <p className="mt-3 text-sm" style={{ color: "var(--foreground-muted)" }}>
                  Book summaries that actually help you apply what you read.
                </p>
              </div>
              <div className="flex flex-shrink-0 items-center gap-2 pt-1">
                <ClerkUserButton />
              </div>
            </div>

            {/* ── Mobile headline ── */}
            <div className="lg:hidden mb-5">
              <h1 className="text-3xl font-semibold leading-tight" style={{ fontFamily: "var(--font-serif)", color: "var(--foreground)" }}>
                The <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Blog</span>
              </h1>
              <p className="mt-2 text-sm" style={{ color: "var(--foreground-muted)" }}>
                Book summaries that actually help you apply what you read.
              </p>
            </div>

            {/* ── Posts grouped by year ── */}
            {years.length === 0 ? (
              <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>No posts found.</p>
            ) : (
              years.map((year) => (
                <div key={year} className="mb-8">
                  {/* Year divider */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs" style={{ color: "var(--foreground-muted)", fontFamily: "monospace" }}>— {year} —</span>
                    <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
                  </div>

                  {/* Posts */}
                  <div className="flex flex-col">
                    {grouped[year].map((post, i) => (
                      <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                        <div
                          className="flex items-start gap-4 py-4 transition-opacity hover:opacity-80"
                          style={{
                            borderBottom: i < grouped[year].length - 1 ? "1px solid var(--border)" : "none",
                          }}
                        >
                          {/* Date */}
                          <span
                            className="text-xs pt-1 w-12 flex-shrink-0"
                            style={{ color: "var(--foreground-muted)", fontFamily: "monospace" }}
                          >
                            {formatDate(post.publishedAt)}
                          </span>

                          {/* Cover image */}
                          {post.coverImage && (
                            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl shadow-sm">
                              <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}

                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <p
                              className="text-xs uppercase tracking-widest mb-1"
                              style={{ color: "var(--gold)", fontFamily: "monospace" }}
                            >
                              {post.category} · {post.readTime}
                            </p>
                            <h2
                              className="text-base font-semibold leading-snug"
                              style={{ fontFamily: "var(--font-serif)", color: "var(--foreground)" }}
                            >
                              {post.title}
                            </h2>
                            <p className="mt-1 text-xs leading-relaxed line-clamp-2" style={{ color: "var(--foreground-muted)" }}>
                              {post.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}