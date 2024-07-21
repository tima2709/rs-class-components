import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../App';
import rootReducer from '../redux/slices/selectedItemsSlice';

const store = configureStore({
  reducer: rootReducer,
});

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders ThemeToggleButton and initial route', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
    );

    const themeToggleButton = screen.getByRole('button', {
      name: /Switch to dark theme/i,
    });
    expect(themeToggleButton).toBeInTheDocument();

    const searchPageElement = screen.getByText(/SearchPage content/i);
    expect(searchPageElement).toBeInTheDocument();
  });

  it('renders NotFoundPage for invalid route', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
    );

    window.history.pushState({}, 'Test page', '/non-existing-route');

    const notFoundPageElement = screen.getByText(/not found/i);
    expect(notFoundPageElement).toBeInTheDocument();
  });
});
