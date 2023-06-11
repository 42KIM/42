import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongoose';
import { withErrorHandler } from '@/lib/server-error-handler';
import Likes from '@/models/Likes';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  if (method === 'GET') {
    const { postId } = req.query;

    const result = await Likes.findOne({ postId });

    res.status(200).json(result);
  }

  if (method === 'PUT') {
    const { postId, authors } = req.body;

    await Likes.updateOne({ postId }, { authors });

    res.status(200).end();
  }
}

export default withErrorHandler(handler);
