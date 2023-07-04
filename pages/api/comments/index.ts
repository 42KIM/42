import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongoose';
import { withErrorHandler } from '@/lib/server-error-handler';
import Comments from '@/models/Comments';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  if (method === 'GET') {
    const { postId } = req.query;

    const result = await Comments.find({ postId });

    res.status(200).json(result);
  }

  if (method === 'POST') {
    const result = await Comments.create(req.body);

    res.status(200).json(result);
  }

  if (method === 'PUT') {
    const { _id, content, isEdited } = req.body;

    await Comments.updateOne({ _id: new ObjectId(_id) }, { content, isEdited });

    res.status(200).end();
  }

  if (method === 'DELETE') {
    await Comments.deleteOne({ _id: new ObjectId(req.body._id) });

    res.status(200).end();
  }
}

export default withErrorHandler(handler);
