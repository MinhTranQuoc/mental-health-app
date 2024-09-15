import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NovelResponseDto } from '../../interfaces/NovelResponseDto ';
import { Page } from '../../interfaces/Page'; 

export const novelApi = createApi({
  reducerPath: 'novelApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/novel' }),
  endpoints: (builder) => ({
    getAllNovels: builder.query<Page<NovelResponseDto>, { page: number, size: number }>({
      query: ({ page, size }) => `novels?page=${page}&size=${size}`,
    }),
  }),
});

export const { useGetAllNovelsQuery } = novelApi;
