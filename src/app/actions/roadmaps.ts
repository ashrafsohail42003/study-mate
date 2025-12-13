'use server';

import { createClient } from "@/lib/supabase/server";

export async function getRoadmapCourses(roadmapId: string) {
    const supabase = await createClient();

    try {
        const { data, error } = await supabase
            .from('roadmaps')
            .select(`
        courses:roadmap_courses(
          course:courses(id, title, description)
        )
      `)
            .eq('id', roadmapId)
            .single();

        if (error) throw error;

        const courses = data?.courses?.map((rc: any) => rc.course).filter(Boolean) || [];
        return { success: true, data: courses };

    } catch (error) {
        console.error('Error fetching courses:', error);
        return { success: false, error: 'Failed to load courses' };
    }
}