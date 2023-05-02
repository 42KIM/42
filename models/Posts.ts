import type { InferSchemaType } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

const PostsSchema = new Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  content: { type: String, required: true },
  tags: Array<String>,
  category: String,
}, {
  timestamps: true,
});

export type Posts = InferSchemaType<typeof PostsSchema>;

export default mongoose.models.Posts || mongoose.model('Posts', PostsSchema);
