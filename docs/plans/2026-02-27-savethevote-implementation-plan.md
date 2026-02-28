# Save the Vote — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild Save the Vote as a Next.js app with individual state guide pages, interactive US map, dark/light theme, full accessibility, and animations — deployed at savethevotes.org.

**Architecture:** Next.js 15 App Router with SSG. 51 static state pages generated at build time. Tailwind v4 for styling, Motion (Framer Motion) for animations, `@svg-maps/usa` for map SVG data. All data is static (no database, no API).

**Tech Stack:** Next.js 15, React 19, Tailwind CSS v4, Motion (framer-motion), @svg-maps/usa

**Verification:** Chrome DevTools MCP for visual testing/screenshots. Context7 MCP for live docs. `next build` for SSG validation.

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `next.config.js`, `src/app/layout.jsx`, `src/app/page.jsx`, `src/app/globals.css`, `public/favicon.svg`

**Step 1: Initialize Next.js project**

Run:
```bash
cd C:/dev/savethevote
npx create-next-app@latest . --js --app --tailwind --eslint --no-src-dir --no-import-alias --turbopack
```

If the directory isn't empty, move `savethevote.jsx` and `docs/` aside first, then scaffold, then move them back.

Expected: Next.js project with App Router, Tailwind v4, ESLint configured.

**Step 2: Install additional dependencies**

Run:
```bash
npm install framer-motion @svg-maps/usa
```

**Step 3: Verify dev server starts**

Run:
```bash
npm run dev
```

Expected: Dev server at http://localhost:3000, default Next.js page renders.

**Step 4: Verify with Chrome DevTools MCP**

Use `navigate_page` to http://localhost:3000, then `take_screenshot` to confirm the page renders.

**Step 5: Commit**

```bash
git add .
git commit -m "feat: scaffold Next.js 15 project with Tailwind v4 and Motion"
```

---

## Task 2: Extract Data Files

**Files:**
- Create: `src/data/states.js`, `src/data/documents.js`, `src/data/timeline.js`, `src/data/stateSlugs.js`
- Reference: `savethevote.jsx` (source of all data)

**Step 1: Create `src/data/states.js`**

Extract the `stateData` object from `savethevote.jsx`. Export it as a named export. Keep the exact same shape.

```js
export const stateData = {
  "Alabama": { abbr: "AL", vitalRecordsUrl: "...", ... },
  // ... all 50 states + DC
};
```

**Step 2: Create `src/data/stateSlugs.js`**

Generate slug mappings from state names:

```js
export function stateToSlug(name) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function slugToState(slug) {
  return Object.keys(stateData).find(
    (name) => stateToSlug(name) === slug
  );
}

export function getAllStateSlugs() {
  return Object.keys(stateData).map(stateToSlug);
}
```

**Step 3: Create `src/data/documents.js`**

Extract the `acceptableDocuments` array from `savethevote.jsx`.

```js
export const acceptableDocuments = [
  { name: "U.S. Passport or Passport Card", icon: "passport", cost: "$130–$165", ... },
  // ... all documents
];
```

**Step 4: Create `src/data/timeline.js`**

Extract the timeline events array from `savethevote.jsx`.

```js
export const timelineEvents = [
  { date: "May 2024", event: "SAVE Act (H.R. 8281) introduced...", done: true },
  // ... all events
];
```

**Step 5: Verify imports work**

Create a temporary test in `src/app/page.jsx` that imports and logs the data:

```jsx
import { stateData } from "@/data/states";
console.log(Object.keys(stateData).length); // should be 51
```

Run `npm run dev`, check browser console shows 51.

**Step 6: Commit**

```bash
git add src/data/
git commit -m "feat: extract state, document, and timeline data into modules"
```

---

## Task 3: Theme System

**Files:**
- Create: `src/hooks/useTheme.js`, `src/components/ThemeToggle.jsx`
- Modify: `src/app/globals.css`, `src/app/layout.jsx`

**Step 1: Set up Tailwind v4 theme tokens in `globals.css`**

```css
@import "tailwindcss";

@theme {
  --color-surface: #f8fafc;
  --color-surface-alt: #f1f5f9;
  --color-text: #0f172a;
  --color-text-secondary: #475569;
  --color-text-muted: #94a3b8;
  --color-border: rgba(71, 85, 105, 0.2);
  --color-accent: #3b82f6;
  --color-accent-dark: #1d4ed8;
  --color-danger: #dc2626;
  --color-success: #16a34a;
  --color-warning: #fbbf24;
}

.dark {
  --color-surface: #0a0f1a;
  --color-surface-alt: #0f172a;
  --color-text: #f1f5f9;
  --color-text-secondary: #94a3b8;
  --color-text-muted: #64748b;
  --color-border: rgba(71, 85, 105, 0.25);
}
```

**Step 2: Create `useTheme` hook**

```jsx
"use client";
import { useState, useEffect } from "react";

export function useTheme() {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      setTheme(stored);
      applyTheme(stored);
    } else {
      applyTheme("system");
    }
  }, []);

  function applyTheme(value) {
    const isDark =
      value === "dark" ||
      (value === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
  }

  function toggleTheme() {
    const next = theme === "dark" ? "light" : theme === "light" ? "dark" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  }

  return { theme, toggleTheme };
}
```

**Step 3: Create `ThemeToggle` component**

Sun/moon icon button. Uses `useTheme` hook. 44px min touch target. Aria label.

**Step 4: Add ThemeToggle to root layout**

Wire the toggle into `layout.jsx` header area.

**Step 5: Verify with Chrome DevTools MCP**

Navigate to localhost:3000, take screenshots in both themes. Use `emulate` to test `prefers-color-scheme: dark`.

**Step 6: Commit**

```bash
git add src/hooks/useTheme.js src/components/ThemeToggle.jsx src/app/globals.css src/app/layout.jsx
git commit -m "feat: add dark/light theme system with system preference detection"
```

---

## Task 4: Shared UI Components

**Files:**
- Create: `src/components/ui/StatusBadge.jsx`, `src/components/ui/SectionDivider.jsx`, `src/components/ScrollToTop.jsx`

**Step 1: Create StatusBadge**

Convert inline-styled StatusBadge from `savethevote.jsx` to Tailwind. Two variants: active (blue pulse dot) and inactive (neutral).

**Step 2: Create SectionDivider**

Gradient horizontal rule using Tailwind.

**Step 3: Create ScrollToTop**

Uses `useScrollPosition` hook (create `src/hooks/useScrollPosition.js`). Fixed button, bottom-right, fades in when scrolled past 400px. Uses Motion for fade animation.

**Step 4: Commit**

```bash
git add src/components/ui/ src/components/ScrollToTop.jsx src/hooks/useScrollPosition.js
git commit -m "feat: add shared UI components (StatusBadge, SectionDivider, ScrollToTop)"
```

---

## Task 5: Hero Component

**Files:**
- Create: `src/components/Hero.jsx`

**Step 1: Build Hero component**

Convert hero section from `savethevote.jsx` to Tailwind classes. Include:
- "Citizen Preparedness Resource" label
- "Save the Vote" h1 with serif font (Instrument Serif via next/font)
- Subtitle paragraph
- StatusBadge row for bill status
- Gradient background
- Motion staggered fade-in animation
- useReducedMotion check

**Step 2: Wire into home page**

Import Hero into `src/app/page.jsx`.

**Step 3: Verify with Chrome DevTools MCP**

Screenshot at desktop and mobile viewport (use `emulate` with viewport 375x812 for mobile).

**Step 4: Commit**

```bash
git add src/components/Hero.jsx src/app/page.jsx
git commit -m "feat: add Hero component with animations and responsive typography"
```

---

## Task 6: Document Cards Section

**Files:**
- Create: `src/components/DocumentCards.jsx`

**Step 1: Build DocumentCards**

Convert acceptable documents section from `savethevote.jsx` to Tailwind. Include:
- Section header
- Document cards grid with icon, cost, processing time, how-to-get, link
- Name-change alert box
- Motion stagger animation on cards

**Step 2: Add DocIcon component**

Extract the inline DocIcon SVGs from `savethevote.jsx` into the same file or a sub-component.

**Step 3: Wire into home page**

**Step 4: Verify with Chrome DevTools MCP**

**Step 5: Commit**

```bash
git add src/components/DocumentCards.jsx
git commit -m "feat: add DocumentCards section with accepted proof-of-citizenship documents"
```

---

## Task 7: Interactive US Map

**Files:**
- Create: `src/components/USMap.jsx`

**Step 1: Install and inspect @svg-maps/usa data**

```js
import usa from "@svg-maps/usa";
// usa.locations is an array of { id, name, path, ... }
```

**Step 2: Build USMap component**

- Render SVG with viewBox from usa data
- Each state is an `<a>` (Next.js Link to `/[state-slug]`) wrapping a `<path>`
- Color states based on `stateData[name].currentPocLaw` and `pocImplemented`:
  - Active POC law: red/rose fill
  - On books not enforced: amber fill
  - No POC law: neutral/slate fill
- Tooltip on hover (CSS-only or lightweight state): show state name + status
- `aria-label` on each state link
- `tabIndex={0}` for keyboard navigation
- Motion `whileHover` for subtle scale/brightness

**Step 3: Add map legend**

Three colored dots with labels: "Active POC Law", "POC Law (Not Enforced)", "No POC Requirement"

**Step 4: Wire into home page between Hero and DocumentCards**

**Step 5: Verify with Chrome DevTools MCP**

Test hover states, click navigation, mobile responsiveness. Screenshot at multiple viewports.

**Step 6: Commit**

```bash
git add src/components/USMap.jsx
git commit -m "feat: add interactive US map with color-coded POC law status"
```

---

## Task 8: State Selector (Search + Grid)

**Files:**
- Create: `src/components/StateSelector.jsx`

**Step 1: Build StateSelector**

Convert state search + button grid from `savethevote.jsx`:
- Search input with magnifying glass icon
- Filter by state name or abbreviation
- Button grid: 2 cols mobile → auto-fill on desktop
- Each button is a Next.js Link to `/[state-slug]`
- POC law states have accent left border
- Motion stagger on grid items

**Step 2: Wire into home page below the map**

**Step 3: Commit**

```bash
git add src/components/StateSelector.jsx
git commit -m "feat: add state selector with search and responsive grid"
```

---

## Task 9: State Guide Page (`/[state]`)

**Files:**
- Create: `src/app/[state]/page.jsx`
- Create: `src/components/StateGuide.jsx`
- Create: `src/components/StateFAQ.jsx`
- Modify: `src/data/stateSlugs.js` (if needed)

**Step 1: Create `generateStaticParams`**

```jsx
import { getAllStateSlugs } from "@/data/stateSlugs";

export function generateStaticParams() {
  return getAllStateSlugs().map((state) => ({ state }));
}
```

This tells Next.js to pre-render all 51 state pages at build time.

**Step 2: Create `generateMetadata`**

```jsx
import { slugToState } from "@/data/stateSlugs";
import { stateData } from "@/data/states";

export function generateMetadata({ params }) {
  const stateName = slugToState(params.state);
  const state = stateData[stateName];
  return {
    title: `${stateName} Voter Registration Guide — Save the Vote`,
    description: `Everything you need to register to vote in ${stateName}. Birth certificate costs ${state.birthCertCost}, processing ${state.birthCertTime}. ${state.currentPocLaw ? "Proof of citizenship required." : "No proof of citizenship requirement."}`,
    openGraph: {
      title: `${stateName} Voting Guide`,
      description: `Voter registration requirements for ${stateName}`,
      url: `https://savethevotes.org/${params.state}`,
    },
  };
}
```

**Step 3: Build StateGuide component**

Full state page content:
- Breadcrumb: Home → State Name
- Header with state name, abbreviation, badges
- Mini US map with this state highlighted (reuse USMap with `highlight` prop)
- Tabbed panels (Requirements / Birth Certificate / Resources) converted from `savethevote.jsx` StateDetail
- "What to Do Now" action list
- Name-change alert (if applicable)

**Step 4: Build StateFAQ component**

4-6 questions per state, dynamically generated from state data:
- "Do I need proof of citizenship to register to vote in {state}?"
- "How do I get a birth certificate in {state}?"
- "How much does a birth certificate cost in {state}?"
- "What voter ID do I need in {state}?"
- "Can I register to vote online in {state}?"
- (If POC law) "What documents count as proof of citizenship in {state}?"

Wrap in JSON-LD FAQPage schema for SEO.

**Step 5: Build the page component**

```jsx
import { slugToState } from "@/data/stateSlugs";
import { stateData } from "@/data/states";
import { notFound } from "next/navigation";
import StateGuide from "@/components/StateGuide";

export default function StatePage({ params }) {
  const stateName = slugToState(params.state);
  if (!stateName) notFound();
  const state = stateData[stateName];
  return <StateGuide stateName={stateName} state={state} />;
}
```

**Step 6: Verify SSG generates all pages**

Run:
```bash
npm run build
```

Expected: 51 static pages generated under `/.next/server/app/[state]/`.

**Step 7: Verify a state page with Chrome DevTools MCP**

Navigate to `http://localhost:3000/california`, take screenshot, check content is correct.

**Step 8: Commit**

```bash
git add src/app/[state]/ src/components/StateGuide.jsx src/components/StateFAQ.jsx
git commit -m "feat: add full state guide pages with SSG, SEO metadata, and FAQ schema"
```

---

## Task 10: Facts Grid + Timeline + Action Section

**Files:**
- Create: `src/components/FactsGrid.jsx`, `src/components/Timeline.jsx`, `src/components/ActionSection.jsx`

**Step 1: Build FactsGrid**

Convert quick facts section. 6 stat cards in responsive grid. Motion stagger. Counter animation on numbers (optional, nice-to-have).

**Step 2: Build Timeline**

Convert bill status timeline. Vertical line with dots. Done items in accent color, pending in muted. Motion stagger on mount.

**Step 3: Build ActionSection**

"Take Action" section with senator contact links and Capitol switchboard number.

**Step 4: Wire all into home page**

**Step 5: Commit**

```bash
git add src/components/FactsGrid.jsx src/components/Timeline.jsx src/components/ActionSection.jsx
git commit -m "feat: add facts grid, bill timeline, and take-action sections"
```

---

## Task 11: Footer + Layout Polish

**Files:**
- Create: `src/components/Footer.jsx`
- Modify: `src/app/layout.jsx` (fonts, skip-to-content, meta)

**Step 1: Build Footer**

Nonpartisan disclaimer, data sources, last updated date. Links to key pages.

**Step 2: Set up fonts in layout**

Use `next/font` for Instrument Serif and JetBrains Mono. Apply as CSS variables.

**Step 3: Add skip-to-content link**

```jsx
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute ...">
  Skip to content
</a>
```

**Step 4: Add root metadata**

```jsx
export const metadata = {
  title: { default: "Save the Vote — Citizen Preparedness Resource", template: "%s — Save the Vote" },
  description: "Find out exactly what documents you need to vote under the SAVE Act. State-by-state guides, birth certificate info, and direct links to election offices.",
  metadataBase: new URL("https://savethevotes.org"),
};
```

**Step 5: Add sitemap generation**

Create `src/app/sitemap.js`:

```js
import { getAllStateSlugs } from "@/data/stateSlugs";

export default function sitemap() {
  const states = getAllStateSlugs().map((slug) => ({
    url: `https://savethevotes.org/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));
  return [
    { url: "https://savethevotes.org", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...states,
  ];
}
```

**Step 6: Commit**

```bash
git add src/components/Footer.jsx src/app/layout.jsx src/app/sitemap.js
git commit -m "feat: add footer, fonts, skip-to-content, root SEO metadata, and sitemap"
```

---

## Task 12: Accessibility Audit + Polish

**Files:**
- Modify: Multiple component files as needed

**Step 1: Keyboard navigation audit**

Use Chrome DevTools MCP to test Tab navigation through entire page. Verify:
- All interactive elements are focusable
- Focus order is logical
- Map states are keyboard navigable
- Skip-to-content works

**Step 2: Screen reader audit**

Check semantic HTML:
- Proper heading hierarchy (h1 → h2 → h3, no skips)
- All images/icons have alt text or aria-hidden
- ARIA live regions on dynamic content
- Form labels on search input

**Step 3: Color contrast check**

Verify 4.5:1 contrast ratio in both light and dark themes for all text. Use Chrome DevTools.

**Step 4: Reduced motion**

Verify `useReducedMotion` is wired into all animated components. Test with Chrome DevTools `emulate` prefers-reduced-motion.

**Step 5: Fix any issues found**

**Step 6: Commit**

```bash
git commit -am "fix: accessibility improvements from audit"
```

---

## Task 13: Responsive Design Verification

**Files:**
- Modify: Components as needed for responsive fixes

**Step 1: Test at key breakpoints with Chrome DevTools MCP**

Use `emulate` with viewport sizes:
- 375x812 (iPhone SE)
- 390x844 (iPhone 14)
- 768x1024 (iPad)
- 1024x768 (iPad landscape)
- 1440x900 (desktop)
- 1920x1080 (large desktop)

Take screenshots at each. Verify:
- No horizontal overflow
- Touch targets min 44px
- Text is readable at all sizes
- Map is usable on mobile
- Grid layouts collapse properly

**Step 2: Fix any responsive issues**

**Step 3: Commit**

```bash
git commit -am "fix: responsive design fixes from viewport testing"
```

---

## Task 14: Build Verification + Production Prep

**Step 1: Run production build**

```bash
npm run build
```

Expected: All 51 state pages + home page generated. No build errors.

**Step 2: Test production build locally**

```bash
npm start
```

Navigate with Chrome DevTools MCP. Verify state pages load, links work, theme persists.

**Step 3: Verify 404 handling**

Navigate to `/nonexistent-state`. Verify `not-found.jsx` renders.

**Step 4: Check bundle size**

```bash
npm run build
```

Review the output size report. Ensure no unexpectedly large bundles.

**Step 5: Commit any final fixes**

```bash
git commit -am "chore: production build verification and fixes"
```

---

## Task 15: Clean Up + Final Commit

**Step 1: Remove original `savethevote.jsx`**

The monolith file is no longer needed — all its content has been extracted into the Next.js app.

**Step 2: Update `.gitignore`**

Ensure `.next/`, `node_modules/`, `.env*.local` are ignored.

**Step 3: Final commit**

```bash
git add .
git commit -m "chore: remove legacy monolith, clean up project structure"
```

---

## Deployment Note

After all tasks complete, deploy to Vercel:
1. Push to GitHub
2. Connect repo to Vercel
3. Configure custom domain: savethevotes.org
4. Vercel auto-detects Next.js, builds and deploys

---
