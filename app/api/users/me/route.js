import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import { User } from '@/models/User.model'

export async function GET() {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { success: false, error: { message: 'Unauthorized' } },
        { status: 401 }
      )
    }

    await connectDB()

    const user = await User.findById(session.user.id).select('-passwordHash')
    if (!user) {
      return NextResponse.json(
        { success: false, error: { message: 'User not found' } },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: user })

  } catch (error) {
    console.error('[GET /api/users/me]', error)
    return NextResponse.json(
      { success: false, error: { message: 'Something went wrong' } },
      { status: 500 }
    )
  }
  // At the end of GET handler, replace the return:
return NextResponse.json(
  { success: true, data: user },
  {
    headers: {
      'Cache-Control': 'private, max-age=60, stale-while-revalidate=120',
    }
  }
)
}

export async function PATCH(req) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { success: false, error: { message: 'Unauthorized' } },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { name, bio, preferences } = body

    await connectDB()

    const updated = await User.findByIdAndUpdate(
      session.user.id,
      {
        ...(name && { name }),
        ...(bio !== undefined && { bio }),
        ...(preferences && { preferences }),
      },
      { new: true }
    ).select('-passwordHash')

    return NextResponse.json({ success: true, data: updated })

  } catch (error) {
    console.error('[PATCH /api/users/me]', error)
    return NextResponse.json(
      { success: false, error: { message: 'Something went wrong' } },
      { status: 500 }
    )
  }
}