'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function markLessonComplete(lessonId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: 'Unauthorized' };
    }

    try {
        // Upsert progress
        const { error } = await supabase
            .from('user_lesson_progress')
            .upsert({
                user_id: user.id,
                lesson_id: lessonId,
                status: 'Completed',
                completed_at: new Date().toISOString(),
            }, {
                onConflict: 'user_id,lesson_id'
            });

        if (error) throw error;

        revalidatePath(`/lesson/${lessonId}`);
        revalidatePath('/myroadmap'); // Update roadmap progress if needed
        return { success: true };
    } catch (error) {
        console.error('Error marking lesson complete:', error);
        return { success: false, error: 'Failed to update progress' };
    }
}
