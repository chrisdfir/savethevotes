# Save the Vote — Expansion Design

**Date:** 2026-02-27
**Status:** Approved (Revised)
**Domain:** savethevotes.org
**Approach:** Phase 1 (Next.js Rebuild + UX Polish), then Phase 2 (Feature Expansion)

## Goal

Transform Save the Vote from a standalone JSX file into a polished, SEO-optimized Next.js application deployed at savethevotes.org. Individual state guide pages that rank on Google. Interactive US map, mobile-first responsive design, full accessibility, animations, and dark/light theme support.

## Phase 1: Next.js Rebuild + UX Polish

### Tech Stack

- **Framework:** Next.js 15 (App Router, static export via SSG)
- **Runtime:** React 19
- **Styling:** Tailwind CSS v4 (CSS-first config, `@tailwindcss/postcss`)
- **Animations:** Motion (framer-motion v12+)
- **Deployment:** Vercel at savethevotes.org
- **Map data:** `@svg-maps/usa` for SVG state paths

### Routing

```
/                     → Home (hero, map, docs overview, facts, timeline, action)
/[state]              → Full state guide (e.g., /california, /texas)
```

- 51 static pages generated at build time (50 states + DC)
- State slugs are lowercase, hyphenated: `/new-york`, `/north-carolina`
- Each state page has unique meta tags, OG image, structured data

### Project Structure

```
savethevote/
├── next.config.js
├── package.json
├── public/
│   ├── favicon.svg
│   └── og/                    (generated OG images per state)
├── src/
│   ├── app/
│   │   ├── layout.jsx         (root layout: fonts, theme provider, skip-to-content)
│   │   ├── page.jsx           (home page)
│   │   ├── [state]/
│   │   │   └── page.jsx       (state guide page)
│   │   ├── globals.css        (Tailwind directives + @theme tokens)
│   │   └── not-found.jsx
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── USMap.jsx           (interactive SVG, links to state routes)
│   │   ├── StateSelector.jsx   (search + button grid)
│   │   ├── StateGuide.jsx      (full state detail for /[state] pages)
│   │   ├── DocumentCards.jsx
│   │   ├── FactsGrid.jsx
│   │   ├── Timeline.jsx
│   │   ├── ActionSection.jsx
│   │   ├── Footer.jsx
│   │   ├── ScrollToTop.jsx
│   │   ├── StateFAQ.jsx        (state-specific FAQ for SEO)
│   │   └── ui/
│   │       ├── StatusBadge.jsx
│   │       └── SectionDivider.jsx
│   ├── data/
│   │   ├── states.js
│   │   ├── documents.js
│   │   ├── timeline.js
│   │   └── stateSlugs.js      (name ↔ slug mapping)
│   ├── hooks/
│   │   ├── useTheme.js
│   │   └── useScrollPosition.js
│   └── lib/
│       └── seo.js             (generateMetadata helpers, structured data)
```

### State Guide Pages (`/[state]`)

Each state page includes:
- **Header:** State name, abbreviation, POC law status badges
- **Map highlight:** Mini US map with this state highlighted
- **Requirements panel:** Voter ID type, online registration, deadlines, POC law status
- **Birth certificate guide:** Cost, time, how to order (online/mail/in-person), direct link
- **Resources:** State election office, vital records, federal resources
- **FAQ:** 4-6 state-specific questions (helps SEO with long-tail queries)
- **Nearby states:** Links to neighboring state pages
- **Action:** Contact your senators section
- **Breadcrumb:** Home → State Name

### SEO

- `generateMetadata()` per state page: title, description, OG image, canonical URL
- OG images: Static or generated at build time showing state name + key stat
- JSON-LD structured data (FAQPage schema for state FAQ sections)
- Sitemap generated via `next-sitemap` or built-in
- `robots.txt` allowing all crawlers

### Interactive US Map

- SVG paths from `@svg-maps/usa` package
- Color-coded: red = active POC law, amber = on books/not enforced, neutral = no POC law
- Hover: highlight with tooltip (state name + POC status)
- Click: navigates to `/[state]` route (Next.js Link)
- Responsive: scales proportionally, touch-friendly on mobile
- Accessible: each state path wrapped in `<a>` with aria-label, keyboard navigable
- Animation: subtle scale on hover, smooth color transitions

### Theme System

- CSS custom properties via Tailwind v4 `@theme` directive
- Light theme (default) + dark theme via `.dark` class on `<html>`
- `useTheme` hook: checks `prefers-color-scheme` on mount, persists to localStorage
- Toggle in header (sun/moon icon, smooth transition)

### Responsive Design

- Mobile-first breakpoints: sm (640px), md (768px), lg (1024px)
- State button grid: 2 cols mobile → 5-6 cols desktop
- US Map: full width, scales down on mobile
- Info grids: stack to single column on mobile
- Hero text: clamp() for fluid typography
- Min 44px touch targets (WCAG)

### Accessibility (WCAG 2.1 AA)

- Semantic HTML: main, nav, article, section with proper heading hierarchy
- ARIA: live regions for state selection, proper tab/map labels
- Focus management: state selection moves focus to detail panel
- Color contrast: 4.5:1 ratio minimum in both themes
- Keyboard: Tab, Enter, Escape, Arrow keys on map
- Skip-to-content link

### Animations (Motion / Framer Motion)

- Page load: staggered fade-in for hero, cards, facts
- State selection: detail panel slides in with spring physics
- Tab switching: cross-fade with AnimatePresence (stable keys, not index)
- Map hover: whileHover scale + glow on state paths
- Scroll-to-top: fade in/out
- useReducedMotion: respects `prefers-reduced-motion`, replaces motion with opacity-only

### Verification Tools

- **Chrome DevTools MCP:** Visual testing, screenshots, responsive viewport emulation
- **Context7 MCP:** Live documentation lookups during implementation

## Phase 2: Feature Expansion (Future)

- Personalized checklist wizard
- Deadline countdown timer
- Social sharing with dynamic OG images (Vercel OG)
- Printable state guides (PDF export)
- Letter-to-senator templates
- State comparison tool
- Email signup for bill status updates

Phase 2 will be designed and planned separately after Phase 1 ships.
