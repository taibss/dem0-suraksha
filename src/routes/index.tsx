import { createFileRoute, Link } from "@tanstack/react-router";
import { TREE } from "@/lib/tree";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowRight, Phone, ChevronDown, ChevronUp, X, MessageCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { chatFn } from "./api/chat"

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Suraksha — Mumbai's Scam Defence" },
      { name: "description", content: "Got scammed? We fix that. Fast." },
    ],
  }),
  component: Home,
});

const PULSE = [
  "Senior dodges ₹14L digital arrest call",
  "Fake SEBI WhatsApp groups busted — don't invest",
  "UPI collect fraud rising in Mumbai",
  "4 arrested in fake task job scam",
  "Loan app harassment crackdown underway",
];

const DOOR_STYLES = [
  { bg: "text-foreground border-2 border-border", style: { backgroundColor: "#15dbdbff" } },
  { bg: "bg-lime text-lime-foreground", style: {} },
  { bg: "bg-ink text-ink-foreground", style: {} },
  { bg: "bg-card text-foreground border-2 border-border", style: {} },
];

const RIGHTS = [
  {
    tag: "FIR",
    stat: "0",
    statLabel: "valid reasons to refuse",
    title: "No police station can refuse your complaint",
    body: "Under Section 154 CrPC, any police station must register your FIR. If they refuse, you can send it by post to the SP, file online on the state portal, or approach a Magistrate directly. Refusal is itself an offence.",
  },
  {
    tag: "MONEY",
    stat: "3",
    statLabel: "working days to get zero liability",
    title: "Banks must cap your liability if you report fast",
    body: "RBI's customer-protection rules give you zero liability for unauthorised electronic transactions caused by bank negligence or third-party fraud — if you report within 3 working days. Even up to 7 days, your liability is capped.",
  },
  {
    tag: "ARREST",
    stat: "∞",
    statLabel: "fake — digital arrest doesn't exist",
    title: "There is no such thing as a 'digital arrest'",
    body: "No law in India permits 'digital arrest'. Police, CBI, ED, or Narcotics cannot arrest you over a video call. If someone claims this, hang up immediately — it is always a scam.",
  },
  {
    tag: "EVIDENCE",
    stat: "100%",
    statLabel: "valid in Indian courts",
    title: "Screenshots and chats are valid legal evidence",
    body: "Under the IT Act and Indian Evidence Act, electronic records including WhatsApp chats, emails, screenshots, and call recordings are admissible as evidence in court.",
  },
  {
    tag: "CYBER",
    stat: "1930",
    statLabel: "national helpline, free 24/7",
    title: "You can report cybercrime anonymously",
    body: "cybercrime.gov.in allows you to report crimes without disclosing your identity. You can also call 1930, the national cyber financial fraud helpline, anytime.",
  },
];

const BOT_OPTIONS = [
  { label: "I've been scammed", to: "/help" },
  { label: "Today's scams", to: "/scams" },
  { label: "My rights", to: "/#rights" },
];

function RightsSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-border">
      {RIGHTS.map((r, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-start justify-between gap-4 py-5 text-left"
          >
            <div className="flex items-start gap-5">
              <div className="shrink-0 w-20">
                <p className="text-2xl font-extrabold font-display text-foreground leading-none">{r.stat}</p>
                <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{r.statLabel}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">{r.tag}</p>
                <p className="font-display text-base font-bold text-foreground leading-snug">{r.title}</p>
              </div>
            </div>
            <div className={`shrink-0 size-7 rounded-full border border-border flex items-center justify-center transition-colors mt-0.5 ${open === i ? "bg-foreground" : ""}`}>
              {open === i
                ? <ChevronUp className="size-3.5 text-background" />
                : <ChevronDown className="size-3.5 text-muted-foreground" />}
            </div>
          </button>
          {open === i && (
            <p
              className="pb-5 text-sm leading-relaxed text-muted-foreground pl-[104px]">{r.body}</p>
          )}
        </div>
      ))}
    </div>
  );
}



function RightsSectionOrange() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-[#1a4a2e]/30">
      {RIGHTS.map((r, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-start justify-between gap-4 py-5 text-left"
          >
            <div className="flex items-start gap-5">
              <div className="shrink-0 w-20">
                <p className="text-2xl font-extrabold font-display text-[#1a4a2e] leading-none">{r.stat}</p>
                <p className="text-[10px] text-[#f5f0e8]/70 leading-tight mt-0.5">{r.statLabel}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a4a2e] mb-1">{r.tag}</p>
                <p className="font-display text-base font-bold text-[#f5f0e8] leading-snug">{r.title}</p>
              </div>
            </div>
            <div className={`shrink-0 size-7 rounded-full border border-[#1a4a2e]/40 flex items-center justify-center transition-colors mt-0.5 ${open === i ? "bg-[#1a4a2e] border-[#1a4a2e]" : ""}`}>
              {open === i
                ? <ChevronUp className="size-3.5 text-[#f5f0e8]" />
                : <ChevronDown className="size-3.5 text-[#1a4a2e]" />}
            </div>
          </button>
          {open === i && (
            <p className="pb-5 text-sm leading-relaxed text-[#f5f0e8]/80 pl-[104px]">{r.body}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function RightsSectionDark() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-white/10">
      {RIGHTS.map((r, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-start justify-between gap-4 py-5 text-left"
          >
            <div className="flex items-start gap-5">
              <div className="shrink-0 w-20">
                <p className="text-2xl font-extrabold font-display text-lime leading-none">{r.stat}</p>
                <p className="text-[10px] text-white/40 leading-tight mt-0.5">{r.statLabel}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-lime/70 mb-1">{r.tag}</p>
                <p className="font-display text-base font-bold text-white leading-snug">{r.title}</p>
              </div>
            </div>
            <div className={`shrink-0 size-7 rounded-full border border-white/20 flex items-center justify-center transition-colors mt-0.5 ${open === i ? "bg-lime border-lime" : ""}`}>
              {open === i
                ? <ChevronUp className="size-3.5 text-lime-foreground" />
                : <ChevronDown className="size-3.5 text-white/40" />}
            </div>
          </button>
          {open === i && (
            <p className="pb-5 text-sm leading-relaxed text-white/60 pl-[104px]">{r.body}</p>
          )}
        </div>
      ))}
    </div>
  );
}
function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      parts: [
        {
          text: "Hey! I'm Suraksha 👋 Got scammed or something feels off? I'm here to help.",
        },
      ],
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    if (!input.trim() || loading) return;

    const userMsg = {
      role: "user",
      parts: [{ text: input }],
    };

    const updated = [...messages, userMsg];

    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const data = await chatFn({
        data: {
          messages: updated,
        },
      });

      setMessages([
        ...updated,
        {
          role: "model",
          parts: [{ text: data.reply }],
        },
      ]);
    } catch (err) {
      console.error("CHAT ERROR: ", err)
      setMessages([
        ...updated,
        {
          role: "model",
          parts: [
            {
              text: "Something went wrong. Please call 1930 directly.",
            },
          ],
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-ink border-2 border-lime shadow-xl transition-transform hover:scale-105"
        aria-label="Ask Suraksha"
      >
        {open ? (
          <X className="size-5 text-lime" />
        ) : (
          <MessageCircle className="size-6 text-lime" />
        )}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 rounded-2xl border-2 border-foreground bg-background shadow-[4px_4px_0_0_var(--foreground)] flex flex-col overflow-hidden"
          style={{ height: "420px" }}
        >
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border shrink-0">
            <span className="size-2 rounded-full bg-lime animate-pulse" />
            <span className="text-sm font-bold">
              Suraksha · your safety guide
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user"
                  ? "justify-end"
                  : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${m.role === "user"
                    ? "bg-foreground text-background"
                    : "bg-muted text-foreground"
                    }`}
                >
                  {m.parts[0].text}
                </div>
              </div>
            ))}

            {messages.length === 1 && !loading && (
              <div className="flex flex-col gap-2 px-1">
                {BOT_OPTIONS.map((opt) => (
                  <Link
                    key={opt.to}
                    to={opt.to}
                    className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors text-center"
                  >
                    {opt.label}
                  </Link>
                ))}
              </div>
            )}

            {loading && (
              <div className="text-sm text-muted-foreground">
                Suraksha is thinking...
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border px-3 py-2 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && send()
              }
              placeholder="What happened?"
              className="flex-1 rounded-full border border-border bg-muted px-4 py-2 text-sm"
            />

            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="rounded-full bg-foreground px-4 py-2 text-sm font-bold text-background"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Pulse strip */}
      <div className="bg-ink text-ink-foreground">
        <div className="mx-auto flex max-w-6xl items-center gap-3 overflow-hidden px-5 py-2.5">
          <span className="eyebrow shrink-0 text-lime">● Live</span>
          <div className="relative flex-1 overflow-hidden">
            <div className="marquee-track text-sm">
              {[...PULSE, ...PULSE].map((t, i) => (
                <span key={i} className="opacity-90">{t} <span className="text-lime/70">·</span></span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5 py-8 md:py-12">
          <span className="inline-flex items-center rounded-full bg-lime px-4 py-1.5 text-xs font-bold tracking-widest text-lime-foreground">
            MUMBAI'S SCAM DEFENCE
          </span>
          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[0.95] tracking-tight">
            Got scammed?<br />We fix that.
          </h1>
          <p className="mt-4 max-w-md text-base text-primary-foreground/85">
            Lawyer on call. Complaint drafted. No cap, no wait.
          </p>
          <div className="mt-6">
            <Link
              to="/scams"
              className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-foreground bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-[5px_5px_0_0_var(--foreground)] transition-all hover:-translate-y-0.5"
            >
              Show me the scams
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
      {/* Four doors */}
      <section
        style={{
          backgroundColor: "#f0f0f0ff",
        }}
      >
        <div className="mx-auto max-w-6xl px-5 py-8">
          <div className="mb-4">
            <p className="font-display text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight uppercase">
              WHAT ARE WE DEALING WITH?
            </p>
            <h4>
              <p className="mt-1 text-sm text-muted-foreground">give us the lore</p></h4>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {TREE.doors.map((d, i) => (
              <Link
                key={d.id}
                to="/help/$door"
                params={{ door: d.id }}
                style={DOOR_STYLES[i % 4].style}
                className={`group relative rounded-2xl p-6 transition-transform hover:-translate-y-1 ${DOOR_STYLES[i % 4].bg}`}
              >
                <div className="text-3xl">{d.emoji}</div>
                <div className="mt-3 font-display text-xl font-extrabold">{d.title}</div>
                <p className="mt-1 text-sm opacity-75">{d.subtitle}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                  Get help <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Emergency Alert Card */}
      <section
        style={{
          backgroundColor: "#f0f0f0ff",
        }}
      >
        <div className="mx-auto max-w-6xl px-5 py-4">
          <div className="rounded-2xl bg-[#B91C1C] px-5 py-4 shadow-[5px_5px_0_0_rgba(0,0,0,0.15)]">
            <div className="flex items-center gap-2 mb-2">
              <span className="size-2 rounded-full bg-[#FFD6D6] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                Emergency Alert
              </span>
            </div>

            <h2 className="font-display text-xl font-extrabold text-white leading-tight">
              Scammed in the last 24 hours?
            </h2>

            <p className="mt-1 text-sm text-white/85 max-w-lg">
              Call <span className="font-bold text-[#FFD6D6]">1930</span> immediately —
              banks can still freeze funds if you act fast.
            </p>

            <div className="mt-3 grid grid-cols-3 gap-3 border-t border-white/20 pt-3 mb-3">
              {[
                ["24 hrs", "golden window"],
                ["₹3.1Cr", "frozen this week"],
                ["12k+", "citizens helped"],
              ].map(([stat, label]) => (
                <div key={label}>
                  <p className="text-lg font-extrabold text-white font-display">
                    {stat}
                  </p>
                  <p className="text-[10px] text-white/60">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href="tel:1930"
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#B91C1C] transition-all hover:-translate-y-0.5"
              >
                <Phone className="size-3.5" />
                Call 1930 now
              </a>

              <Link
                to="/help/$door"
                params={{ door: "money" }}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/70 px-4 py-2 text-xs font-semibold text-white hover:bg-white hover:text-[#B91C1C] transition-colors"
              >
                Walk me through it
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* My Rights */}
      <section
        style={{
          backgroundColor: "#f0f0f0ff",
        }}
      >
        <div className="mx-auto max-w-6xl px-5 py-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Know your rights</p>
          <h2 className="font-display text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold leading-tight mb-8">
            Things every Indian should know.
          </h2>
          {/* Single card */}
          <div className="relative overflow-hidden rounded-2xl bg-lime flex flex-col md:flex-row">
            {/* Barcode left */}
            <div className="hidden md:flex flex-col justify-center px-5 py-8 gap-1 shrink-0">
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} style={{ height: `${[6, 4, 8, 3, 7, 5, 9, 4, 6, 8, 3, 7, 5, 4, 9, 6, 4, 7][i]}px` }} className="w-5 bg-[#1a4a2e] rounded-sm opacity-80" />
              ))}
            </div>
            {/* Main content */}
            <div className="flex-1 px-6 py-8">
              <div className="flex items-center gap-3 mb-1">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1a4a2e" strokeWidth="1.5" className="shrink-0">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <div>
                  <p className="font-display text-xl font-extrabold text-[#1a4a2e] leading-tight">Know Your Rights.</p>
                  <p className="text-sm font-semibold text-[#1a4a2e]/70">Globally protected. Locally enforced.</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  "No police station can legally refuse to register your FIR",
                  "Banks must give zero liability if fraud is reported within 3 days",
                  "Digital arrest does not exist — hang up immediately",
                  "Screenshots and WhatsApp chats are valid evidence in court",
                  "You can report cybercrime anonymously via 1930 or cybercrime.gov.in",
                  "First legal consultation is free via District Legal Aid",
                ].map((right) => (
                  <div key={right} className="flex items-start gap-3">
                    <span className="mt-0.5 size-5 rounded-full bg-[#1a4a2e] flex items-center justify-center shrink-0">
                      <svg width="10" height="10" viewBox="0 0 12 10" fill="none">
                        <path d="M1 5l3.5 3.5L11 1" stroke="#bef264" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-sm font-medium text-[#1a4a2e]">{right}</span>
                  </div>
                ))}
              </div>
              <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1a4a2e] px-5 py-2.5 text-sm font-bold text-lime">
                Learn more about your rights →
              </button>
            </div>
            {/* Globe watermark */}
            <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
              <svg width="220" height="220" viewBox="0 0 24 24" fill="none" stroke="#1a4a2e" strokeWidth="0.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M12 2v20" />
                <path d="M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
              </svg>
            </div>
          </div>
        </div>
      </section>
      {/* Check before you trust */}
      <section
        style={{
          backgroundColor: "#f0f0f0ff",
        }}
      >
        <div className="mx-auto max-w-6xl px-5 py-10">
          <p className="text-sm font-bold">Check before you trust</p>
          <p className="mt-1 text-sm text-muted-foreground">Has this number, UPI ID, or link been reported?</p>
          <div className="mt-4 flex gap-2">
            <input
              placeholder="Phone number, UPI ID, or website"
              className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
            />
            <button className="rounded-xl border-2 border-foreground bg-foreground px-5 py-3 text-sm font-bold text-background">
              Check
            </button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">v1 — community reported data</p>
        </div>
      </section>

      <SiteFooter />
      <Chatbot />
    </div>
  );
}