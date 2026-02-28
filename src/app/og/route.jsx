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
            justifyContent: "space-between",
            width: "720px",
            height: "630px",
            padding: "60px",
          }}
        >
          {/* Site name */}
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#3b82f6",
            }}
          >
            SAVETHEVOTES.ORG
          </div>

          {/* Headline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0px",
            }}
          >
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "52px",
                fontWeight: 400,
                lineHeight: 1.1,
                color: "#f1f5f9",
              }}
            >
              Are You Ready to Prove You're a Citizen?
            </div>
          </div>

          {/* Bottom tag */}
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#3b82f6",
            }}
          >
            ALL 50 STATE GUIDES →
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
          {/* Checkmark icon using SVG */}
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            style={{ opacity: 0.8 }}
          >
            <rect
              x="10"
              y="10"
              width="180"
              height="180"
              rx="20"
              stroke="white"
              strokeWidth="8"
              fill="none"
            />
            <path
              d="M55 100 L85 135 L145 65"
              stroke="white"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
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
