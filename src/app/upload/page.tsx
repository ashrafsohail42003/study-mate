'use client'

import { useState } from 'react'
import { Upload, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
            setResult(null)
        }
    }

    const handleUpload = async () => {
        if (!file) return

        setUploading(true)
        setResult(null)

        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            const data = await response.json()

            if (response.ok) {
                setResult({ success: true, message: 'File uploaded to Telegram successfully!' })
                setFile(null)
            } else {
                setResult({ success: false, message: data.error || 'Upload failed' })
            }
        } catch (error) {
            setResult({ success: false, message: 'Network error occurred' })
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <Link href="/" className="text-indigo-600 hover:text-indigo-700 mb-4 inline-block">
                            ← Back to Home
                        </Link>
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
                            Upload to Telegram
                        </h1>
                        <p className="text-gray-600">
                            Upload your files to Telegram for free cloud storage
                        </p>
                    </div>

                    {/* Upload Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        {/* File Input */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Select File
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-3 file:px-6
                    file:rounded-xl file:border-0
                    file:text-sm file:font-semibold
                    file:bg-gradient-to-r file:from-indigo-600 file:to-purple-600
                    file:text-white
                    hover:file:opacity-90
                    file:cursor-pointer
                    cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* File Info */}
                        {file && (
                            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                                <p className="text-sm text-gray-600">Selected file:</p>
                                <p className="font-semibold text-gray-800">{file.name}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                        )}

                        {/* Upload Button */}
                        <button
                            onClick={handleUpload}
                            disabled={!file || uploading}
                            className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200
                ${!file || uploading
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl hover:scale-105'
                                }`}
                        >
                            {uploading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-5 h-5" />
                                    Upload to Telegram
                                </>
                            )}
                        </button>

                        {/* Result Message */}
                        {result && (
                            <div
                                className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${result.success
                                    ? 'bg-green-50 text-green-700 border border-green-200'
                                    : 'bg-red-50 text-red-700 border border-red-200'
                                    }`}
                            >
                                {result.success ? (
                                    <CheckCircle className="w-5 h-5" />
                                ) : (
                                    <XCircle className="w-5 h-5" />
                                )}
                                <p className="font-medium">{result.message}</p>
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="mt-8 p-6 bg-indigo-50 rounded-xl border border-indigo-100">
                        <h3 className="font-semibold text-indigo-900 mb-2">How it works</h3>
                        <ul className="space-y-2 text-sm text-indigo-700">
                            <li>✓ Your files are uploaded to Telegram Bot</li>
                            <li>✓ Get a unique file ID for later retrieval</li>
                            <li>✓ Free unlimited cloud storage</li>
                            <li>✓ Secure and fast delivery</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
