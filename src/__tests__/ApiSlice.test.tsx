import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  apiSlice,
  useGetBerriesQuery,
  useGetBerryByIdQuery,
} from '../redux/query/apiSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('apiSlice', () => {
  it('should use getBerriesQuery', async () => {
    const TestComponent = () => {
      const { data, isLoading } = useGetBerriesQuery({
        offset: 0,
        limit: 10,
        searchTerm: '',
      });

      if (isLoading) {
        return <div>Loading...</div>;
      }

      return (
        <div>
          {data?.results?.map((berry: never, index: number) => (
            <div key={index}>{berry.name}</div>
          ))}
        </div>
      );
    };

    vi.mock('../redux/query/apiSlice', async (importOriginal) => {
      const actual = await importOriginal();
      return {
        ...actual,
        useGetBerriesQuery: vi.fn().mockReturnValue({
          data: { results: [{ name: 'berry1' }] },
          isLoading: false,
        }),
      };
    });

    renderWithProviders(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByText('berry1')).toBeInTheDocument();
    });
  });

  it('should use getBerryByIdQuery', async () => {
    const TestComponent = () => {
      const { data, isLoading } = useGetBerryByIdQuery('berry-name');

      if (isLoading) {
        return <div>Loading...</div>;
      }

      return <div>{data?.name}</div>;
    };

    vi.mock('../redux/query/apiSlice', async (importOriginal) => {
      const actual = await importOriginal();
      return {
        ...actual,
        useGetBerryByIdQuery: vi
          .fn()
          .mockReturnValue({ data: { name: 'berry-name' }, isLoading: false }),
      };
    });

    renderWithProviders(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByText('berry-name')).toBeInTheDocument();
    });
  });
});
