import { getUserMetadata } from '@/lib/auth/helpers'
import { Sparkles } from 'lucide-react'

export default async function DashboardPage() {
    const userMeta = await getUserMetadata()

    // Determine the user's name using the full_name from getUserMetadata
    const displayName = userMeta?.fullName || userMeta?.email?.split('@')[0] || 'Student'

    // The rest of the content is the Dashboard body you provided, 
    // ensuring the greeting is translated and the structure is clean.

    return (
        <div className="max-w-4xl mx-auto">
            {/* Welcome Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome back, {displayName}! 👋
                </h1>
                <p className="text-gray-600">
                    Ready to continue your learning journey?
                </p>
            </div>

            {/* Quick Stats / Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold">Current Level</h3>
                    </div>
                    <p className="text-3xl font-bold">Level 1</p>
                    <p className="text-indigo-100 text-sm mt-1">Beginner Student</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="text-gray-500 font-medium mb-2">Total XP</h3>
                    <p className="text-3xl font-bold text-gray-900">0 XP</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="text-gray-500 font-medium mb-2">Study Streak</h3>
                    <p className="text-3xl font-bold text-gray-900">0 Days</p>
                </div>
            </div>

            {/* Info Message */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <p className="text-blue-800 text-center">
                    <span className="font-semibold">Dashboard Updated!</span>{' '}
                    Use the sidebar to navigate. Most links are currently placeholders.
                    Go to <span className="font-bold">Settings</span> to update your profile.
                </p>
            </div>
        </div>
    )
}