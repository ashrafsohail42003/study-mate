import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Course from "@/features/courses/components/Course";
import {
    getCourseData,
    getUserProgress,
} from "@/features/courses/data/course.data";

interface CoursePageProps {
    params: Promise<{ id: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
    // ✅ Next.js 16: params Promise
    const { id } = await params;

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const { course, lessons } = await getCourseData(id);
    if (!course) notFound();

    const progress = await getUserProgress(
        user.id,
        lessons.map((l) => l.id)
    );

    return (
        <div className="px-10 py-20">
            <Course
                id={course.id}
                courseTitle={course.title}
                lessons={lessons}
                progress={progress}
            />
        </div>
    );
}
