"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

export function HelpfulWidget() {
  const [voted, setVoted] = useState<"up" | "down" | null>(null);

  if (voted) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-[4px_4px_0_0_var(--foreground)]">
        <p className="font-display font-bold text-lg">
          {voted === "up" ? "Glad it helped!" : "Sorry to hear that."}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {voted === "up"
            ? "We will keep making useful guides."
            : "Tell us what we can improve at hello@lawgichub.com"}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-[4px_4px_0_0_var(--foreground)]">
      <p className="font-display font-bold text-lg">Was this helpful?</p>
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          onClick={() => setVoted("up")}
          className="flex items-center gap-2 rounded-full border-2 border-border bg-card px-5 py-2.5 text-sm font-bold shadow-[3px_3px_0_0_var(--foreground)] transition-transform hover:-translate-y-0.5 hover:bg-muted"
        >
          <ThumbsUp className="size-4" /> Yes
        </button>
        <button
          onClick={() => setVoted("down")}
          className="flex items-center gap-2 rounded-full border-2 border-border bg-card px-5 py-2.5 text-sm font-bold shadow-[3px_3px_0_0_var(--foreground)] transition-transform hover:-translate-y-0.5 hover:bg-muted"
        >
          <ThumbsDown className="size-4" /> No
        </button>
      </div>
    </div>
  );
}
