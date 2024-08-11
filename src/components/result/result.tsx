'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Search from '../search/search';
import useLocalStorage from '../hooks/useLocalstorage';
import {
  useGetBerriesQuery,
  UseGetBerriesQuery,
} from '../../redux/query/apiSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { selectItem, unselectAll } from '../../redux/slices/selectedItemsSlice';
import Pagination from '../pagination/pagination';
import { RootState } from '../../redux/store';

interface Berry {
  name: string;
  url: string;
}

const Result: React.FC = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage<string>('');
  const [query, setQuery] = useState<string>('');
  const router = useRouter();
  const initialPage = parseInt((router.query.page as string) || '1', 10);
  const [page, setPage] = useState<number>(initialPage);
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(
    (state: RootState) => state.selectedItems.items,
  );

  console.log(query, 'query');

  const { data, error, isLoading }: UseGetBerriesQuery = useGetBerriesQuery({
    page,
    limit: 10,
    query,
  });

  useEffect(() => {
    router.push(`?page=${page}`);
  }, [page]);

  const handleCheckboxChange = (berry: Berry) => {
    dispatch(selectItem({ id: berry.url, name: berry.name }));
  };

  const isSelected = (id: string) =>
    selectedItems.some((item) => item.id === id);

  const handleDownload = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      selectedItems.map((item) => `${item.id},${item.name}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${selectedItems.length}_berries.csv`);
    link.click();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    setQuery(searchTerm);
  };

  if (error) return <div>Ooops</div>;
  return (
    <div>
      <Search
        searchTerm={searchTerm}
        onInputChange={handleInputChange}
        onSearch={handleSearch}
      />
      {!isLoading ? (
        <div>
          {data?.data?.length ? (
            data.data.map((el: Berry, idx: number) => (
              <div key={idx}>
                <input
                  type="checkbox"
                  checked={isSelected(el.url)}
                  onChange={() => handleCheckboxChange(el)}
                  aria-label={el.name}
                />
                <Link href={`/SearchedItem/${el.id}`}>{el.name}</Link>
              </div>
            ))
          ) : (
            <Link href={`/SearchedItem/${data.name}`}>{data.name}</Link>
          )}
        </div>
      ) : (
        <div style={{ marginTop: '20px' }}>Loading...</div>
      )}
      <div style={{ marginTop: '20px' }}>
        <Pagination page={page} setPage={setPage} />
      </div>
      {selectedItems.length > 0 && (
        <div className="flyout">
          <p>{selectedItems.length} items are selected</p>
          <button onClick={() => dispatch(unselectAll())}>Unselect all</button>
          <button onClick={handleDownload}>Download</button>
        </div>
      )}
    </div>
  );
};

export default Result;
