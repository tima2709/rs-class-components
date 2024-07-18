import React from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';

const Search: React.FC = () => {
  const [value, setValue] = useLocalStorage('searchTerm', '');

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
};

export default Search;
