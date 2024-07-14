import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/404-page';
import SearchedItem from './pages/SearchedItem';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SearchPage />}>
          <Route path="SearchedItem/:id" element={<SearchedItem />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
