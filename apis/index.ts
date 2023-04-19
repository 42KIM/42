import { axiosInstance as _request } from '@/lib/axios';

export const APIService = {
  getPosts: async () => {
    const { data } = await _request({
      method: 'GET',
      url: '/api/posts',
    });

    return data;
  },
  createPosts: async (payload) => {
    await _request({
      method: 'POST',
      url: '/api/posts',
      data: payload,
    });
  },
};
