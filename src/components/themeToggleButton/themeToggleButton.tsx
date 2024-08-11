'use client';
import React from 'react';
import { useTheme } from '../../themeContext';

const ThemeToggleButton: React.FC = () => {
  const context = useTheme();
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  const { theme, toggleTheme } = context;

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'dark' : 'light'} theme
    </button>
  );
};

export default ThemeToggleButton;
