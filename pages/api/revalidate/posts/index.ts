import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for secret to confirm this is a valid request
  // if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
  //   res.status(401).json({ message: 'Invalid token' }); return;
  // }

  try {
    await res.revalidate('/posts');
    res.status(200).json({ revalidated: true });
  } catch (err) {
    res.status(500).send('Error revalidating');
  }
}
