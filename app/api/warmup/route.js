import { connectDB } from '@/lib/db'
import { NextResponse } from 'next/server'

// Keep connection alive with periodic ping
let pingInterval = null

export async function GET() {
  try {
    await connectDB()

    // Set up keep-alive ping every 4 minutes
    if (!pingInterval && typeof global !== 'undefined') {
      global.pingInterval = setInterval(async () => {
        try {
          const { connectDB } = await import('@/lib/db')
          await connectDB()
        } catch {}
      }, 4 * 60 * 1000)
    }

    return NextResponse.json({ success: true, message: 'DB connected' })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}