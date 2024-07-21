import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SearchedItem from '../pages/SearchedItem';
import { apiSlice, useGetBerryByIdQuery } from '../redux/query/apiSlice';
import selectedItemsReducer from '../redux/slices/selectedItemsSlice';

// Мокаем API вызов
vi.mock('../redux/query/apiSlice', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useGetBerryByIdQuery: vi.fn(),
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

const renderWithProviders = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/SearchedItem/:name" element={ui} />
        </Routes>
      </BrowserRouter>
    </Provider>,
  );
};

describe('SearchedItem Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (useGetBerryByIdQuery as jest.Mock).mockReturnValue({ isLoading: true });
    renderWithProviders(<SearchedItem />, {
      route: '/SearchedItem/test-berry',
    });
    expect(screen.getByText(/Loading .../i)).toBeInTheDocument();
  });

  it('displays error message if there is an error', () => {
    (useGetBerryByIdQuery as jest.Mock).mockReturnValue({ error: true });
    renderWithProviders(<SearchedItem />, {
      route: '/SearchedItem/test-berry',
    });
    expect(screen.getByText(/Ooops/i)).toBeInTheDocument();
  });

  it('renders berry details when data is loaded', () => {
    const berry = { name: 'test-berry', url: 'url' };
    (useGetBerryByIdQuery as jest.Mock).mockReturnValue({
      data: berry,
      isLoading: false,
    });
    renderWithProviders(<SearchedItem />, {
      route: '/SearchedItem/test-berry',
    });
    expect(screen.getByText(berry.name)).toBeInTheDocument();
  });

  it('renders close button when data is loaded', () => {
    const berry = { name: 'test-berry', url: 'url' };
    (useGetBerryByIdQuery as jest.Mock).mockReturnValue({
      data: berry,
      isLoading: false,
    });
    renderWithProviders(<SearchedItem />, {
      route: '/SearchedItem/test-berry',
    });
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });
});
