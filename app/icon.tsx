import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Brand mark: emerald rounded square with a white "G". Uses an in-font glyph
// (no dynamic-font download) and a single child node (Satori-safe).
export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#059669", borderRadius: 14, color: "white", fontSize: 40, fontWeight: 700 }}>
        G
      </div>
    ),
    size,
  );
}
