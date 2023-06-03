import type { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandler } from '@/lib/server-error-handler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { admin } = req.cookies;

  if (admin !== 'true') {
    throw new Error('Unauthorized user. Revalidation Not Allowed.');
  }

  await res.revalidate('/posts');
  res.status(200).json({ revalidated: true });
}

export default withErrorHandler(handler);
