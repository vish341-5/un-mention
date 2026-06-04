"use client";

import Link from "next/link";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { books } from "@/data/books/index";
import type { Book } from "@/types/book";

export default function BookIndexPage() {
  return (
    <SidebarProvider
      style={{ "--sidebar-width": "260px", backgroundColor: "var(--background-secondary)" } as React.CSSProperties}
    >
      <AppSidebar />
      <SidebarInset className="flex-1 overflow-auto" style={{ backgroundColor: "var(--background-secondary)" }}>
        <div className="p-5 lg:p-8 max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--foreground)" }}>
              Choose a book
            </h1>
            <p className="mt-2 text-sm" style={{ color: "var(--foreground-muted)" }}>
              Pick a book to continue your seven-day journey.
            </p>
          </div>

          <div className="grid gap-4">
            {books.map((book: Book) => (
              <div
                key={book.slug}
                className="rounded-3xl border border-var(--border) bg-var(--background) p-6"
                style={{ backgroundColor: "var(--background)" }}
              >
                <h2 className="text-xl font-semibold" style={{ color: "var(--foreground)" }}>
                  {book.title}
                </h2>
                <p className="mt-1 text-sm" style={{ color: "var(--foreground-muted)" }}>
                  {book.author}
                </p>
                <p className="mt-3 text-sm" style={{ color: "var(--foreground)" }}>
                  {book.description}
                </p>
                <Link
                  href={`/book/${book.slug}`}
                  className="inline-flex mt-4 rounded-full bg-var(--gold) px-5 py-2 text-sm font-medium text-var(--background) transition-opacity hover:opacity-90"
                >
                  Open book →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
