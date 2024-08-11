import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import store from '../redux/store';
import App from '../App';

vi.mock('../pagesComponents/Index', () => {
  return {
    default: () => <div>SearchPage</div>,
  };
});

vi.mock('../pagesComponents/404-page', () => {
  return {
    default: () => <div>NotFoundPage</div>,
  };
});

vi.mock('../pagesComponents/Index', () => {
  return {
    default: () => <div>SearchedItem</div>,
  };
});

describe('App', () => {
  it('renders the ThemeToggleButton', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    const button = screen.getByRole('button', {
      name: /Switch to light theme/i,
    });
    expect(button).toBeInTheDocument();
  });

  it('renders the Index by default', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('SearchPage')).toBeInTheDocument();
  });

  it('renders NotFoundPage for unknown routes', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/unknown-route']}>
          <Routes>
            <Route path="*" element={<App />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('NotFoundPage')).toBeInTheDocument();
  });
});
