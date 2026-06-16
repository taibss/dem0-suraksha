import { useEffect, useState } from "react";
import logo from "@/assets/lawgichub-logo.png";

const ENTER_MS = 400;
const VISIBLE_MS = 500;
const EXIT_MS = 400;

export function SplashScreen() {
  const [phase, setPhase] = useState<"enter" | "visible" | "exit" | "done">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("visible"), ENTER_MS);
    const t2 = setTimeout(() => setPhase("exit"), ENTER_MS + VISIBLE_MS);
    const t3 = setTimeout(() => setPhase("done"), ENTER_MS + VISIBLE_MS + EXIT_MS);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === "done") return null;

  const exitActive = phase === "exit";
  const imgStyle: React.CSSProperties = exitActive
    ? {
        opacity: 0,
        transform: "scale(0.85)",
        transition: `opacity ${EXIT_MS}ms ease, transform ${EXIT_MS}ms ease`,
      }
    : {};

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <img
        src={logo}
        alt=""
        className={`max-w-[80vw] max-h-[80vh] w-auto h-auto object-contain select-none mix-blend-multiply ${
          exitActive ? "" : "splash-enter"
        }`}
        style={imgStyle}
      />
    </div>
  );
}
