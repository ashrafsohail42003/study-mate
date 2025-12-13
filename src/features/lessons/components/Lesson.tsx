"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Course from "@/features/courses/components/Course";
import TimeNeeded from "@/features/courses/components/TimeNeeded";
import Title from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { markLessonComplete } from "@/app/actions/lessons";
import { Database } from "@/types/database.types";

type LessonType = Database["public"]["Tables"]["lessons"]["Row"];
type CourseType = Database["public"]["Tables"]["courses"]["Row"];
type ProgressType =
    Database["public"]["Tables"]["user_lesson_progress"]["Row"];

interface LessonProps {
    lesson: LessonType;
    course: CourseType | null;
    userProgress: ProgressType | null;
    courseLessons: any[];
    allProgress: any[];
}

export default function Lesson({
    lesson,
    course,
    userProgress,
    courseLessons,
    allProgress,
}: LessonProps) {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    const isCompleted =
        userProgress?.status === "Completed";

    const markDone = () =>
        startTransition(async () => {
            await markLessonComplete(lesson.id);
            router.refresh();
        });

    return (
        <div className="p-[100px] flex gap-12">
            <aside className="w-[30%]">
                <Course
                    id={lesson.course_id!}
                    courseTitle={course?.title ?? ""}
                    lessons={courseLessons}
                    progress={allProgress}
                    currentLessonId={lesson.id}
                />
            </aside>

            <main className="w-[70%] border-2 p-[50px] rounded-lg">
                <div className="flex justify-between">
                    <div>
                        <Title title={lesson.title} />
                        <TimeNeeded minutes={lesson.duration ?? 0} />
                    </div>

                    <div className="flex gap-2">
                        <Link href={`/course/${lesson.course_id}`}>
                            <Button variant="outline">Back</Button>
                        </Link>

                        <Button
                            onClick={markDone}
                            disabled={pending || isCompleted}
                        >
                            {isCompleted ? "Completed" : "Mark Done"}
                        </Button>
                    </div>
                </div>

                <article className="mt-8 whitespace-pre-line">
                    {lesson.content}
                </article>
            </main>
        </div>
    );
}
