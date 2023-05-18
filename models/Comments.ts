import type { InferSchemaType } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

const CommentsSchema = new Schema({
  postId: { type: String, required: true },
  content: { type: String, required: true },
  parentId: { type: String, required: false, default: null },
  children: { type: Array, required: false, default: [] },
  author: { type: String, required: true },
  authorId: { type: Number, required: true },
  authorAvatar: { type: String, required: true },
  authorUrl: { type: String, required: true },
  isDeleted: { type: Boolean, required: false, default: false },
  isEdited: { type: Boolean, required: false, default: false },
}, {
  timestamps: true,
});

export type Comment = InferSchemaType<typeof CommentsSchema> & { _id: string };

export default mongoose.models.Comments || mongoose.model('Comments', CommentsSchema);
