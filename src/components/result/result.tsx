import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import Pagination from '../pagination/pagination';
import {
  UseGetBerriesQuery,
  useGetBerriesQuery,
} from '../../redux/query/apiSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { selectItem, unselectAll } from '../../redux/slices/selectedItemsSlice';
import { RootState } from '../../redux/store';

interface Berry {
  name: string;
  url: string;
}

const Result: React.FC = () => {
  const [searchTerm] = useLocalStorage<string>('searchTerm', '');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const [page, setPage] = useState<number>(initialPage);
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(
    (state: RootState) => state.selectedItems.items,
  );

  const offset = (page - 1) * 10;
  const { data, error, isLoading }: UseGetBerriesQuery = useGetBerriesQuery({
    offset,
    limit: 10,
    searchTerm,
  });

  useEffect(() => {
    navigate(`?page=${page}`);
  }, [page, navigate]);

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

  if (error) return <div>Ooops</div>;
  return (
    <div>
      {!isLoading ? (
        <div>
          {data?.results?.length ? (
            data.results.map((el: Berry, idx: number) => (
              <div key={idx}>
                <input
                  type="checkbox"
                  checked={isSelected(el.url)}
                  onChange={() => handleCheckboxChange(el)}
                  aria-label={el.name}
                />
                <NavLink to={`/SearchedItem/${el.name}`}>{el.name}</NavLink>
              </div>
            ))
          ) : (
            <NavLink to={`/SearchedItem/${data.name}`}>{data.name}</NavLink>
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
