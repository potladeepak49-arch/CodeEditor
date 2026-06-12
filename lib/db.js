import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local')
}

let cached = global.mongoose ?? { conn: null, promise: null }
global.mongoose = cached

export async function connectDB() {
  if (cached.conn) {
    // Verify connection is still alive
    if (mongoose.connection.readyState === 1) {
      return cached.conn
    }
    cached.conn    = null
    cached.promise = null
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands:           false,
      maxPoolSize:              10,
      minPoolSize:              2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS:          45000,
      connectTimeoutMS:         10000,
      heartbeatFrequencyMS:     10000,
    }
    cached.promise = mongoose.connect(MONGODB_URI, opts)
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}