import type { NextApiRequest, NextApiResponse } from 'next';
import { axiosInstance as _request } from '@/lib/axios';
import { withErrorHandler } from '@/lib/server-error-handler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'POST') {
    const { token } = req.cookies;
    const { title, body } = req.body;

    const { data } = await _request({
      method: 'POST',
      url: 'https://api.github.com/repos/42KIM/blog/issues',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        title,
        body,
      },
    });

    res.status(200).json({
      created: true,
      url: data.html_url,
    });
  }
}

export default withErrorHandler(handler);
