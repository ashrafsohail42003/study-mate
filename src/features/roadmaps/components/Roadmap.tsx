"use client";

import Link from "next/link";
import { Database } from '@/types/database.types';

type Roadmap = Database['public']['Tables']['roadmaps']['Row'];

type RoadmapCardProps = {
  roadmap: Pick<Roadmap, 'id' | 'title' | 'description' | 'icon'>;
  onSelect: (id: string) => void;
  isSelected?: boolean;
};

export default function RoadmapCard({ roadmap, onSelect, isSelected = false }: RoadmapCardProps) {
  return (
    <div
      className={`bg-primary shadow-lg p-5 w-[300px] h-[300px] flex flex-col items-center justify-center gap-[15px] rounded-full text-bg transition-transform duration-300 hover:-translate-y-1 ${isSelected ? "border-[5px] border-accent" : ""}`}
      onClick={() => onSelect(roadmap.id)}
    >

      <div className="text-4xl">
        {roadmap.icon}
      </div>

      <h2 className="text-xl font-bold">{roadmap.title}</h2>
      <p className="text-center">{roadmap.description}</p>

      <div className="">
        <Link
          href={`/roadmaps/${roadmap.id}`}
          className="underline text-white"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}
