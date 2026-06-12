import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/db'
import { User } from '@/models/User.model'

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, username, email, password } = body

    if (!name || !username || !email || !password) {
      return NextResponse.json(
        { success: false, error: { message: 'All fields are required' } },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: { message: 'Password must be at least 8 characters' } },
        { status: 400 }
      )
    }

    await connectDB()

    const existingEmail = await User.findOne({ email: email.toLowerCase() })
    if (existingEmail) {
      return NextResponse.json(
        { success: false, error: { message: 'Email already registered' } },
        { status: 409 }
      )
    }

    const existingUsername = await User.findOne({ username: username.toLowerCase() })
    if (existingUsername) {
      return NextResponse.json(
        { success: false, error: { message: 'Username already taken' } },
        { status: 409 }
      )
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const user = await User.create({
      name,
      username:     username.toLowerCase(),
      email:        email.toLowerCase(),
      passwordHash,
    })

    return NextResponse.json({
      success: true,
      data: {
        id:       user._id.toString(),
        name:     user.name,
        username: user.username,
        email:    user.email,
      }
    }, { status: 201 })

  } catch (error) {
    console.error('[POST /api/register]', error)
    return NextResponse.json(
      { success: false, error: { message: 'Something went wrong' } },
      { status: 500 }
    )
  }
}
