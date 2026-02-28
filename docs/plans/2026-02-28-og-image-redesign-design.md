# OG Image Redesign — Bold Split Layout

**Date:** 2026-02-28
**Goal:** Replace the current OG image with a design that uses the full 1200x630 canvas, drives clicks from social feeds, and prominently brands savethevotes.org.

## Design

### Layout: Two-Panel Split

**Left Panel (~720px wide, full height)**
- Background: `#0a0f1a` (site dark theme surface)
- Top-left: `SAVETHEVOTES.ORG` — JetBrains Mono, 16px, bold, tracking 0.2em, uppercase, accent blue `#3b82f6`
- Center: Headline in Instrument Serif (Georgia fallback), ~52px, white `#f1f5f9`, tight leading:
  "Are You Ready to Prove You're a Citizen?"
- Bottom-left: `ALL 50 STATE GUIDES →` — JetBrains Mono, 14px, accent blue
- Padding: 60px all sides

**Right Panel (~480px wide, full height)**
- Background: Linear gradient `#3b82f6` → `#1d4ed8` (top to bottom)
- Center: Large white checkmark-in-box icon (~200px), 80% opacity
- Divider: 2px vertical line in `#1e293b` at boundary

### Colors
| Element | Value |
|---------|-------|
| Left bg | `#0a0f1a` |
| Right bg | `#3b82f6` → `#1d4ed8` |
| Headline | `#f1f5f9` |
| Site name / tag | `#3b82f6` |
| Right icon | `#ffffff` at 80% opacity |

### Typography
- Headline: Instrument Serif 400 (Georgia fallback)
- Mono labels: JetBrains Mono Bold (monospace fallback)

## Implementation Approach

Use Next.js `ImageResponse` (from `next/og`) at route `src/app/og/route.jsx` to generate the image with JSX + inline styles. Export the result as the static `public/og-image.png`. This keeps the image reproducible and version-controlled as code.

## Success Criteria
- Full 1200x630 canvas utilized (no dead space)
- Readable at Twitter/Facebook thumbnail sizes (~600px wide)
- Site name and headline are the dominant elements
- Consistent with site brand colors and typography
