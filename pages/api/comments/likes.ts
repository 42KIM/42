import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import dbConnect from '@/lib/mongoose';
import Comments from '@/models/Comments';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  if (method === 'PUT') {
    const { _id, likes } = req.body;

    await Comments.updateOne({ _id: new ObjectId(_id) }, { likes });

    res.status(200).end();
  }
}
