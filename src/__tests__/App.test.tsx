import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';

describe('App Component', () => {
  it('renders SearchPage for the root route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('renders NotFoundPage for an unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText('not found')).toBeInTheDocument();
  });

  it('renders SearchedItem for the SearchedItem route', async () => {
    render(
      <MemoryRouter initialEntries={['/SearchedItem/1']}>
        <App />
      </MemoryRouter>,
    );

    await waitFor(() =>
      expect(screen.getByText('Loading ...')).toBeInTheDocument(),
    );
  });
});
