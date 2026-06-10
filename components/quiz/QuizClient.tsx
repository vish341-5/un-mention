"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Quiz, QuizAnswer } from "@/types/quiz";

type Screen = "quiz" | "loading" | "result";

export default function QuizClient({ quiz }: { quiz: Quiz }) {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [customText, setCustomText] = useState("");
  const [screen, setScreen] = useState<Screen>("quiz");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const question = quiz.questions[currentQ];
  const isLast = currentQ === quiz.questions.length - 1;
  const progress = ((currentQ) / quiz.questions.length) * 100;

  function handleSelect(option: string) {
    setSelected(option);
    if (option !== "Other") setCustomText("");
  }

  async function handleNext() {
    if (!selected) return;

    const answer: QuizAnswer = {
      questionId: question.id,
      question: question.question,
      selected,
      custom: selected === "Other" ? customText : undefined,
    };

    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);
    setSelected(null);
    setCustomText("");

    if (!isLast) {
      setCurrentQ((q) => q + 1);
      return;
    }

    // Last question — call Groq
    setScreen("loading");

    const answersText = updatedAnswers
      .map((a, i) => `Q${i + 1}: ${a.question}\nA: ${a.selected === "Other" ? a.custom : a.selected}`)
      .join("\n\n");

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            { role: "system", content: quiz.systemPrompt },
            {
              role: "user",
              content: `Here are my answers to the quiz "${quiz.title}":\n\n${answersText}`,
            },
          ],
          max_tokens: 400,
          temperature: 0.8,
        }),
      });

      const data = await res.json();
      const text = data.choices?.[0]?.message?.content ?? "";
      setResult(text);
      setScreen("result");
    } catch (e) {
      setError("Something went wrong. Please try again.");
      setScreen("result");
    }
  }

  // ── Loading screen ──
  if (screen === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: "var(--background-secondary)" }}>
        <div className="flex flex-col items-center gap-4">
          <div
            className="h-10 w-10 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "var(--gold)", borderTopColor: "transparent" }}
          />
          <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
            Analysing your answers...
          </p>
        </div>
      </div>
    );
  }

  // ── Result screen ──
  if (screen === "result") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16" style={{ backgroundColor: "var(--background-secondary)" }}>
        <div
          className="w-full max-w-lg rounded-3xl p-6 lg:p-8 flex flex-col gap-6"
          style={{ backgroundColor: "var(--paper)", border: "1px solid var(--border)" }}
        >
          {error ? (
            <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>{error}</p>
          ) : (
            <>
              <div>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--gold)", fontFamily: "monospace" }}>
                  Your Result
                </p>
                <p
                  className="text-sm leading-relaxed whitespace-pre-wrap"
                  style={{ color: "var(--foreground)" }}
                >
                  {result}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/library"
                  className="block w-full rounded-full py-3 text-center text-sm font-medium transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "var(--gold)", color: "var(--ink)" }}
                >
                  Start reading on Unmention →
                </Link>
                <button
                  onClick={() => {
                    setScreen("quiz");
                    setCurrentQ(0);
                    setAnswers([]);
                    setSelected(null);
                    setCustomText("");
                    setResult("");
                  }}
                  className="block w-full rounded-full py-3 text-center text-sm font-medium transition-opacity hover:opacity-80"
                  style={{ backgroundColor: "var(--background)", color: "var(--foreground-muted)", border: "1px solid var(--border)" }}
                >
                  Retake quiz
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // ── Quiz screen ──
  return (
    <div className="min-h-screen flex flex-col px-6 py-10 lg:py-16" style={{ backgroundColor: "var(--background-secondary)" }}>
      <div className="w-full max-w-lg mx-auto flex flex-col gap-8">

        {/* Back + progress */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => currentQ === 0 ? router.back() : (setCurrentQ((q) => q - 1), setSelected(null))}
            className="text-xs self-start"
            style={{ color: "var(--foreground-muted)" }}
          >
            ← Back
          </button>
          <div>
            <div className="flex justify-between text-xs mb-2" style={{ color: "var(--foreground-muted)" }}>
              <span>{quiz.title}</span>
              <span>{currentQ + 1} / {quiz.questions.length}</span>
            </div>
            <div className="h-1 w-full rounded-full" style={{ backgroundColor: "var(--border)" }}>
              <div
                className="h-1 rounded-full transition-all"
                style={{ width: `${progress}%`, backgroundColor: "var(--gold)" }}
              />
            </div>
          </div>
        </div>

        {/* Question */}
        <h2
          className="text-2xl font-semibold leading-snug"
          style={{ fontFamily: "var(--font-serif)", color: "var(--foreground)" }}
        >
          {question.question}
        </h2>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className="w-full text-left px-5 py-4 rounded-2xl text-sm font-medium transition-all"
              style={{
                backgroundColor: selected === option ? "var(--ink)" : "var(--paper)",
                border: `1px solid ${selected === option ? "var(--gold)" : "var(--border)"}`,
                color: selected === option ? "var(--paper)" : "var(--foreground)",
              }}
            >
              {option}
            </button>
          ))}

          {/* Other option */}
          <button
            onClick={() => handleSelect("Other")}
            className="w-full text-left px-5 py-4 rounded-2xl text-sm font-medium transition-all"
            style={{
              backgroundColor: selected === "Other" ? "var(--ink)" : "var(--paper)",
              border: `1px solid ${selected === "Other" ? "var(--gold)" : "var(--border)"}`,
              color: selected === "Other" ? "var(--paper)" : "var(--foreground-muted)",
            }}
          >
            Other — write your own
          </button>

          {/* Custom text input */}
          {selected === "Other" && (
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Tell us in your own words..."
              rows={3}
              className="w-full px-5 py-4 rounded-2xl text-sm resize-none outline-none"
              style={{
                backgroundColor: "var(--paper)",
                border: "1px solid var(--gold)",
                color: "var(--foreground)",
              }}
            />
          )}
        </div>

        {/* Next / Submit */}
        <button
          onClick={handleNext}
          disabled={!selected || (selected === "Other" && !customText.trim())}
          className="w-full rounded-full py-3 text-sm font-medium transition-opacity"
          style={{
            backgroundColor: "var(--gold)",
            color: "var(--ink)",
            opacity: (!selected || (selected === "Other" && !customText.trim())) ? 0.4 : 1,
            cursor: (!selected || (selected === "Other" && !customText.trim())) ? "not-allowed" : "pointer",
          }}
        >
          {isLast ? "See my result →" : "Next →"}
        </button>

      </div>
    </div>
  );
}
