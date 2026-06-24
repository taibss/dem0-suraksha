"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import dynamic from "next/dynamic";
import { FadeUp } from "@/components/fade-up";

const MumbaiMap = dynamic(() => import("@/components/mumbai-map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-muted text-muted-foreground text-sm rounded-2xl">
      Loading map...
    </div>
  ),
});

export default function Scams() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="bg-[#D97706] text-white">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <span className="eyebrow text-white/70">● Mumbai Watch</span>
          <h1 className="mt-3 font-display text-[clamp(2rem,6vw,3.5rem)] font-extrabold leading-[1] tracking-tight">
            Where Mumbai is<br />getting hit.
          </h1>
          <p className="mt-4 max-w-xl text-white/80">
            A live-style view of scam reports across the city.
          </p>
        </div>
      </section>
      <section style={{ backgroundColor: "#f0f0f0ff" }}>
        <div className="mx-auto max-w-6xl px-5 py-12">
          <FadeUp delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-4 items-start">
              <div className="rounded-2xl overflow-hidden border border-border bg-background" style={{ height: "460px" }}>
                <MumbaiMap />
              </div>
              <div className="rounded-2xl border border-border bg-background overflow-hidden">
                {[
                  { rank: "01", area: "Andheri & Jogeshwari", type: "UPI fraud · fake job rackets", bar: 100, severity: "high", zone: "Z1", zoneColor: "#DC2626" },
                  { rank: "02", area: "Borivali – Kandivali", type: "Digital arrest calls", bar: 85, severity: "high", zone: "Z1", zoneColor: "#DC2626" },
                  { rank: "03", area: "Thane", type: "Investment / trading traps", bar: 72, severity: "rising", zone: "Z3", zoneColor: "#D97706" },
                  { rank: "04", area: "Bandra – Khar", type: "OTP & card phishing", bar: 62, severity: "rising", zone: "Z2", zoneColor: "#D97706" },
                  { rank: "05", area: "Powai – Vikhroli", type: "Work-from-home task scams", bar: 50, severity: "watch", zone: "Z3", zoneColor: "#D97706" },
                  { rank: "06", area: "Dadar – Sion", type: "Loan app harassment", bar: 42, severity: "watch", zone: "Z2", zoneColor: "#D97706" },
                  { rank: "07", area: "Navi Mumbai (Vashi)", type: "Online shopping fraud", bar: 32, severity: "watch", zone: "Z4", zoneColor: "#64748B" },
                  { rank: "08", area: "Fort – Colaba", type: "Courier / customs scams", bar: 22, severity: "watch", zone: "Z4", zoneColor: "#64748B" },
                ].map((item, idx) => (
                  <div
                    key={item.rank}
                    className={`flex items-center gap-4 px-5 py-3.5 border-b border-border last:border-b-0 ${idx === 0 ? "bg-red-50" : "bg-background"}`}
                  >
                    <span className="text-xs font-mono text-muted-foreground w-5 shrink-0">{item.rank}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">
                        <span
                          className="mr-2 inline-flex items-center shrink-0 rounded text-[9px] font-mono font-bold px-1.5 py-0.5 text-white"
                          style={{ backgroundColor: item.zoneColor }}
                        >
                          {item.zone}
                        </span>
                        {item.area}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{item.type}</p>
                    </div>
                    <div className="w-16 shrink-0">
                      <div className="h-1.5 rounded-full bg-border overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${item.bar}%`,
                            backgroundColor:
                              item.severity === "high" ? "#DC2626" :
                              item.severity === "rising" ? "#D97706" : "#64748B",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-3 flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
              <span><span className="text-[#DC2626]">●</span> High reports</span>
              <span><span className="text-[#D97706]">●</span> Rising</span>
              <span><span className="text-[#64748B]">●</span> Watch</span>
              <span className="text-border">|</span>
              <span><span className="text-[#DC2626]">▪</span> Zone 1: North</span>
              <span><span className="text-[#D97706]">▪</span> Zone 2: Central</span>
              <span><span className="text-[#D97706]">▪</span> Zone 3: East</span>
              <span><span className="text-[#64748B]">▪</span> Zone 4: South</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.35}>
            <p className="mt-2 text-[11px] text-muted-foreground italic">
              Illustrative intensity based on publicly reported fraud patterns — not an official police dataset.
            </p>
          </FadeUp>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
