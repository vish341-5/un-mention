"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Lightbulb } from "lucide-react";
import { ClerkUserButton } from "@/components/auth/clerk-user-button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/library", label: "Library", Icon: BookOpen },
  { href: "/history", label: "History", Icon: Lightbulb },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      className="border-none"
      style={{ backgroundColor: "var(--background-secondary)" }}
    >
      {/* Header — Logo */}
      <SidebarHeader className="px-6 pt-8 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-0">
            <span
              className="text-xl font-bold"
              style={{ fontFamily: "var(--font-serif)", color: "var(--foreground)" }}
            >
              Un
            </span>
            <span className="text-xl font-bold" style={{ color: "var(--gold)" }}>mention</span>
          </div>
          <ClerkUserButton />
        </div>
      </SidebarHeader>

      {/* Nav */}
      <SidebarContent className="px-4">
        <SidebarMenu className="space-y-1">
          {navItems.map(({ href, label, Icon }) => {
            const active = pathname === href;
            return (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition-colors h-auto
                    ${active
                      ? "bg-[var(--background)] text-[var(--foreground)]"
                      : "text-[var(--foreground-muted)] hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                    }`}
                >
                  <Link href={href} className="flex items-center gap-3">
                    <Icon size={16} />
                    {label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer — promo card */}
      <SidebarFooter className="px-4 pb-8">
        <div
          className="rounded-2xl p-5"
          style={{ backgroundColor: "var(--background)" }}
        >
          <p
            className="text-base font-semibold leading-snug"
            style={{ fontFamily: "var(--font-serif)", color: "var(--foreground)" }}
          >
            Read less.{" "}
            <span style={{ color: "var(--gold)" }}>Apply more.</span>
          </p>
          <p
            className="mt-2 text-xs leading-relaxed"
            style={{ color: "var(--foreground-muted)" }}
          >
            Turn every book into real-life change.
          </p>
          <div className="mt-4 flex justify-center text-3xl">📖</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}