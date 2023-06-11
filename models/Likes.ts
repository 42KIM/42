import type { InferSchemaType } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

interface ILikeAuthor {
  author: string;
  authorId: number;
}

interface ILikes extends mongoose.Document {
  postId: string;
  authors: ILikeAuthor[];
}

const LikesSchema = new Schema<ILikes>({
  postId: { type: String, required: true },
  authors: { type: [ { author: String, authorId: Number } ], required: true },
}, {
  timestamps: true,
});

export type Likes = InferSchemaType<typeof LikesSchema>;
export type PostsLikeRequest = Pick<Likes, 'postId' | 'authors'>;

export default mongoose.models.Likes || mongoose.model('Likes', LikesSchema);
// TODO - schema type 수정
