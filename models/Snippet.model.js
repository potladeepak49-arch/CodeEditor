import mongoose from 'mongoose'

const SnippetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', required: true, index: true,
  },
  title:       { type: String, required: true, maxlength: 120 },
  description: { type: String, maxlength: 500, default: '' },
  language:    { type: String, required: true },
  code:        { type: String, required: true, maxlength: 50000 },
  tags:        [{ type: String, lowercase: true }],
  isPublic:    { type: Boolean, default: false },
  isFavorite:  { type: Boolean, default: false },
 shareId: { type: String, sparse: true, unique: true, default: () => Math.random().toString(36).substring(2, 10) },
  executionCount:  { type: Number, default: 0 },
  lastExecutedAt:  { type: Date, default: null },
}, { timestamps: true })

export const Snippet = mongoose.models.Snippet || mongoose.model('Snippet', SnippetSchema)