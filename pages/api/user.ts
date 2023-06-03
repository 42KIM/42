import type { NextApiRequest, NextApiResponse } from 'next';
import { axiosInstance as _request } from '@/lib/axios';
import { withErrorHandler } from '@/lib/server-error-handler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    const { token } = req.cookies;
    const { data } = await _request({
      method: 'GET',
      url: 'https://api.github.com/user',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    res.setHeader('Set-Cookie', `admin=${data.login === process.env.GITHUB_ADMIN_USER}; path=/;`);
    res.status(200).json(Object.assign(data, {
      isAdmin: data.login === process.env.GITHUB_ADMIN_USER,
    }));
  }
}

export default withErrorHandler(handler);
