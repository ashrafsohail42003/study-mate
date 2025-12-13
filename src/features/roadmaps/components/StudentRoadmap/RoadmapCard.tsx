'use client'
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import ProgressBar from "./ProgressBar"
type LessonProgress = {
    id: string;
    course_id: string;
    title: string;
    duration: number;
    order: number;
    isCompleted: boolean;
};

type CourseWithProgress = {
    id: string;
    title: string;
    description: string;
    status: 'completed' | 'in progress' | 'not started';
    donePercentage: number;
    lessons: LessonProgress[];
};

type RoadmapCardProps = {
    course: CourseWithProgress;
};

export default function RoadmapCard({ course }: RoadmapCardProps) {
    const router = useRouter();

    const firstIncompleteLesson = course.lessons.find(l => !l.isCompleted);
    const currentLesson = firstIncompleteLesson || course.lessons[0];

    const lessonNumber = currentLesson?.order || 1;
    const lessonActionTitle = currentLesson ? currentLesson.title : 'No Lessons Yet';

    const buttonText = course.status === 'completed' ? 'Review Course' :
        course.status === 'in progress' ? 'Continue Lesson' : 'Start Course';

    const handleRoadmapCardClick = () => {
        router.push(`/course/${course.id}`);
    };

    return (
        <article
            className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 grid grid-cols-1 md:grid-cols-4 gap-4"
            role="button"
            tabIndex={0}
            // onClick={handleRoadmapCardClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleRoadmapCardClick();
                }
            }}
        >
            <header className="md:col-span-1 bg-primary text-white p-4 rounded-lg flex flex-col justify-between gap-2">
                <p className="text-xs uppercase tracking-widest opacity-80">Course</p>
                <h2 className="text-lg font-bold">{course.title}</h2>
                <p className="text-sm opacity-90 line-clamp-2">{course.description}</p>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full w-fit ${course.status === 'completed' ? 'bg-green-600' : 'bg-yellow-600'
                    }`}>
                    {course.status.toUpperCase()}
                </span>
            </header>

            <div className="md:col-span-2 flex flex-col justify-between gap-4 py-1">
                <div className="space-y-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        PROGRESS: {course.donePercentage}% Done
                    </p>
                    <ProgressBar donePersantage={course.donePercentage} />
                </div>

                <div className="space-y-1">
                    <p className="text-xs uppercase text-gray-400 dark:text-gray-500">Next Step</p>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-1">
                        {lessonActionTitle}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Lesson {lessonNumber} of {course.lessons.length}
                    </p>
                </div>
            </div>

            <div className="md:col-span-1 flex items-center justify-end md:justify-center">
                <Button
                    className="hover:cursor-pointer bg-primary hover:bg-primary/80 text-white"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleRoadmapCardClick();
                    }}
                    aria-label={buttonText + ' ' + course.title}
                >
                    {buttonText}
                </Button>
            </div>
        </article>
    );
}