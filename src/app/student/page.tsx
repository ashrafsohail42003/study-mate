import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import StudentHomePage from "@/features/student/components/StudentPage";
import { Database } from "@/types/database.types";

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, current_roadmap_id')
    .eq('id', user.id)
    .single();

  // Get roadmap name
  let roadmapTitle = null;
  if (profile?.current_roadmap_id) {
    const { data: roadmap } = await supabase
      .from('roadmaps')
      .select('title')
      .eq('id', profile.current_roadmap_id)
      .single();
    roadmapTitle = roadmap?.title || null;
  }

  // Get user's tasks (top 5)
  const { data: tasks } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5);

  // Get user's courses from roadmap (if they have one)
  type CourseData = Pick<Database['public']['Tables']['courses']['Row'], 'id' | 'title' | 'description' | 'icon'>;
  let courses: (CourseData | null)[] = [];

  if (profile?.current_roadmap_id) {
    const { data: roadmapCourses } = await supabase
      .from('roadmap_courses')
      .select(`
        courses (
          id,
          title,
          description,
          icon
        )
      `)
      .eq('roadmap_id', profile.current_roadmap_id)
      .order('order_index')
      .limit(6);

    courses = roadmapCourses?.map(rc => rc.courses).filter(Boolean) || [];

    // Get suggested courses (all courses not in their roadmap)
    const { data: allCourses } = await supabase
      .from('courses')
      .select('id, title, description, icon')
      .limit(6);

    return (
      <StudentHomePage
        studentName={profile?.full_name || user.email?.split('@')[0] || 'Student'}
        selectedRoadmap={roadmapTitle || undefined}
        tasks={tasks || []}
        myCourses={courses}
        suggestedCourses={allCourses || []}
      />
    );
  }
}