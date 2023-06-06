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
  likes: { type: Array, required: true, default: [] },
  isDeleted: { type: Boolean, required: false, default: false },
  isEdited: { type: Boolean, required: false, default: false },
}, {
  timestamps: true,
});

export type Comment = InferSchemaType<typeof CommentsSchema> & { _id: string };
export type CommentCreateRequest = Omit<Comment, '_id' | 'createdAt' | 'updatedAt'>;
export type CommentUpdateRequest = Partial<CommentCreateRequest> & { _id: string };
export type CommentDeleteRequest = Pick<Comment, '_id'>;
export type CommentLikeRequest = Pick<Comment, '_id'> & { likes: Array<string> };

export default mongoose.models.Comments || mongoose.model('Comments', CommentsSchema);
