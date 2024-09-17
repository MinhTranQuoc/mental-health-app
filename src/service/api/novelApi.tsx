import { createApi, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { NovelResponseDto } from "../../interfaces/NovelResponseDto";
import { Page } from "../../interfaces/Page";
import { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";
import { logout } from "../../components/User/authSlice";


// Tạo baseQuery với xử lý lỗi và logout
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8080/novel",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token'); // Lấy token từ state
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  const result = await baseQuery(args, api, extraOptions);

  // Kiểm tra nếu có lỗi và là lỗi 401
  if (result.error && result.error.status === 401) {
    api.dispatch(logout());  // Thực hiện hành động logout

  }

  return result;
};

// Tạo API với baseQuery mới
export const novelApi = createApi({
  reducerPath: "novelApi",
  baseQuery: baseQueryWithReauth,
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
