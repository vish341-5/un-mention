"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background-secondary)] px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--background)] p-8 shadow-xl">
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" appearance={{
    elements: {
      footer: "hidden",
    },
  }} />
      </div>
    </div>
  );
}
