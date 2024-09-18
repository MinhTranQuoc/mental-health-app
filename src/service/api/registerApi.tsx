
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const registerApi = createApi({
  reducerPath: 'registerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/auth', // Địa chỉ backend
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData, // Gửi thông tin đăng ký
      }),
    }),
  }),
});

// Xuất mutation
export const { useRegisterMutation } = registerApi;