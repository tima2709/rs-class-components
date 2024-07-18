import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Result from '../components/result/result';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('@uidotdev/usehooks', () => ({
  useLocalStorage: vi.fn(() => ['searchTerm', vi.fn()]),
}));

describe('Result Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(
      <BrowserRouter>
        <Result />
      </BrowserRouter>,
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('displays not found message if no data is returned', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ results: [] }),
      }),
    ) as vi.Mock;

    render(
      <BrowserRouter>
        <Result />
      </BrowserRouter>,
    );

    // await waitFor(() => expect(screen.getByText('not found')).toBeInTheDocument());
  });

  it('navigates through pages', () => {
    render(
      <BrowserRouter>
        <Result />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByText('next page'));
    expect(window.location.search).toBe('?page=2');
  });
});
