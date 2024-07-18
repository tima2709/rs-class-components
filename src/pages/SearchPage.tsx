import React from 'react';
import Search from '../components/search/search';
import Result from '../components/result/result';
import { Outlet } from 'react-router-dom';

const SearchPage: React.FC = () => {
  return (
    <>
      <div style={{ display: 'flex', gap: '50px' }}>
        <div style={{ width: '260px' }}>
          <Search />
          <Result />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default SearchPage;
