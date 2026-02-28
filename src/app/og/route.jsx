import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "1200px",
          height: "630px",
          backgroundColor: "#0a0f1a",
        }}
      >
        {/* Left Panel */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "720px",
            height: "630px",
            padding: "60px",
            gap: "24px",
          }}
        >
          {/* Site name */}
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#3b82f6",
            }}
          >
            SAVETHEVOTES.ORG
          </div>

          {/* Brand name */}
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "88px",
              fontWeight: 400,
              lineHeight: 1.05,
              color: "#f1f5f9",
            }}
          >
            Save the Votes
          </div>

          {/* Subtitle / what it is */}
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#94a3b8",
            }}
          >
            Citizen Preparedness Resource
          </div>

          {/* Value prop */}
          <div
            style={{
              fontSize: "26px",
              lineHeight: 1.5,
              color: "#94a3b8",
              maxWidth: "540px",
            }}
          >
            State-by-state guides to the documents you need to vote. All 50 states.
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: "2px",
            height: "630px",
            backgroundColor: "#1e293b",
          }}
        />

        {/* Right Panel */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "478px",
            height: "630px",
            background: "linear-gradient(to bottom, #3b82f6, #1d4ed8)",
          }}
        >
          {/* Large shield logo */}
          <svg
            width="320"
            height="320"
            viewBox="0 0 64 64"
            fill="none"
            style={{ opacity: 0.85 }}
          >
            <path
              d="M32 4L8 16v16c0 14.4 10.24 27.84 24 32 13.76-4.16 24-17.6 24-32V16L32 4z"
              fill="rgba(255,255,255,0.15)"
            />
            <path
              d="M32 8L12 18v14c0 12.6 8.96 24.36 20 28 11.04-3.64 20-15.4 20-28V18L32 8z"
              fill="rgba(255,255,255,0.2)"
            />
            <path
              d="M28 44l-8-8 3.5-3.5L28 37l13-13L44.5 27.5 28 44z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
