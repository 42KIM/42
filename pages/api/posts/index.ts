import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    const client = await clientPromise;
    const result = await client.db('42_blog')
      .collection('posts')
      .find({})
      .sort({ date: -1 })
      .toArray();

    res.status(200).json(result);
  }

  if (method === 'POST') {
    const client = await clientPromise;
    const result = await client.db('42_blog')
      .collection('posts')
      .insertOne(req.body);

    res.status(200).json(result);
  }
}
