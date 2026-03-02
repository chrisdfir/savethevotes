"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const sections = [
  { id: "checklist", label: "Checklist" },
  { id: "guide", label: "Guide" },
  { id: "documents", label: "Documents" },
  { id: "facts", label: "Facts" },
  { id: "act", label: "Act" },
];

export default function SectionNav() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first section that's intersecting (topmost in viewport)
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <nav aria-label="Section navigation" className="flex items-center">
      {/* Desktop links */}
      <div className="hidden sm:flex items-center gap-4">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`font-mono text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded ${
              activeId === s.id
                ? "text-accent font-bold"
                : "text-text-muted hover:text-accent"
            }`}
          >
            {s.label}
          </a>
        ))}
      </div>

      {/* Mobile select */}
      <div className="sm:hidden">
        <select
          aria-label="Jump to section"
          value={activeId || ""}
          onChange={(e) => {
            if (e.target.value) {
              document.getElementById(e.target.value)?.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="font-mono text-xs bg-transparent text-text-muted border border-border rounded-lg px-2 py-1.5 focus:border-accent focus:outline-none"
        >
          <option value="" disabled>
            Jump to...
          </option>
          {sections.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
}
