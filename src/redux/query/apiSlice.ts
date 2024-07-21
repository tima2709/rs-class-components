import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2' }),
  endpoints: (builder) => ({
    getBerries: builder.query({
      query: ({
        offset,
        limit,
        searchTerm,
      }: {
        offset: number;
        limit: number;
        searchTerm: string;
      }) => {
        if (searchTerm) {
          return `berry/${searchTerm}`;
        }
        return `berry/?offset=${offset}&limit=${limit}`;
      },
    }),
    getBerryById: builder.query({
      query: (name: string) => {
        return `berry/${name}`;
      },
    }),
  }),
});

export const { useGetBerriesQuery, useGetBerryByIdQuery } = apiSlice;
