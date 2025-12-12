"use client";
import RoadmapCard from "@/features/roadmaps/components/Roadmap";
import { useState } from "react";
import Link from "next/link";
import { Database } from '@/types/database.types';

type Roadmap = Database['public']['Tables']['roadmaps']['Row'];

type RoadmapsClientProps = {
    roadmaps: Pick<Roadmap, 'id' | 'title' | 'description' | 'icon' | 'color'>[];
    currentRoadmapId: string | null;
};

export default function RoadmapsClient({ roadmaps, currentRoadmapId }: RoadmapsClientProps) {
    const [selectedId, setSelectedId] = useState(currentRoadmapId || "");
    const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

    const handleSelect = (id: string) => {
        setSelectedId(id);
        const roadmap = roadmaps.find((r) => r.id === id);
        if (roadmap) {
            setSelectedTitle(roadmap.title);
        } else {
            setSelectedTitle(null);
        }
    };

    return (
        <div className="p-[100px] flex flex-col gap-[100px] items-center justify-between">
            <h1 className="text-text-primary text-3xl font-bold">Choose Your Roadmap</h1>

            <div className="flex flex-row gap-[50px] items-center flex-wrap justify-center">
                {roadmaps.length === 0 ? (
                    <p className="text-text-secondary">No roadmaps available at the moment.</p>
                ) : (
                    roadmaps.map((roadmap) => (
                        <RoadmapCard
                            key={roadmap.id}
                            roadmap={roadmap}
                            onSelect={handleSelect}
                            isSelected={roadmap.id === selectedId}
                        />
                    ))
                )}
            </div>

            {selectedTitle && (
                <Link href="/student" className="text-lg text-accent underline">
                    Continue with {selectedTitle}
                </Link>
            )}
        </div>
    );
}
