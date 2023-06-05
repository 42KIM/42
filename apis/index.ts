import { axiosInstance as _request } from '@/lib/axios';
import type { CommentCreateRequest, CommentDeleteRequest, CommentUpdateRequest, CommentLikeRequest } from '@/models/Comments';
import type { PostCreateRequest, PostDeleteRequest, PostUpdateRequest } from '@/models/Posts';

export const APIService = {
  createPosts: async (payload: PostCreateRequest) => {
    await _request({
      method: 'POST',
      url: '/api/posts',
      data: payload,
    });
  },
  deletePosts: async (payload: PostDeleteRequest) => {
    await _request({
      method: 'DELETE',
      url: '/api/posts',
      data: payload,
    });
  },
  updatePosts: async (payload: PostUpdateRequest) => {
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
  revalidatePostsDetail: async (payload: { id: string }) => {
    await _request({
      method: 'POST',
      url: '/api/revalidate/posts/detail',
      data: payload,
    });
  },
  getComments: async (payload: string) => {
    const { data } = await _request({
      method: 'GET',
      url: '/api/comments',
      params: {
        postId: payload,
      },
    });

    return data;
  },
  createComments: async (payload: CommentCreateRequest) => {
    await _request({
      method: 'POST',
      url: '/api/comments',
      data: payload,
    });
  },
  updateComments: async (payload: CommentUpdateRequest) => {
    await _request({
      method: 'PUT',
      url: '/api/comments',
      data: payload,
    });
  },
  deleteComments: async (payload: CommentDeleteRequest) => {
    await _request({
      method: 'DELETE',
      url: '/api/comments',
      data: payload,
    });
  },
  likeComments: async (payload: CommentLikeRequest) => {
    await _request({
      method: 'PUT',
      url: '/api/comments/likes',
      data: payload,
    });
  },
  createToken: async (payload: { code: string }) => {
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
