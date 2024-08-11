import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import store from '../redux/store';
import Index from '../../pages/SearchPage';
import { useGetBerriesQuery } from '../redux/query/apiSlice';

vi.mock('../redux/query/apiSlice', async () => {
  const actual = await vi.importActual('../redux/query/apiSlice');
  return {
    ...actual,
    useGetBerriesQuery: vi.fn(),
  };
});

describe('Index', () => {
  it('renders Search and Result components', async () => {
    (useGetBerriesQuery as vi.Mock).mockReturnValue({
      data: { results: [] },
      isLoading: true,
      error: null,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
        </BrowserRouter>
      </Provider>,
    );

    expect(
      screen.getByPlaceholderText('Search by ID or full name'),
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });
});
