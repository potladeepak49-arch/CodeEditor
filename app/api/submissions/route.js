import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import { Submission } from '@/models/Submission.model'
import { User } from '@/models/User.model'

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
    const {
      challengeId, language, code, status,
      passedTestCases, totalTestCases,
      executionTime, memoryUsed,
    } = body

    await connectDB()

    const submission = await Submission.create({
      userId:          session.user.id,
      challengeId,
      language,
      code,
      status,
      passedTestCases: passedTestCases ?? 0,
      totalTestCases:  totalTestCases  ?? 0,
      executionTime:   executionTime   ?? 0,
      memoryUsed:      memoryUsed      ?? 0,
    })

    // Update user stats if accepted
    if (status === 'accepted') {
      // Check if this challenge was already solved
      const prevAccepted = await Submission.findOne({
        userId:      session.user.id,
        challengeId,
        status:      'accepted',
        _id:         { $ne: submission._id },
      })

      if (!prevAccepted) {
        await User.findByIdAndUpdate(session.user.id, {
          $inc: { 'stats.challengesSolved': 1 }
        })
      }
    }

    // Always increment execution count
    await User.findByIdAndUpdate(session.user.id, {
      $inc: { 'stats.executionsCount': 1 }
    })

    return NextResponse.json({ success: true, data: submission }, { status: 201 })

  } catch (error) {
    console.error('[POST /api/submissions]', error)
    return NextResponse.json(
      { success: false, error: { message: 'Something went wrong' } },
      { status: 500 }
    )
  }
}

export async function GET(req) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { success: false, error: { message: 'Unauthorized' } },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const challengeId = searchParams.get('challengeId')

    await connectDB()

    const query = { userId: session.user.id }
    if (challengeId) query.challengeId = challengeId

    const submissions = await Submission.find(query)
      .sort({ createdAt: -1 })
      .limit(20)

    return NextResponse.json({ success: true, data: submissions })

  } catch (error) {
    console.error('[GET /api/submissions]', error)
    return NextResponse.json(
      { success: false, error: { message: 'Something went wrong' } },
      { status: 500 }
    )
  }
}