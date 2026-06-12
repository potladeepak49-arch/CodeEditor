import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import { Snippet } from '@/models/Snippet.model'
import { User } from '@/models/User.model'

// GET — list user's snippets
export async function GET(req) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { success: false, error: { message: 'Unauthorized' } },
        { status: 401 }
      )
    }

    await connectDB()

    const { searchParams } = new URL(req.url)
    const language = searchParams.get('language')
    const favorite = searchParams.get('favorite')
    const search   = searchParams.get('search')

    const query = { userId: session.user.id }
    if (language && language !== 'all') query.language = language
    if (favorite === 'true') query.isFavorite = true
    if (search) query.title = { $regex: search, $options: 'i' }

    const snippets = await Snippet.find(query).sort({ updatedAt: -1 })

    return NextResponse.json({ success: true, data: snippets })

  } catch (error) {
    console.error('[GET /api/snippets]', error)
    return NextResponse.json(
      { success: false, error: { message: 'Something went wrong' } },
      { status: 500 }
    )
  }
  // At the end of GET handler, replace the return:
return NextResponse.json(
  { success: true, data: snippets },
  {
    headers: {
      'Cache-Control': 'private, max-age=30, stale-while-revalidate=60',
    }
  }
)
}

// POST — create snippet
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
    const { title, description, language, code, tags, isPublic } = body

    if (!title || !language || !code) {
      return NextResponse.json(
        { success: false, error: { message: 'Title, language and code are required' } },
        { status: 400 }
      )
    }

    await connectDB()

    const snippet = await Snippet.create({
      userId:      session.user.id,
      title,
      description: description ?? '',
      language,
      code,
      tags:        tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      isPublic:    isPublic ?? false,
    })

    // Update user stats
    await User.findByIdAndUpdate(session.user.id, {
      $inc: { 'stats.snippetsCount': 1 }
    })

    return NextResponse.json({ success: true, data: snippet }, { status: 201 })

  } catch (error) {
    console.error('[POST /api/snippets]', error)
    return NextResponse.json(
      { success: false, error: { message: 'Something went wrong' } },
      { status: 500 }
    )
  }
}