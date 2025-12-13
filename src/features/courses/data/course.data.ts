import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const getCourseData = cache(async (courseId: string) => {
    const supabase = await createClient();

    const { data: course } = await supabase
        .from("courses")
        .select("*")
        .eq("id", courseId)
        .single();

    const { data: lessons } = await supabase
        .from("lessons")
        .select("id, title, duration, order_index")
        .eq("course_id", courseId)
        .order("order_index");

    return {
        course,
        lessons: lessons ?? [],
    };
});

export async function getUserProgress(
    userId: string,
    lessonIds: string[]
) {
    if (lessonIds.length === 0) return [];

    const supabase = await createClient();

    const { data } = await supabase
        .from("user_lesson_progress")
        .select("lesson_id, status")
        .eq("user_id", userId)
        .in("lesson_id", lessonIds);

    return data ?? [];
}
