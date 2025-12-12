import { ArrowLeft } from "lucide-react"
import TimeNeeded from "@/features/courses/components/TimeNeeded"
import Title from "@/components/ui/SectionTitle"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useTransition } from "react"
import Course from "@/features/courses/components/Course"
import { Database } from '@/types/database.types';
import { markLessonComplete } from "@/app/actions/lessons"
import { useRouter } from "next/navigation"

type LessonType = Database['public']['Tables']['lessons']['Row'];
type CourseType = Database['public']['Tables']['courses']['Row'];
type ProgressType = Database['public']['Tables']['user_lesson_progress']['Row'];

interface LessonProps {
    lesson: LessonType;
    course: CourseType | null;
    userProgress: ProgressType | null;
    courseLessons: Pick<LessonType, 'id' | 'title' | 'duration' | 'order_index'>[];
    allProgress: Pick<ProgressType, 'lesson_id' | 'status'>[];
}

export default function Lesson({ lesson, course, userProgress, courseLessons, allProgress }: LessonProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const isCompleted = userProgress?.status === 'Completed'

    const handleMarkDone = () => {
        startTransition(async () => {
            const result = await markLessonComplete(lesson.id);
            if (result.success) {
                // Ideally router.refresh() is handled by revalidatePath in action, but we can double check
                router.refresh();
            }
        });
    }

    const borderColor = isCompleted ? "var(--color-accent)" : "var(--color-primary)";

    return (
        <div className="p-[100px] flex flex-row gap-[50px]">
            <div className="w-[30%]">
                <Course
                    id={lesson.course_id || ''}
                    currentLessonId={lesson.id}
                    lessons={courseLessons}
                    progress={allProgress}
                    courseTitle={course?.title || ''}
                />
            </div>
            <div style={{ borderColor }} className="border-2 p-[50px] bg-card-bg rounded-lg flex flex-col gap-[40px] mt-[85px] w-[70%]">
                <div className="flex flex-row items-center justify-between">
                    <div>
                        <Title title={lesson.title} />
                        <nav className="flex items-center text-text-secondary">
                            (<TimeNeeded minutes={lesson.duration || 0} />)
                        </nav>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/course/${lesson.course_id}`}>
                            <Button variant="outline">
                                Back to Course
                            </Button>
                        </Link>
                        <Button
                            onClick={handleMarkDone}
                            disabled={isPending || isCompleted}
                            className={isCompleted ? "bg-green-600 hover:bg-green-700 text-white" : ""}
                        >
                            {isCompleted ? 'Completed' : (isPending ? 'Updating...' : 'Mark Done')}
                        </Button>
                    </div>
                </div>
                <article className="w-[90ch] text-wrap whitespace-pre-line">
                    {lesson.content}
                </article>
            </div>
        </div>
    )
}