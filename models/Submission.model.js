import mongoose from 'mongoose'

const SubmissionSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  challengeId: { type: String, required: true, index: true },
  language:    { type: String, required: true },
  code:        { type: String, required: true },
  status:      {
    type: String,
    enum: ['accepted', 'wrong_answer', 'time_limit', 'runtime_error', 'compile_error'],
    required: true,
  },
  passedTestCases: { type: Number, default: 0 },
  totalTestCases:  { type: Number, default: 0 },
  executionTime:   { type: Number, default: 0 },
  memoryUsed:      { type: Number, default: 0 },
}, { timestamps: true })

export const Submission = mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema)