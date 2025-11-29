import TelegramBot from 'node-telegram-bot-api'

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, { polling: false })
const chatId = process.env.TELEGRAM_CHAT_ID!

export async function uploadFile(fileBuffer: Buffer, filename: string) {
    try {
        const message = await bot.sendDocument(
            chatId,
            fileBuffer,
            {},
            { filename }
        )

        return {
            success: true,
            file_id: message.document?.file_id,
            file_size: message.document?.file_size
        }
    } catch (error) {
        console.error('Telegram upload error:', error)
        return {
            success: false,
            error: 'Failed to upload file'
        }
    }
}

export async function getFileUrl(fileId: string) {
    try {
        const file = await bot.getFile(fileId)
        const fileUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.file_path}`

        return {
            success: true,
            url: fileUrl
        }
    } catch (error) {
        console.error('Telegram get file error:', error)
        return {
            success: false,
            error: 'Failed to get file URL'
        }
    }
}

export async function downloadFile(fileId: string) {
    try {
        const fileUrlResult = await getFileUrl(fileId)

        if (!fileUrlResult.success || !fileUrlResult.url) {
            throw new Error('Could not get file URL')
        }

        const response = await fetch(fileUrlResult.url)
        const arrayBuffer = await response.arrayBuffer()

        return {
            success: true,
            buffer: Buffer.from(arrayBuffer)
        }
    } catch (error) {
        console.error('Telegram download error:', error)
        return {
            success: false,
            error: 'Failed to download file'
        }
    }
}
