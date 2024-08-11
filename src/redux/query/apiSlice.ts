import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetBerriesResponse, GetBerryByIdResponse } from '../types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.pokemontcg.io/v2' }),
  endpoints: (builder) => ({
    getBerries: builder.query<
      GetBerriesResponse,
      { page: number; limit: number; query: string }
    >({
      query: ({ page, limit, query }) => {
        if (query) {
          return `cards/?page=${page}&pageSize=${limit}&q=name:${query}*`;
        }
        return `cards/?page=${page}&pageSize=${limit}`;
      },
    }),
    getBerryById: builder.query<GetBerryByIdResponse, string>({
      query: (name: string) => {
        return `cards/${name}`;
      },
    }),
  }),
});

export const { useGetBerriesQuery, useGetBerryByIdQuery } = apiSlice;

export type UseGetBerriesQuery = ReturnType<typeof useGetBerriesQuery>;
export type UseGetBerryByIdQuery = ReturnType<typeof useGetBerryByIdQuery>;
