// app/my-roadmap/page.tsx (Server Component)

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import MyRoadmap from "@/features/roadmaps/components/StudentRoadmap/StudentRoadmap";
import { headers } from "next/headers"; // لاستخدام الـ headers في حالة الحاجة للـ Revalidation
import { Database } from '@/types/database.types';

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
  icon: string | null;
  estimated_hours: number | null;
  status: 'completed' | 'in progress' | 'not started';
  donePercentage: number;
  lessons: LessonProgress[];
};


async function getStudentRoadmapData(userId: string): Promise<CourseWithProgress[] | null> {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('current_roadmap_id')
    .eq('id', userId)
    .maybeSingle();

  if (!profile?.current_roadmap_id) {
    return null;
  }

  const roadmapId = profile.current_roadmap_id;
  const [roadmapCoursesResult, progressResult] = await Promise.all([
    supabase
      .from('roadmap_courses')
      .select(`
        course_id,
        order_index,
        courses ( id, title, description, icon, estimated_hours )
      `)
      .eq('roadmap_id', roadmapId)
      .order('order_index'),

    supabase
      .from('user_lesson_progress')
      .select('lesson_id, status')
      .eq('user_id', userId)
      .eq('status', 'Completed')
  ]);

  const roadmapCourses = roadmapCoursesResult.data || [];
  const completedProgress = progressResult.data || [];
  const completedLessonIds = new Set(completedProgress.map(p => p.lesson_id));
  const courseIds = roadmapCourses.map(rc => rc.course_id).filter(Boolean) as string[];

  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, course_id, title, duration, order_index')
    .in('course_id', courseIds)
    .order('order_index');

  const allLessons = lessons || [];

  const coursesWithProgress: CourseWithProgress[] = roadmapCourses.map(rc => {
    const course = rc.courses as Database['public']['Tables']['courses']['Row'] | null;
    if (!course) return null;

    const courseLessons = allLessons
      .filter(l => l.course_id === rc.course_id)
      .sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

    const lessonsWithProgress: LessonProgress[] = courseLessons.map(l => ({
      id: l.id,
      course_id: l.course_id as string,
      title: l.title,
      duration: l.duration || 0,
      order: l.order_index || 0,
      isCompleted: completedLessonIds.has(l.id),
    }));

    const completedCount = lessonsWithProgress.filter(l => l.isCompleted).length;
    const totalCount = lessonsWithProgress.length;
    const donePercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    let status: 'completed' | 'in progress' | 'not started' = 'not started';
    if (donePercentage === 100) status = 'completed';
    else if (donePercentage > 0) status = 'in progress';

    return {
      id: course.id,
      title: course.title,
      description: course.description || 'No description provided.',
      icon: course.icon,
      estimated_hours: course.estimated_hours,
      status,
      donePercentage,
      lessons: lessonsWithProgress,
    };
  }).filter((c): c is NonNullable<typeof c> => c !== null);

  return coursesWithProgress;
}

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const courses = await getStudentRoadmapData(user.id);

  if (!courses) {
    return redirect('/roadmaps');
  }

  return (
    <div className="min-h-screen">
      <MyRoadmap courses={courses} />
    </div>
  );
}