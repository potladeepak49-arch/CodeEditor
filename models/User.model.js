import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: {
    type: String, required: true, unique: true,
    trim: true, minlength: 3, maxlength: 30,
    lowercase: true,
  },
  email: {
    type: String, required: true, unique: true,
    lowercase: true, trim: true,
  },
  passwordHash: { type: String, required: true },
  name:         { type: String, required: true, trim: true },
  avatar:       { type: String, default: null },
  bio:          { type: String, maxlength: 280, default: '' },
  role:         { type: String, enum: ['user', 'admin'], default: 'user' },
  preferences: {
    theme:    { type: String, default: 'vs-dark' },
    fontSize: { type: Number, default: 14, min: 12, max: 24 },
    language: { type: String, default: 'javascript' },
    tabSize:  { type: Number, default: 2, enum: [2, 4] },
  },
  stats: {
    snippetsCount:    { type: Number, default: 0 },
    executionsCount:  { type: Number, default: 0 },
    challengesSolved: { type: Number, default: 0 },
    lastActiveAt:     { type: Date, default: Date.now },
  },
}, { timestamps: true })

export const User = mongoose.models.User || mongoose.model('User', UserSchema)