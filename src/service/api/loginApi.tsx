import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';// Auth slice bạn đã tạo

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/auth', // Địa chỉ backend
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage
      if (token) {
        headers.set('Authorization', `Bearer ${token}`); // Gửi token trong header Authorization
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials, // Gửi thông tin đăng nhập
      }),
    }),
  }),
});

// Xuất mutation
export const { useLoginMutation } = authApi;
