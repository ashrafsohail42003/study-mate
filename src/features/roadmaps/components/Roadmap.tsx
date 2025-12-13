"use client";

import Link from "next/link";
import { Database } from "@/types/database.types";
import { hover } from "framer-motion";

type Roadmap = Database["public"]["Tables"]["roadmaps"]["Row"];

type RoadmapCardProps = {
  roadmap: Pick<Roadmap, "id" | "title" | "description" | "icon">;
  onSelect: (id: string) => void;
  isSelected?: boolean;
};

export default function RoadmapCard({
  roadmap,
  onSelect,
  isSelected = false,
}: RoadmapCardProps) {
  return (
    <article>
      <button
        onClick={() => onSelect(roadmap.id)}
        className={`
          w-full h-full text-left
          rounded-2xl border p-6
          transition-all duration-300
          hover:-translate-y-1 hover:shadow-lg
          hover:bg-black/10 hover:cursor-pointer
          focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40
          ${isSelected ? "border-accent ring-2 ring-accent/50" : "border-border"

          }
        `}
        aria-pressed={isSelected}
      >
        <div className="flex flex-col justify-between h-full gap-4">
          <div
            className="text-4xl"
            aria-hidden
          >
            {roadmap.icon}
          </div>

          <h2 className="text-xl font-semibold">
            {roadmap.title}
          </h2>

          {roadmap.description && (
            <p className="text-sm text-text-secondary line-clamp-3">
              {roadmap.description}
            </p>
          )}

          <Link
            href={`/roadmaps/${roadmap.id}`}
            onClick={(e) => e.stopPropagation()}
            className="
             group mt-4 inline-flex items-center gap-1
              text-sm font-medium text-primary
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
            "
          >
            Learn more → <span className="invisible group-hover:visible"> → →</span>
          </Link>
        </div>
      </button>
    </article>
  );
}
