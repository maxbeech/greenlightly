import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE.name}: ${SITE.tagline}`;

// Satori-safe: every element with >1 child sets display:flex; no exotic glyphs
// or external fonts. The mark is the signal motif drawn with plain divs.
export default function OG() {
  const dot = (bg: string, s: number) => ({ width: s, height: s, borderRadius: 999, background: bg, display: "flex" });
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 84, background: "#f7f5ef", backgroundImage: "radial-gradient(circle at 1px 1px, #e0dac9 1px, transparent 0)", backgroundSize: "30px 30px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 9, width: 60, height: 80, background: "#185a3f", borderRadius: 20, padding: 10 }}>
            <div style={dot("rgba(255,255,255,0.30)", 16)} />
            <div style={dot("rgba(255,255,255,0.30)", 16)} />
            <div style={dot("#34e08b", 20)} />
          </div>
          <div style={{ display: "flex", fontSize: 42, fontWeight: 700, color: "#15201a" }}>ModelCharter</div>
        </div>
        <div style={{ display: "flex", marginTop: 44, fontSize: 74, fontWeight: 800, color: "#15201a", lineHeight: 1.04, letterSpacing: -1 }}>Charter your AI at work.</div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#4b5a52", maxWidth: 960, lineHeight: 1.35 }}>
          Generate an AI usage policy, see which AI tools are safe to use, and prove your team has read the rules. No compliance department required.
        </div>
      </div>
    ),
    size,
  );
}
