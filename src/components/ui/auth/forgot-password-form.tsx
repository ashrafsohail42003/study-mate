'use client'

import { forgotPassword } from '@/app/actions/auth'
import { useFormStatus } from 'react-dom'
import { useState } from 'react'

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
            {pending ? 'جاري الإرسال...' : 'إرسال رابط إعادة التعيين'}
        </button>
    )
}

export function ForgotPasswordForm() {
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    async function handleSubmit(formData: FormData) {
        setMessage(null)
        const result = await forgotPassword(formData)

        if (result.success) {
            setMessage({ type: 'success', text: result.message || 'تم الإرسال بنجاح' })
        } else {
            setMessage({ type: 'error', text: result.error || 'حدث خطأ' })
        }
    }

    return (
        <form action={handleSubmit} className="space-y-4">
            {message && (
                <div
                    className={`px-4 py-3 rounded-xl text-sm ${message.type === 'success'
                            ? 'bg-green-50 border border-green-200 text-green-700'
                            : 'bg-red-50 border border-red-200 text-red-700'
                        }`}
                >
                    {message.text}
                </div>
            )}

            <div>
                <label htmlFor="email" className="block font-semibold mb-2 text-gray-700">
                    البريد الإلكتروني
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@domain.com"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    required
                />
                <p className="text-sm text-gray-500 mt-2">
                    سنرسل لك رابط إعادة تعيين كلمة المرور
                </p>
            </div>

            <SubmitButton />
        </form>
    )
}
