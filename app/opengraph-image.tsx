import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE.name} — ${SITE.tagline}`;

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#ffffff", backgroundImage: "radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)", backgroundSize: "32px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center", background: "#059669", borderRadius: 16, color: "white", fontSize: 40 }}>✓</div>
          <div style={{ fontSize: 40, fontWeight: 800, color: "#0f172a" }}>Greenlightly</div>
        </div>
        <div style={{ marginTop: 40, fontSize: 72, fontWeight: 800, color: "#0f172a", lineHeight: 1.05, maxWidth: 900 }}>
          Greenlight AI <span style={{ color: "#059669" }}>at work.</span>
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: "#475569", maxWidth: 950 }}>
          Generate an AI usage policy, see which AI tools are safe to use, and govern your team — without a compliance department.
        </div>
      </div>
    ),
    size,
  );
}
