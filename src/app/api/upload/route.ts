import { NextRequest, NextResponse } from 'next/server'
import { uploadFile } from '@/lib/telegram/bot'

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            )
        }

        // Convert File to Buffer
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        // Upload to Telegram
        const result = await uploadFile(buffer, file.name)

        if (!result.success || !result.file_id) {
            return NextResponse.json(
                { error: 'Failed to upload to Telegram' },
                { status: 500 }
            )
        }

        return NextResponse.json({
            success: true,
            file_id: result.file_id,
            file_name: file.name,
            file_size: file.size,
            message: 'File uploaded successfully to Telegram'
        })

    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
