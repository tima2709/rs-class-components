import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import Pagination from '../pagination/pagination';

interface Film {
  name: string;
}

const Result: React.FC = () => {
  const [data, setData] = useState<Film[]>([]);
  const [value] = useLocalStorage<string>('searchTerm', '');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (value.length) {
          const response = await fetch(`https://swapi.dev/api/people/${value}`);
          const data: Film = await response.json();
          setData([data]);
          setLoading(false);
        } else {
          const response = await fetch(
            `https://swapi.dev/api/people/?limit=10&page=${page}`,
          );
          const data = await response.json();
          setData(data.results);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [value, page]);

  useEffect(() => {
    navigate(`?page=${page}`);
  }, [page, navigate]);

  return (
    <div>
      {!loading ? (
        <div>
          {data.length ? (
            data.map((el, idx) => (
              <div key={idx}>
                <NavLink to={`/SearchedItem/${idx + 1}`}>{el.name}</NavLink>
              </div>
            ))
          ) : (
            <div>not found</div>
          )}
        </div>
      ) : (
        <div style={{ marginTop: '20px' }}>Loading...</div>
      )}
      <div style={{ marginTop: '20px' }}>
        <Pagination page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default Result;
