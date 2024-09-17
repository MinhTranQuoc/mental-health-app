import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NovelResponseDto } from "../../interfaces/NovelResponseDto";
import { Page } from "../../interfaces/Page";

export const novelApi = createApi({
  reducerPath: "novelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/novel",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage
      if (token) {
        headers.set('Authorization', `Bearer ${token}`); // Thêm token vào tiêu đề Authorization
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllNovels: builder.query<
      Page<NovelResponseDto>,
      { page: number; size: number }
    >({
      query: ({ page, size }) => `novels?page=${page}&size=${size}`,
      transformResponse: (response: { data: Page<NovelResponseDto> }) =>
        response.data,
    }),
    getHotNovels: builder.query<NovelResponseDto[], void>({
      query: () => `hot-novel`,
      transformResponse: (response: { data: NovelResponseDto[] }) =>
        response.data,
    }),
  }),
});

export const { useGetAllNovelsQuery, useGetHotNovelsQuery } = novelApi;