import type { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandler } from '@/lib/server-error-handler';

function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    res.setHeader('Set-Cookie', [
      'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
      'admin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
    ]);
    res.status(200).end();
  }
}

export default withErrorHandler(handler);
