"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background-secondary)] px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--background)] p-8 shadow-xl">
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" appearance={{
    elements: {
      footer: "hidden",
    },
  }} />
      </div>
    </div>
  );
}
