import { http } from '../lib/http';

export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export type PostDto = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type CommentDto = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type CreatePostDto = {
  userId: number;
  title: string;
  body: string;
};

export type UpdatePostDto = {
  userId?: number;
  title?: string;
  body?: string;
};

export const postsApi = {
  list: () => http<PostDto[]>(`${API_BASE_URL}/posts`),
  get: (id: number) => http<PostDto>(`${API_BASE_URL}/posts/${id}`),
  create: (data: CreatePostDto) =>
    http<PostDto>(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data),
    }),
  update: (id: number, data: UpdatePostDto) =>
    http<PostDto>(`${API_BASE_URL}/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data),
    }),
  remove: (id: number) =>
    http<Record<string, never>>(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
    }),
};

export const commentsApi = {
  listByPost: (postId: number) =>
    http<CommentDto[]>(`${API_BASE_URL}/posts/${postId}/comments`),
};

export type UserDto = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export const usersApi = {
  list: () => http<UserDto[]>(`${API_BASE_URL}/users`),
};
