import React from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';

const Search: React.FC = () => {
  const [value, setValue] = useLocalStorage('searchTerm', '');

  return (
    <div style={{ margin: '20px' }}>
      <input
        type="text"
        placeholder="Search by ID or full name"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
};

export default Search;
