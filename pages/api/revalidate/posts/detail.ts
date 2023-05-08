import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { admin } = req.cookies;

  if (admin !== 'true') {
    res.status(401).json({ message: 'Unauthorized user' });
  }

  const { id } = req.body;

  try {
    await res.revalidate(`/posts/${id}`);
    res.status(200).json({ revalidated: true });
  } catch (err) {
    res.status(500).send('Error revalidating');
  }
}
