import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import SearchedItem from '../pages/SearchedItem';
import { useGetBerryByIdQuery } from '../redux/query/apiSlice';
import { GetBerriesQueryResult } from '../redux/types';
import { render } from './test-utils';

vi.mock('../redux/query/apiSlice', async () => {
  const actual = await vi.importActual('../redux/query/apiSlice');
  return {
    ...actual,
    useGetBerryByIdQuery: vi.fn(),
  };
});

describe('SearchedItem', () => {
  it('renders loading state initially', () => {
    (useGetBerryByIdQuery as vi.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    } as GetBerriesQueryResult);

    render(<SearchedItem />, {
      route: '/SearchedItem/Berry1',
      path: '/SearchedItem/:name',
    });

    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  });

  it('renders error state when there is an error', () => {
    (useGetBerryByIdQuery as vi.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
    } as GetBerriesQueryResult);

    render(<SearchedItem />, {
      route: '/SearchedItem/Berry1',
      path: '/SearchedItem/:name',
    });

    expect(screen.getByText('Ooops')).toBeInTheDocument();
  });

  it('renders berry data when available', () => {
    (useGetBerryByIdQuery as vi.Mock).mockReturnValue({
      data: { name: 'Berry1' },
      isLoading: false,
      error: null,
    } as GetBerriesQueryResult);

    render(<SearchedItem />, {
      route: '/SearchedItem/Berry1',
      path: '/SearchedItem/:name',
    });

    expect(screen.getByText('Berry1')).toBeInTheDocument();
    expect(screen.getByText('close')).toBeInTheDocument();
  });
});
