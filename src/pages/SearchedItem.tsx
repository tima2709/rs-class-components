import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  UseGetBerryByIdQuery,
  useGetBerryByIdQuery,
} from '../redux/query/apiSlice';

const SearchedItem: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const {
    data: pokemon,
    error,
    isLoading,
  }: UseGetBerryByIdQuery = useGetBerryByIdQuery(name);

  if (isLoading) return <div style={{ marginTop: '20px' }}>Loading ...</div>;
  if (error) return <div>Ooops</div>;

  return (
    <div>
      <div>
        <Link to="/">
          <button hidden={!pokemon}>close</button>
        </Link>
      </div>
      <div>
        <h3>{pokemon?.name}</h3>
      </div>
    </div>
  );
};

export default SearchedItem;
