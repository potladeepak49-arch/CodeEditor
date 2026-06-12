import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import { Snippet } from '@/models/Snippet.model'

export async function POST(req, { params }) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { success: false, error: { message: 'Unauthorized' } },
        { status: 401 }
      )
    }

    await connectDB()

    const snippet = await Snippet.findById(params.id)
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

    const updated = await Snippet.findByIdAndUpdate(
      params.id,
      { isFavorite: !snippet.isFavorite },
      { new: true }
    )

    return NextResponse.json({ success: true, data: updated })

  } catch (error) {
    console.error('[POST /api/snippets/:id/favorite]', error)
    return NextResponse.json(
      { success: false, error: { message: 'Something went wrong' } },
      { status: 500 }
    )
  }
}