import type { InferSchemaType } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

const PostsSchema = new Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  content: { type: String, required: true },
  tags: [ String ],
  category: String,
}, {
  timestamps: true,
});

export type Post = InferSchemaType<typeof PostsSchema> & { _id: string };
export type PostCreateRequest = Omit<Post, '_id' | 'createdAt' | 'updatedAt'>;
export type PostUpdateRequest = Partial<PostCreateRequest> & { _id: string };
export type PostDeleteRequest = Pick<Post, '_id'>;

export default mongoose.models.Posts || mongoose.model('Posts', PostsSchema);
