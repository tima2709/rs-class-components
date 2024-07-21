import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Result from '../components/result/result';
import selectedItemsReducer from '../redux/slices/selectedItemsSlice';
import { apiSlice, useGetBerriesQuery } from '../redux/query/apiSlice';

vi.mock('@uidotdev/usehooks', () => ({
  useLocalStorage: vi.fn(() => ['searchTerm', vi.fn()]),
}));

vi.mock('../redux/query/apiSlice', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useGetBerriesQuery: vi.fn(),
  };
});

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    selectedItems: selectedItemsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

describe('Result Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (useGetBerriesQuery as jest.Mock).mockReturnValue({ isLoading: true });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Result />
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('displays not found message if no data is returned', () => {
    (useGetBerriesQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: { results: [] },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Result />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });

  it('navigates through pages', () => {
    (useGetBerriesQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: { results: [] },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Result />
        </BrowserRouter>
      </Provider>,
    );

    fireEvent.click(screen.getByText('next page'));
    expect(window.location.search).toBe('?page=2');
  });
});
