import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, default: () => new Date().toISOString().split('T')[0] },
    priority: { type: String, enum: ['high', 'medium', 'normal', 'low'], default: 'normal' },
    stage: { type: String, enum: ['todo', 'in progress', 'completed'], default: 'todo' },
    team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    subtasks: [
      {
        title: { type: String, required: true },
        date: { type: String, default: () => new Date().toISOString().split('T')[0] },
        tag: { type: String, default: 'General' },
        isCompleted: { type: Boolean, default: false }
      }
    ],
    assets: [String],
    isTrashed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Task', taskSchema);
