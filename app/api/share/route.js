import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import { Snippet } from '@/models/Snippet.model'

function generateShareId() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export async function POST(req) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { success: false, error: { message: 'Unauthorized' } },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { snippetId } = body

    if (!snippetId) {
      return NextResponse.json(
        { success: false, error: { message: 'Snippet ID is required' } },
        { status: 400 }
      )
    }

    await connectDB()

    const snippet = await Snippet.findById(snippetId)
    if (!snippet) {
      return NextResponse.json(
        { success: false, error: { message: 'Snippet not found' } },
        { status: 404 }
      )
    }

    if (snippet.userId.toString() !== session.user.id) {
      return NextResponse.json(
        { success: false, error: { message: 'Unauthorized' } },
        { status: 401 }
      )
    }

    // Generate share ID if not exists
    let shareId = snippet.shareId
    if (!shareId) {
      shareId = generateShareId()
      await Snippet.findByIdAndUpdate(snippetId, {
        shareId,
        isPublic: true,
      })
    }

    const shareUrl = `${process.env.NEXTAUTH_URL}/s/${shareId}`

    return NextResponse.json({
      success: true,
      data: { shareId, shareUrl }
    })

  } catch (error) {
    console.error('[POST /api/share]', error)
    return NextResponse.json(
      { success: false, error: { message: 'Something went wrong' } },
      { status: 500 }
    )
  }
}