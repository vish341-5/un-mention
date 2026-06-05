"use client";

import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="grid min-h-dvh place-items-center bg-[var(--background-secondary)] px-4 py-10">
      <div className="w-full max-w-[560px] rounded-3xl border border-[var(--border)] bg-[var(--background)] p-4 shadow-xl sm:p-8">
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          appearance={{
            elements: {
              rootBox: "mx-auto w-full",
              cardBox: "mx-auto w-full max-w-full",
              card: "mx-auto w-full max-w-full",
              footer: "hidden",
            },
          }}
        />
        <p className="mt-6 text-center text-sm text-[var(--muted-foreground)]">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-[var(--foreground)] underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
