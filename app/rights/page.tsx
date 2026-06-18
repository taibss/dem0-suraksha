import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Know Your Rights — Suraksha",
  description: "Laws that protect you — plain language, no jargon.",
};

const CYBER_CRIME_LAWS = [
  {
    section: "Section 66C",
    act: "IT Act",
    title: "Identity Theft",
    description: "Punishment for cheating by personating using computer resource",
    penalty: "Up to 3 years imprisonment and fine up to ₹1 lakh",
  },
  {
    section: "Section 66D",
    act: "IT Act",
    title: "Cheating by Impersonation",
    description: "Punishment for cheating by impersonating using computer resource",
    penalty: "Up to 3 years imprisonment and fine up to ₹1 lakh",
  },
  {
    section: "Section 66E",
    act: "IT Act",
    title: "Violation of Privacy",
    description: "Punishment for capturing, publishing or transmitting private images without consent",
    penalty: "Up to 3 years imprisonment and fine up to ₹2 lakh",
  },
  {
    section: "Section 67",
    act: "IT Act",
    title: "Publishing Obscene Material",
    description: "Punishment for publishing or transmitting obscene material in electronic form",
    penalty: "Up to 3 years imprisonment and fine up to ₹5 lakh",
  },
  {
    section: "Section 67A",
    act: "IT Act",
    title: "Publishing Sexually Explicit Material",
    description: "Punishment for publishing or transmitting sexually explicit material in electronic form",
    penalty: "Up to 5 years imprisonment and fine up to ₹10 lakh",
  },
];

const VICTIM_RIGHTS = [
  {
    section: "Section 154 CrPC / BNSS",
    act: "",
    title: "FIR Cannot Be Refused",
    description: "Any police station must register your FIR. Refusal is illegal and punishable.",
    right: "Mandatory FIR registration",
  },
  {
    section: "RBI Guidelines",
    act: "",
    title: "Zero Liability on Fraud",
    description: "Report within 3 days and your bank must cover 100% of unauthorised transactions",
    right: "100% bank coverage",
  },
  {
    section: "Section 156 CrPC",
    act: "",
    title: "Magistrate Can Order FIR",
    description: "If police refuse, approach a Magistrate who can order them to register it",
    right: "Legal remedy available",
  },
  {
    section: "IT Act Section 43",
    act: "",
    title: "Compensation for Data Theft",
    description: "You can claim compensation if your data was accessed without permission",
    right: "Compensation claimable",
  },
];

export default function RightsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <span className="eyebrow text-lime">● Legal Framework</span>
          <h1 className="mt-3 font-display text-[clamp(2rem,6vw,3.5rem)] font-extrabold leading-[1] tracking-tight">
            Know Your Rights
          </h1>
          <p className="mt-4 max-w-xl text-ink-foreground/80">
            Laws that protect you — plain language, no jargon.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <h2 className="font-display text-2xl font-extrabold tracking-tight mb-6">
            Cyber Crime Laws
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CYBER_CRIME_LAWS.map((law) => (
              <div
                key={law.section}
                className="group rounded-2xl border-2 border-border bg-card p-6 shadow-[4px_4px_0_0_var(--foreground)] transition-transform hover:-translate-y-1"
              >
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                  {law.section} {law.act}
                </span>
                <h3 className="mt-3 font-display font-bold text-base leading-snug">
                  {law.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {law.description}
                </p>
                <div className="mt-4 inline-flex items-center rounded-full bg-lime px-3 py-1.5 text-xs font-bold text-lime-foreground">
                  {law.penalty}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <h2 className="font-display text-2xl font-extrabold tracking-tight mb-6">
            Your Rights as a Victim
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {VICTIM_RIGHTS.map((right) => (
              <div
                key={right.section}
                className="group rounded-2xl border-2 border-border bg-card p-6 shadow-[4px_4px_0_0_var(--foreground)] transition-transform hover:-translate-y-1"
              >
                <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-800">
                  {right.section}
                </span>
                <h3 className="mt-3 font-display font-bold text-base leading-snug">
                  {right.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {right.description}
                </p>
                <div className="mt-4 inline-flex items-center rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-800">
                  {right.right}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="rounded-2xl bg-primary p-6 text-white md:flex md:items-center md:justify-between md:gap-6">
            <div>
              <p className="font-display font-bold text-lg">Need help using these rights?</p>
              <p className="mt-1 text-sm text-white/80">Get your personal action plan — free, instant.</p>
            </div>
            <Link
              href="/help"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-primary transition-transform hover:-translate-y-0.5"
            >
              Get my action plan →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
