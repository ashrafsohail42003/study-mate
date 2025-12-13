"use client";

import { useState, useTransition } from "react";
import RoadmapCard from "@/features/roadmaps/components/Roadmap"; // تأكد من المسار
import RoadmapConfirmModal from "./RoadmapConfirmModal";
import { getRoadmapCourses } from "@/app/actions/roadmaps"; // استدعاء الأكشن
import { Database } from '@/types/database.types';
import { toast } from "sonner"; // أو أي مكتبة تنبيهات تستخدمها

type Roadmap = Pick<Database['public']['Tables']['roadmaps']['Row'], 'id' | 'title' | 'description' | 'icon' | 'color'>;

type Course = {
    id: string;
    title: string;
    description: string | null;
};

type RoadmapsClientProps = {
    roadmaps: Roadmap[];
    currentRoadmapId: string | null;
};

export default function RoadmapsClient({ roadmaps, currentRoadmapId }: RoadmapsClientProps) {
    const [selectedId, setSelectedId] = useState<string>(currentRoadmapId || "");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courses, setCourses] = useState<Course[]>([]);

    const [isPending, startTransition] = useTransition();

    const selectedRoadmap = roadmaps.find((r) => r.id === selectedId);
    const hasCurrentRoadmap = !!currentRoadmapId;
    const isCurrentSelected = currentRoadmapId === selectedId;
    const handleSelect = (id: string) => {
        setSelectedId(id);
    };

    const handleContinueClick = () => {
        if (!selectedId) return;

        startTransition(async () => {
            const result = await getRoadmapCourses(selectedId);

            if (result.success && result.data) {
                setCourses(result.data);
                setIsModalOpen(true);
            } else {
                toast.error("error loading courses");
            }
        });
    };

    return (
        <main className="min-h-screen w-full bg-background py-12 px-4 md:px-8 lg:px-16 flex flex-col items-center gap-10">
            {/* Header Section */}
            <div className="text-center space-y-4 max-w-2xl">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                    Choose Your <span className="text-primary">Path</span>
                </h1>
                <p className="text-muted-foreground text-base md:text-lg">
                    Select the roadmap that aligns with your career goals. You can switch at any time.
                </p>
            </div>

            {/* Grid Section - Responsive & Clean */}
            <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {roadmaps.length > 0 ? (
                    roadmaps.map((roadmap) => (
                        <RoadmapCard
                            key={roadmap.id}
                            roadmap={roadmap}
                            onSelect={handleSelect}
                            isSelected={roadmap.id === selectedId}
                        />
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-muted-foreground">
                        <p>No roadmaps available at the moment.</p>
                    </div>
                )}
            </div>

            <div className={`transition-all duration-500 ease-in-out ${selectedId ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <button
                    onClick={handleContinueClick}
                    disabled={isPending || !selectedId}
                    className={`
                        group relative overflow-hidden rounded-full px-8 py-4 font-semibold text-white shadow-xl transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70
                        ${isCurrentSelected ? 'bg-orange-500 hover:bg-orange-600' : 'bg-primary hover:bg-primary/90'}
                    `}
                >
                    <span className="relative flex items-center gap-3">
                        {isPending ? (
                            <>
                                <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                <span>Loading details...</span>
                            </>
                        ) : (
                            <>
                                <span>
                                    {isCurrentSelected ? `Continue with ${selectedRoadmap?.title}` : `Change Current Roadmap to ${selectedRoadmap?.title}`}
                                </span>
                                <svg
                                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </>
                        )}
                    </span>
                </button>
            </div>

            {selectedRoadmap && (
                <RoadmapConfirmModal
                    roadmapId={selectedId}
                    roadmapTitle={selectedRoadmap.title}
                    roadmapIcon={selectedRoadmap.icon}
                    roadmapDescription={selectedRoadmap.description}
                    courses={courses}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    hasCurrentRoadmap={hasCurrentRoadmap}
                />
            )}
        </main>
    );
}