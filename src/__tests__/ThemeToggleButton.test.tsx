import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, useTheme } from '../themeContext';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'dark' : 'light'} theme
    </button>
  );
};

describe('ThemeToggleButton', () => {
  it('renders and toggles theme', () => {
    render(
      <ThemeProvider>
        <ThemeToggleButton />
      </ThemeProvider>,
    );

    const button = screen.getByRole('button', {
      name: /Switch to light theme/i,
    });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(
      screen.getByRole('button', { name: /Switch to dark theme/i }),
    ).toBeInTheDocument();
  });
});
