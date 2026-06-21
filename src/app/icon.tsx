import { ImageResponse } from "next/og";

// Next.js App Router auto-generates /icon from this file
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          background: "#0D0B09",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Golden glow */}
        <div
          style={{
            position: "absolute",
            width: 28,
            height: 28,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)",
          }}
        />
        {/* VS text */}
        <span
          style={{
            fontSize: 15,
            fontWeight: 900,
            color: "#F59E0B",
            letterSpacing: "-1px",
            lineHeight: 1,
          }}
        >
          VS
        </span>
        {/* Golden dot */}
        <div
          style={{
            position: "absolute",
            bottom: 3,
            right: 3,
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#F59E0B",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
