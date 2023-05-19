import { axiosInstance as _request } from '@/lib/axios';

export const APIService = {
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
  revalidatePosts: async () => {
    await _request({
      method: 'GET',
      url: '/api/revalidate/posts',
    });
  },
  revalidatePostsDetail: async (payload) => {
    await _request({
      method: 'POST',
      url: '/api/revalidate/posts/detail',
      data: payload,
    });
  },
  getComments: async (payload) => {
    const { data } = await _request({
      method: 'GET',
      url: '/api/comments',
      params: {
        postId: payload,
      },
    });

    return data;
  },
  createComments: async (payload) => {
    await _request({
      method: 'POST',
      url: '/api/comments',
      data: payload,
    });
  },
  updateComments: async (payload) => {
    await _request({
      method: 'PUT',
      url: '/api/comments',
      data: payload,
    });
  },
  deleteComments: async (payload) => {
    await _request({
      method: 'DELETE',
      url: '/api/comments',
      data: payload,
    });
  },
  likeComments: async (payload) => {
    await _request({
      method: 'PUT',
      url: '/api/comments/likes',
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
