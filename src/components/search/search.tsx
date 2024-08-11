'use client';
import React, { ChangeEvent } from 'react';

interface SearchInputProps {
  searchTerm: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const Search: React.FC<SearchInputProps> = ({
  searchTerm,
  onInputChange,
  onSearch,
}) => {
  return (
    <div style={{ margin: '20px' }}>
      <input
        type="text"
        placeholder="Search by ID or full name"
        value={searchTerm}
        onChange={onInputChange}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default Search;
