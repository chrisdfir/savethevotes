"use client";

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
  if (pathname !== "/") return null;

  return (
    <nav aria-label="Section navigation" className="flex items-center">
      {/* Desktop links */}
      <div className="hidden sm:flex items-center gap-4">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="font-mono text-xs text-text-muted hover:text-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded transition-colors"
          >
            {s.label}
          </a>
        ))}
      </div>

      {/* Mobile select */}
      <div className="sm:hidden">
        <select
          aria-label="Jump to section"
          defaultValue=""
          onChange={(e) => {
            if (e.target.value) {
              document.getElementById(e.target.value)?.scrollIntoView({ behavior: "smooth" });
              e.target.value = "";
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
