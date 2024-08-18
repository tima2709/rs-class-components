import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetBerriesResponse, GetBerryByIdResponse } from '../types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2' }),
  endpoints: (builder) => ({
    getBerries: builder.query<
      GetBerriesResponse,
      { offset: number; limit: number; searchTerm: string }
    >({
      query: ({ offset, limit, searchTerm }) => {
        if (searchTerm) {
          return `berry/${searchTerm}`;
        }
        return `berry/?offset=${offset}&limit=${limit}`;
      },
    }),
    getBerryById: builder.query<GetBerryByIdResponse, string>({
      query: (name: string) => {
        return `berry/${name}`;
      },
    }),
  }),
});

export const { useGetBerriesQuery, useGetBerryByIdQuery } = apiSlice;

export type UseGetBerriesQuery = ReturnType<typeof useGetBerriesQuery>;
export type UseGetBerryByIdQuery = ReturnType<typeof useGetBerryByIdQuery>;
