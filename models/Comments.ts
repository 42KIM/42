import type { InferSchemaType } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

const CommentsSchema = new Schema({
  author: { type: String, required: true },
  postId: { type: String, required: true },
  content: { type: String, required: true },
  parentId: { type: String, required: false, default: null },
  children: { type: Array, required: false, default: [] },
}, {
  timestamps: true,
});

export type Comment = InferSchemaType<typeof CommentsSchema> & { _id: Schema.Types.ObjectId | string };

export default mongoose.models.Comments || mongoose.model('Comments', CommentsSchema);
