import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import Lesson from "@/features/lessons/components/Lesson";

interface LessonPageProps {
    params: { id: string };
}

export default async function LessonPage({
    params,
}: LessonPageProps) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const { data: lesson } = await supabase
        .from("lessons")
        .select("*, course:courses(*)")
        .eq("id", params.id)
        .single();

    if (!lesson || !lesson.course_id) notFound();

    const { data: userProgress } = await supabase
        .from("user_lesson_progress")
        .select("*")
        .eq("lesson_id", params.id)
        .eq("user_id", user.id)
        .single();

    const { data: courseLessons } = await supabase
        .from("lessons")
        .select("id, title, duration, order_index")
        .eq("course_id", lesson.course_id)
        .order("order_index");

    const { data: allProgress } = await supabase
        .from("user_lesson_progress")
        .select("lesson_id, status")
        .eq("user_id", user.id)
        .in(
            "lesson_id",
            courseLessons?.map((l) => l.id) ?? []
        );

    return (
        <Lesson
            lesson={lesson}
            course={lesson.course}
            userProgress={userProgress}
            courseLessons={courseLessons ?? []}
            allProgress={allProgress ?? []}
        />
    );
}
