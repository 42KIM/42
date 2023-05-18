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

export type Post = InferSchemaType<typeof PostsSchema> & { _id: Schema.Types.ObjectId | string };

export default mongoose.models.Posts || mongoose.model('Posts', PostsSchema);
