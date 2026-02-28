# OG Image Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current OG image with a Bold Split Layout that uses the full 1200x630 canvas to drive clicks from social feeds.

**Architecture:** Create a Next.js OG image route using `next/og` `ImageResponse` that renders the two-panel design with inline styles. Then use a script to fetch the generated image and save it as `public/og-image.png` for static serving.

**Tech Stack:** Next.js 15, `next/og` (built-in, no install needed), Node.js script for export

---

### Task 1: Create the OG image route

**Files:**
- Create: `src/app/og/route.jsx`

**Step 1: Create the OG route file**

Create `src/app/og/route.jsx` with the Bold Split Layout design using `ImageResponse` from `next/og`. The route renders at GET `/og` and returns a 1200x630 PNG.

```jsx
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
```

**Step 2: Start dev server and verify in browser**

Run: `npm run dev`
Visit: `http://localhost:3000/og`
Expected: See the two-panel OG image rendered in the browser. Left panel has dark navy background with site name, headline, and bottom tag. Right panel is blue gradient with white checkmark icon.

**Step 3: Commit**

```bash
git add src/app/og/route.jsx
git commit -m "feat: add OG image generation route with bold split layout"
```

---

### Task 2: Export the generated image to public/og-image.png

**Files:**
- Create: `scripts/export-og.mjs`
- Modify: `public/og-image.png` (overwrite)

**Step 1: Create the export script**

Create `scripts/export-og.mjs` that fetches the OG route from the dev server and saves it to `public/og-image.png`.

```js
import { writeFileSync } from "fs";

const url = process.argv[2] || "http://localhost:3000/og";

async function exportOg() {
  console.log(`Fetching OG image from ${url}...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed: ${res.status} ${res.statusText}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  writeFileSync("public/og-image.png", buffer);
  console.log(`Saved to public/og-image.png (${buffer.length} bytes)`);
}

exportOg().catch((e) => {
  console.error(e);
  process.exit(1);
});
```

**Step 2: Run the export (dev server must be running)**

Run: `node scripts/export-og.mjs`
Expected: `Saved to public/og-image.png (XXXXX bytes)` — file is overwritten with new image.

**Step 3: Verify the image**

Open `public/og-image.png` and visually confirm:
- Left panel: dark navy with blue "SAVETHEVOTES.ORG" at top, large white serif headline in center, blue "ALL 50 STATE GUIDES →" at bottom
- Right panel: blue gradient with white checkmark icon
- No dead space — full canvas utilized
- Text readable when image is viewed at ~600px wide (social thumbnail size)

**Step 4: Commit**

```bash
git add scripts/export-og.mjs public/og-image.png
git commit -m "feat: export new bold split OG image to public/og-image.png"
```

---

### Task 3: Visual polish and iteration

**Files:**
- Modify: `src/app/og/route.jsx`
- Modify: `public/og-image.png` (re-export)

**Step 1: Review and adjust sizing/spacing**

After seeing the rendered image, adjust font sizes, padding, or layout proportions in `src/app/og/route.jsx` if needed. Common adjustments:
- Headline font size (try 48-56px range)
- Padding (try 48-72px range)
- Checkmark icon size (try 160-240px range)
- Right panel width ratio

**Step 2: Re-export**

Run: `node scripts/export-og.mjs`
Visually verify the updated image.

**Step 3: Commit final version**

```bash
git add src/app/og/route.jsx public/og-image.png
git commit -m "fix: polish OG image spacing and proportions"
```

---

### Task 4: Clean up and verify metadata references

**Files:**
- Check: `src/app/layout.jsx` (lines 42-48)
- Check: `src/app/[state]/page.jsx` (lines 29-33)

**Step 1: Verify OG metadata still references the correct path**

Read `src/app/layout.jsx` and `src/app/[state]/page.jsx` to confirm they reference `/og-image.png` with dimensions `1200x630`. No changes needed unless the path or dimensions changed.

**Step 2: Run build to verify no errors**

Run: `npm run build`
Expected: Build succeeds with no errors.

**Step 3: Commit if any metadata changes were needed**

```bash
git add src/app/layout.jsx src/app/[state]/page.jsx
git commit -m "fix: update OG image metadata references"
```
