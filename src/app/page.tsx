import Link from 'next/link'
import { BookOpen, UserPlus, Sparkles } from 'lucide-react'
import { getCurrentUser } from '@/lib/auth/helpers'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  // Check if user is authenticated
  const user = await getCurrentUser()

  // If user is authenticated and verified, redirect to dashboard
  if (user && user.email_confirmed_at) {
    redirect('/dashboard')
  }

  // If user is authenticated but not verified, redirect to verify email
  if (user && !user.email_confirmed_at) {
    redirect('/auth/verify-email')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo/Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-full">
                <BookOpen className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
            StudyMate
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-4">
            Your Personal Study Assistant
          </p>

          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            Organize your university courses, develop your technical skills, and achieve academic excellence with StudyMate
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Start Now - For Free
            </Link>

            <Link
              href="/auth/login"
              className="px-8 py-4 bg-white border-2 border-indigo-600 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Login
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 mt-20 text-center text-gray-500 border-t border-gray-100">
        <p className="flex items-center justify-center gap-2">
          Made with <Sparkles className="w-4 h-4 text-purple-500" /> for students everywhere
        </p>
      </footer>
    </div>
  )
}
