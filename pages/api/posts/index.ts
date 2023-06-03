import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import dbConnect from '@/lib/mongoose';
import Posts from '@/models/Posts';
import { withErrorHandler } from '@/lib/server-error-handler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  if (method === 'POST') {
    const result = await Posts.create(req.body);
    res.status(200).json(result);
  }

  if (method === 'PUT') {
    const { _id, ...rest } = req.body;

    await Posts.updateOne({ _id: new ObjectId(_id) }, rest);

    res.status(200).end();
  }

  if (method === 'DELETE') {
    await Posts.deleteOne({ _id: 1234 });

    res.status(200).end();
  }
}

export default withErrorHandler(handler);
