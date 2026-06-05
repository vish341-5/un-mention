"use client";

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="grid min-h-dvh place-items-center bg-[var(--background-secondary)] px-4 py-10">
      <div className="w-full max-w-[560px] rounded-3xl border border-[var(--border)] bg-[var(--background)] p-4 shadow-xl sm:p-8">
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
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
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-[var(--foreground)] underline-offset-4 hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
