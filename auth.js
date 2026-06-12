import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/db'
import { User } from '@/models/User.model'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email'    },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        await connectDB()

        const user = await User.findOne({ email: credentials.email.toLowerCase() })
        if (!user) {
          throw new Error('No account found with this email')
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash)
        if (!isValid) {
          throw new Error('Invalid password')
        }

        // Update last active
        await User.findByIdAndUpdate(user._id, {
          'stats.lastActiveAt': new Date()
        })

        return {
          id:       user._id.toString(),
          email:    user.email,
          name:     user.name,
          username: user.username,
          role:     user.role,
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id       = user.id
        token.username = user.username
        token.role     = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id       = token.id
        session.user.username = token.username
        session.user.role     = token.role
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    error:  '/login',
  },
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
})