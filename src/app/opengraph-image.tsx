import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          color: "#f4f4f5",
          background: "linear-gradient(135deg, #09090b 0%, #0f172a 52%, #111827 100%)",
          fontFamily: "Arial",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 28, color: "#60a5fa", fontWeight: 700 }}>kenzamariyan.</div>
          <div style={{ fontSize: 22, color: "#a1a1aa" }}>React / Next.js / React Native</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 78, lineHeight: 1, fontWeight: 800, maxWidth: 900 }}>
            Frontend & Mobile Developer
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.35, color: "#cbd5e1", maxWidth: 820 }}>
            Building practical product workflows with clean interfaces, Firebase-backed data, and maintainable frontend architecture.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["Next.js", "React Native", "Firebase", "TypeScript"].map((item) => (
            <div
              key={item}
              style={{
                border: "1px solid rgba(96, 165, 250, 0.28)",
                borderRadius: 999,
                padding: "12px 20px",
                color: "#bfdbfe",
                background: "rgba(59, 130, 246, 0.10)",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
