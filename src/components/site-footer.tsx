import Link from "next/link";
import { FadeUp } from "./fade-up";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <FadeUp delay={0}>
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="flex items-center gap-1.5 text-2xl font-bold">
            Suraksha<span className="size-2 rounded-full bg-primary" />
          </div>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Plain language, real action. We turn scam panic into a clear plan.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mt-4">
            <Link href="/help" className="hover:underline">Get help</Link>
            <Link href="/scams" className="hover:underline">Scam radar</Link>
            <Link href="/how-it-works" className="hover:underline">How it works</Link>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground mt-4">
            <span>⚖️ Built with verified advocates</span>
            <span>🛡️ Backed by LawGicHub</span>
          </div>
          <p className="eyebrow mt-6 text-muted-foreground">© Suraksha · Mumbai · For information, not legal advice.</p>
        </div>
      </FadeUp>
    </footer>
  );
}
