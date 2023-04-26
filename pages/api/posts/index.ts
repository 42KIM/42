import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const { method } = req;

  if (method === 'GET') {
    const result = await client.db('42_blog')
      .collection('posts')
      .find({})
      .sort({ date: -1 })
      .toArray();

    res.status(200).json(result);
  }

  if (method === 'POST') {
    const result = await client.db('42_blog')
      .collection('posts')
      .insertOne(req.body);

    res.status(200).json(result);
  }

  if (method === 'DELETE') {
    const { deletedCount } = await client.db('42_blog')
      .collection('posts')
      .deleteOne({ _id: new ObjectId(req.body._id) });

    // if (deletedCount === 1)
    res.status(200).end();
    // TODO - 삭제 제대로 안 됐을 때 에러 처리
  }
}
