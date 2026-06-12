import mongoose from 'mongoose'

const ExecutionSchema = new mongoose.Schema({
  userId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  snippetId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Snippet', default: null },
  language:   { type: String, required: true },
  code:       { type: String, required: true },
  stdin:      { type: String, default: '' },
  stdout:     { type: String, default: '' },
  stderr:     { type: String, default: '' },
  status:     { type: String, required: true },
  executionTime: { type: Number, default: 0 },
  memoryUsed:    { type: Number, default: 0 },
}, { timestamps: true })

export const Execution = mongoose.models.Execution || mongoose.model('Execution', ExecutionSchema)