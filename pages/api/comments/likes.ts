import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongoose';
import { withErrorHandler } from '@/lib/server-error-handler';
import Comments from '@/models/Comments';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  if (method === 'PUT') {
    const { _id, likes } = req.body;

    await Comments.updateOne({ _id: new ObjectId(_id) }, { likes });

    res.status(200).end();
  }
}

export default withErrorHandler(handler);
