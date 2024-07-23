// Result.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import store from '../redux/store';
import Result from '../components/result/result';
import { useGetBerriesQuery } from '../redux/query/apiSlice';
import { GetBerriesQueryResult } from '../redux/types';

vi.mock('../redux/query/apiSlice', async () => {
  const actual = await vi.importActual('../redux/query/apiSlice');
  return {
    ...actual,
    useGetBerriesQuery: vi.fn(),
  };
});

describe('Result', () => {
  it('renders without crashing', () => {
    (useGetBerriesQuery as vi.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    } as GetBerriesQueryResult);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Result />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders berries when data is available', async () => {
    (useGetBerriesQuery as vi.Mock).mockReturnValue({
      data: {
        results: [
          { name: 'Berry1', url: 'url1' },
          { name: 'Berry2', url: 'url2' },
        ],
      },
      isLoading: false,
      error: null,
    } as GetBerriesQueryResult);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Result />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() => expect(screen.getByText('Berry1')).toBeInTheDocument());
    expect(screen.getByText('Berry2')).toBeInTheDocument();
  });

  it('calls setPage when pagination buttons are clicked', async () => {
    (useGetBerriesQuery as vi.Mock).mockReturnValue({
      data: { results: [] },
      isLoading: false,
      error: null,
    } as GetBerriesQueryResult);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Result />
        </BrowserRouter>
      </Provider>,
    );

    const nextPageButton = screen.getByText('next page');
    fireEvent.click(nextPageButton);

    await waitFor(() => {
      expect(useGetBerriesQuery).toHaveBeenCalledWith(
        expect.objectContaining({ offset: 10 }),
      );
    });
  });

  it('displays error message on error', () => {
    (useGetBerriesQuery as vi.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
    } as GetBerriesQueryResult);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Result />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Ooops')).toBeInTheDocument();
  });

  it('handles item selection and unselection', async () => {
    (useGetBerriesQuery as vi.Mock).mockReturnValue({
      data: {
        results: [
          { name: 'Berry1', url: 'url1' },
          { name: 'Berry2', url: 'url2' },
        ],
      },
      isLoading: false,
      error: null,
    } as GetBerriesQueryResult);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Result />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() => screen.getByText('Berry1'));

    const checkboxBerry1 = screen.getByLabelText('Berry1');
    fireEvent.click(checkboxBerry1);
    expect(store.getState().selectedItems.items).toHaveLength(1);

    const unselectAllButton = screen.getByText('Unselect all');
    fireEvent.click(unselectAllButton);
    expect(store.getState().selectedItems.items).toHaveLength(0);
  });
});
