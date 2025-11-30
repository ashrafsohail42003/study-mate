'use client'

import Link from 'next/link'
import {
    LayoutDashboard, ListTodo, Map, Database, GraduationCap, Settings, LogOut, Menu, X
} from 'lucide-react'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { logout } from '@/app/actions/auth'

// Define the type for navigation items
type NavItem = {
    name: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

// Define the navigation links and their icons
const navItems: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Tasks', href: '/dashboard/tasks', icon: ListTodo },
    { name: 'Roadmap', href: '/dashboard/roadmap', icon: Map },
    { name: 'Internal Storage', href: '/dashboard/storage', icon: Database },
    { name: 'Study Tracking', href: '/dashboard/tracking', icon: GraduationCap },
]

export function Sidebar({ userName }: { userName: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    const handleLogout = async () => {
        await logout()
    }

    const NavLink = ({ item }: { item: NavItem }) => {
        const isActive = pathname === item.href
        return (
            <Link
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-xl transition-colors duration-200 ${isActive
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                    }`}
                onClick={() => setIsOpen(false)}
            >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
            </Link>
        )
    }

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-indigo-600 text-white rounded-lg shadow-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Sidebar Structure */}
            <aside
                className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-white border-r border-gray-200 p-6 flex flex-col z-30`}
            >
                {/* Logo and Greeting */}
                <div className="mb-8 pb-4 border-b border-gray-100">
                    <h2 className="text-xl font-extrabold text-indigo-700">StudyMate</h2>
                    <p className="text-sm text-gray-500 mt-1">Hello, {userName}</p>
                </div>

                {/* Main Navigation */}
                <nav className="flex-grow space-y-2">
                    {navItems.map((item) => (
                        <NavLink key={item.name} item={item} />
                    ))}
                    {/* Settings Link */}
                    <Link
                        href="/dashboard/settings"
                        className={`flex items-center gap-3 p-3 rounded-xl transition-colors duration-200 ${pathname === '/dashboard/settings'
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        onClick={() => setIsOpen(false)}
                    >
                        <Settings className="w-5 h-5" />
                        <span className="font-medium">Settings</span>
                    </Link>
                </nav>

                {/* Logout Button */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Log Out</span>
                    </button>
                </div>
            </aside>
            {/* Overlay for mobile view */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    )
}