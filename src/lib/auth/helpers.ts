import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { Tables } from '@/types/database.types'

// Type alias for profile row from database
type Profile = Tables<'profiles'>

export async function getCurrentUser() {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        return null
    }

    return user
}

export async function requireAuth() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    return user
}

export async function requireVerifiedEmail() {
    const user = await requireAuth()

    if (!user.email_confirmed_at) {
        redirect('/verify-email')
    }

    return user
}

export async function isAuthenticated(): Promise<boolean> {
    const user = await getCurrentUser()
    return user !== null
}

export async function getUserMetadata() {
    const user = await getCurrentUser()

    if (!user) {
        return null
    }

    const supabase = await createClient()

    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name,student_id,university_id,department,avatar_url')
        .eq('id', user.id)
        .single()

    return {
        id: user.id,
        email: user.email,
        fullName: profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || '',
        studentId: profile?.student_id || null,
        universityId: profile?.university_id || null,
        department: profile?.department || null,
        avatarUrl: profile?.avatar_url || null,
        emailVerified: user.email_confirmed_at !== null,
        createdAt: user.created_at,
    }
}
