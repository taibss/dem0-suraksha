import { createServerFn } from "@tanstack/react-start";

const GROQ_MODEL = "openai/gpt-oss-120b";

export const chatFn = createServerFn({ method: "POST" })
    .handler(async ({ data }: any) => {
        const { messages } = data;

        const apiKey = import.meta.env.VITE_GROQ_API_KEY;

        const groqMessages = [
            {
                role: "system",
                content: `You are Suraksha, a navigation guide for the Suraksha website. First ask a short question to understand their situation (1 line max). Then guide them step by step using human-readable page names, not URLs.

Available pages on this site:
- Help (main triage hub with 4 doors: Money, Threats, Process, Other)
- Help > Money (for UPI, investment, job, loan, bank, shopping, relationship scams)
- Help > Threats (for digital arrest, sextortion, blackmail, harassment)
- Help > Process (for police, bank, or reporting process help)
- Help > Other (for work, home, family issues)
- Scam Radar (shows 8 trending scams)
- How It Works (explains spot-block-fix method)
- Know Your Rights (legal rights section)

How to respond:
1. First ask a short question to narrow down their situation
2. Then give navigation: "Go to -> Help -> Money -> pick your situation"

Keep VERY short — max 2 lines total. Plain text only, no markdown. Never give advice — always direct to a page on the site.`,
            },
            ...messages.map((m: any) => ({
                role: m.role === "model" ? "assistant" : m.role,
                content: m.parts?.[0]?.text ?? "",
            })),
        ];

        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: GROQ_MODEL,
                    messages: groqMessages,
                }),
            }
        );

        const result = await response.json();

        return {
            reply:
                result.choices?.[0]?.message?.content ??
                "Sorry, please call 1930 directly.",
        };
    });