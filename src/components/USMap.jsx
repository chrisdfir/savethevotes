"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import usaMap from "@svg-maps/usa";
import { stateData } from "@/data/states";
import { stateToSlug } from "@/data/stateSlugs";

/**
 * Map from @svg-maps/usa location names to stateData keys.
 * Most match directly; DC uses a different name in each source.
 */
const nameToStateKey = Object.fromEntries(
  usaMap.locations.map((loc) => {
    if (loc.name === "Washington, DC") return [loc.name, "District of Columbia"];
    return [loc.name, loc.name];
  })
);

function getStatusInfo(stateName) {
  const data = stateData[stateName];
  if (!data) return { category: "none", label: "No data available" };

  if (data.currentPocLaw && data.pocImplemented) {
    return { category: "active", label: "Active POC law" };
  }
  if (data.currentPocLaw && !data.pocImplemented) {
    return { category: "onbooks", label: "POC law (not enforced)" };
  }
  return { category: "none", label: "No POC requirement" };
}

const fillClasses = {
  active: "fill-map-active",
  onbooks: "fill-map-onbooks",
  none: "fill-map-none",
};

const dimFillClasses = {
  active: "fill-map-active/30",
  onbooks: "fill-map-onbooks/30",
  none: "fill-map-none/30",
};

export default function USMap({ highlight = null }) {
  const shouldReduceMotion = useReducedMotion();
  const router = useRouter();
  const [hoveredState, setHoveredState] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const svg = e.currentTarget.closest("svg");
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const locations = useMemo(
    () =>
      usaMap.locations.map((loc) => {
        const stateName = nameToStateKey[loc.name] || loc.name;
        const status = getStatusInfo(stateName);
        const slug = stateToSlug(stateName);
        const isDimmed = highlight && stateName !== highlight;
        return { ...loc, stateName, status, slug, isDimmed };
      }),
    [highlight]
  );

  const hoveredInfo = useMemo(() => {
    if (!hoveredState) return null;
    const stateName = nameToStateKey[hoveredState] || hoveredState;
    const data = stateData[stateName];
    const status = getStatusInfo(stateName);
    return { stateName, abbr: data?.abbr || "", ...status };
  }, [hoveredState]);

  return (
    <div className="relative w-full">
      {/* SVG Map */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={usaMap.viewBox}
        className="w-full h-auto"
        role="img"
        aria-label="Interactive map of the United States showing proof-of-citizenship law status by state"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {locations.map((loc) => (
          <path
            key={loc.id}
            d={loc.path}
            className={`
              ${loc.isDimmed ? dimFillClasses[loc.status.category] : fillClasses[loc.status.category]}
              stroke-surface stroke-[0.5]
              hover:brightness-125 hover:stroke-[1.5] hover:stroke-text
              transition-all duration-150 cursor-pointer
            `}
            aria-label={`View ${loc.stateName} voter guide`}
            tabIndex={0}
            role="link"
            onClick={() => router.push(`/${loc.slug}`)}
            onKeyDown={(e) => {
              if (e.key === "Enter") router.push(`/${loc.slug}`);
            }}
            onMouseEnter={() => setHoveredState(loc.name)}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredState(null)}
            onFocus={() => setHoveredState(loc.name)}
            onBlur={() => setHoveredState(null)}
          />
        ))}
      </motion.svg>

      {/* Tooltip */}
      {hoveredInfo && (
        <div
          className="absolute pointer-events-none z-20 bg-surface border border-border rounded-lg shadow-lg px-3 py-2 text-sm -translate-x-1/2 -translate-y-full"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y - 12,
          }}
        >
          <span className="font-semibold text-text">
            {hoveredInfo.stateName}
          </span>{" "}
          <span className="text-text-secondary text-xs">
            ({hoveredInfo.abbr})
          </span>
          <div
            className={`text-xs mt-0.5 ${
              hoveredInfo.category === "active"
                ? "text-red-600 dark:text-red-400"
                : hoveredInfo.category === "onbooks"
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-text-secondary"
            }`}
          >
            {hoveredInfo.label}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6 text-sm text-text-secondary">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-map-active" aria-hidden="true" />
          <span>Active POC Law</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-map-onbooks" aria-hidden="true" />
          <span>POC Law (Not Enforced)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-map-none" aria-hidden="true" />
          <span>No POC Requirement</span>
        </div>
      </div>
    </div>
  );
}
