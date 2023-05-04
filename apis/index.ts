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
  deletePosts: async (payload) => {
    await _request({
      method: 'DELETE',
      url: '/api/posts',
      data: payload,
    });
  },
  updatePosts: async (payload) => {
    await _request({
      method: 'PUT',
      url: '/api/posts',
      data: payload,
    });
  },
  createToken: async (payload) => {
    await _request({
      method: 'POST',
      url: '/api/auth/token-create',
      data: payload,
    });
  },
  getUser: async () => {
    const { data } = await _request({
      method: 'GET',
      url: '/api/user',
    });

    return data;
  },
  signOut: async () => {
    await _request({
      method: 'GET',
      url: '/api/auth/sign-out',
    });
  },
};
