import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import { Snippet } from '@/models/Snippet.model'
import { User } from '@/models/User.model'

// GET — get single snippet
export async function GET(req, { params }) {
  try {
    const session = await auth()
    await connectDB()

    const snippet = await Snippet.findById(params.id)
    if (!snippet) {
      return NextResponse.json(
        { success: false, error: { message: 'Snippet not found' } },
        { status: 404 }
      )
    }

    // Allow public snippets without auth
    if (!snippet.isPublic && (!session || snippet.userId.toString() !== session.user.id)) {
      return NextResponse.json(
        { success: false, error: { message: 'Unauthorized' } },
        { status: 401 }
      )
    }

    return NextResponse.json({ success: true, data: snippet })

  } catch (error) {
    console.error('[GET /api/snippets/:id]', error)
    return NextResponse.json(
      { success: false, error: { message: 'Something went wrong' } },
      { status: 500 }
    )
  }
}

// PATCH — update snippet
export async function PATCH(req, { params }) {
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

    const body = await req.json()
    const updated = await Snippet.findByIdAndUpdate(
      params.id,
      { ...body, updatedAt: new Date() },
      { new: true }
    )

    return NextResponse.json({ success: true, data: updated })

  } catch (error) {
    console.error('[PATCH /api/snippets/:id]', error)
    return NextResponse.json(
      { success: false, error: { message: 'Something went wrong' } },
      { status: 500 }
    )
  }
}

// DELETE — delete snippet
export async function DELETE(req, { params }) {
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

    await Snippet.findByIdAndDelete(params.id)

    // Update user stats
    await User.findByIdAndUpdate(session.user.id, {
      $inc: { 'stats.snippetsCount': -1 }
    })

    return NextResponse.json({ success: true, data: { message: 'Snippet deleted' } })

  } catch (error) {
    console.error('[DELETE /api/snippets/:id]', error)
    return NextResponse.json(
      { success: false, error: { message: 'Something went wrong' } },
      { status: 500 }
    )
  }
}