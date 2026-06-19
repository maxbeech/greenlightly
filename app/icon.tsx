import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Brand mark: the signal motif (three lights, the bottom one green) drawn with
// plain divs so it is Satori-safe (no fonts, no exotic glyphs).
export default function Icon() {
  const dot = (bg: string, s: number) => ({ width: s, height: s, borderRadius: 999, background: bg, display: "flex" });
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#185a3f", borderRadius: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <div style={dot("rgba(255,255,255,0.32)", 11)} />
          <div style={dot("rgba(255,255,255,0.32)", 11)} />
          <div style={dot("#34e08b", 15)} />
        </div>
      </div>
    ),
    size,
  );
}
