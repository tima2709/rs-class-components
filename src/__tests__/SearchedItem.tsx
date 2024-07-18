import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SearchedItem from '../pages/SearchedItem';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ name: 'Luke Skywalker' }),
  }),
) as vi.Mock;

describe('SearchedItem Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(
      <MemoryRouter initialEntries={['/SearchedItem/1']}>
        <Routes>
          <Route path="/SearchedItem/:id" element={<SearchedItem />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText(/Loading .../i)).toBeInTheDocument();
  });

  it('renders fetched data correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/SearchedItem/1']}>
        <Routes>
          <Route path="/SearchedItem/:id" element={<SearchedItem />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() =>
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument(),
    );
  });

  it('handles fetch error', async () => {
    global.fetch = vi.fn(() => Promise.reject('API is down')) as vi.Mock;

    render(
      <MemoryRouter initialEntries={['/SearchedItem/1']}>
        <Routes>
          <Route path="/SearchedItem/:id" element={<SearchedItem />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() =>
      expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument(),
    );
  });
});
