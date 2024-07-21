import React from 'react';
import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { ThemeProvider } from '../themeContext';
import userEvent from '@testing-library/user-event';

describe('App component', () => {
  test('renders search page and allows theme toggling', () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>,
    );

    const themeToggleButton = screen.getByRole('button', {
      name: /Switch to dark theme/i,
    });
    expect(themeToggleButton).toBeInTheDocument();

    expect(document.body.className).toBe('light');

    userEvent.click(themeToggleButton);

    expect(document.body.className).toBe('dark');

    const searchPage = screen.getByText(/search/i);
    expect(searchPage).toBeInTheDocument();
  });

  test('renders not found page for unknown routes', () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>,
    );

    const notFoundPage = screen.getByText(/404/i);
    expect(notFoundPage).toBeInTheDocument();
  });
});
