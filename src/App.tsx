import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/404-page';
import SearchedItem from './pages/SearchedItem';
import { ThemeProvider, useTheme } from './themeContext';

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

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="App">
        <ThemeToggleButton />
        <Routes>
          <Route path="/" element={<SearchPage />}>
            <Route path="SearchedItem/:name" element={<SearchedItem />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
