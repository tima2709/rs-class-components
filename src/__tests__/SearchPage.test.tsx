import { render, screen, act } from '@testing-library/react';
import SearchPage from '../pages/SearchPage';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('SearchPage', () => {
  it('renders Search and Result components', () => {
    act(() => {
      render(
        <MemoryRouter>
          <SearchPage />
        </MemoryRouter>,
      );
    });

    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toBeInTheDocument();

    const resultLoadingText = screen.getByText(/Loading.../i);
    expect(resultLoadingText).toBeInTheDocument();
  });
});
