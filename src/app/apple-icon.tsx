import { ImageResponse } from "next/og";

// Next.js App Router auto-generates /apple-icon from this file
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 36,
          background: "#0D0B09",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Outer glow ring */}
        <div
          style={{
            position: "absolute",
            width: 160,
            height: 160,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)",
          }}
        />
        {/* VS text */}
        <span
          style={{
            fontSize: 86,
            fontWeight: 900,
            color: "#F59E0B",
            letterSpacing: "-4px",
            lineHeight: 1,
          }}
        >
          VS
        </span>
        {/* Golden dot */}
        <div
          style={{
            position: "absolute",
            bottom: 22,
            right: 22,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#F59E0B",
            boxShadow: "0 0 10px #F59E0B",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
