import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import dbConnect from '@/lib/mongoose';
import Posts from '@/models/Posts';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  if (method === 'GET') {
    const result = await Posts.find({})
      .sort({ date: -1 });

    res.status(200).json(result);
  }

  if (method === 'POST') {
    const result = await Posts.create(req.body);

    res.status(200).json(result);
  }

  if (method === 'DELETE') {
    const { deletedCount } = await Posts.deleteOne({ _id: new ObjectId(req.body._id) });

    // if (deletedCount === 1)
    res.status(200).end();
    // TODO - 삭제 제대로 안 됐을 때 에러 처리
  }

  // TODO - 수정 API
}
