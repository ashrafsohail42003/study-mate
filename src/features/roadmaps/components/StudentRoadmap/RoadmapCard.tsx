'use client'
import { useRouter } from "next/navigation"
import ProgressBar from "./ProgressBar"
import { Button } from "@/components/ui/button"

type LessonInfo = {
    id: string;
    course_id: string | null;
    title: string;
    duration: number;
    order: number;
};

type CourseWithProgress = {
    id: string;
    title: string;
    description: string;
    status: string;
    donePercentage: number;
    lessons: LessonInfo[];
};

type RoadmapCardProps = {
    course: CourseWithProgress;
};

export default function RoadmapCard({ course }: RoadmapCardProps) {
    const router = useRouter();

    function handleRoadmapCardOnClick() {
        router.push(`/course/${course.id}`);
    }

    // Find first incomplete lesson or the first lesson
    const currentLesson = course.lessons.find((l) => l.order > 0) || course.lessons[0];
    const lessonNumber = currentLesson?.order || 1;

    return (
        <div
            className="rounded-md bg-card-bg flex flex-row gap-5 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={handleRoadmapCardOnClick}
        >
            <div className="flex flex-col items-start bg-primary p-[30px] rounded-l-md text-white gap-5 w-1/4">
                <p className="text-xs uppercase tracking-wide">COURSE</p>
                <h1 className="text-xl font-bold">{course.title}</h1>
                <p className="text-sm opacity-90">{course.description}</p>
                <p className="text-xs uppercase">({course.status})</p>
            </div>
            <div className="p-[30px] w-3/4 flex flex-col gap-5">
                <div className="flex flex-row items-center justify-between">
                    <p className="text-sm text-text-secondary">
                        {course.lessons.length > 0
                            ? `LESSON ${lessonNumber} OF ${course.lessons.length}`
                            : 'NO LESSONS'}
                    </p>
                    <div style={{ width: "40%" }}>
                        <ProgressBar donePersantage={course.donePercentage} />
                    </div>
                </div>
                <h1 className="w-[30ch] text-lg font-semibold">
                    {currentLesson?.title || 'Start Learning'}
                </h1>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button onClick={handleRoadmapCardOnClick}>Continue</Button>
                </div>
            </div>
        </div>
    );
}