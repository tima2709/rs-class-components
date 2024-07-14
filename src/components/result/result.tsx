import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';
import { NavLink } from 'react-router-dom';

interface Film {
  title: string;
  episode_id: number;
}

const Result: React.FC = () => {
  const [data, setData] = useState<Film[]>([]);
  const [value] = useLocalStorage<string>('searchTerm', '');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (value.length) {
          const response = await fetch(`https://swapi.dev/api/films/${value}`);
          const data: Film = await response.json();
          setData([data]);
          setLoading(false);
        } else {
          const response = await fetch('https://swapi.dev/api/films');
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
  }, [value]);

  if (loading) return <div style={{ marginTop: '20px' }}>Loading ...</div>;

  return (
    <div>
      {data.length ? (
        data.map((el, idx) => (
          <div key={idx}>
            <NavLink to={`/SearchedItem/${el.episode_id}`}>
              episode Id: {el.episode_id} {el.title}
            </NavLink>
          </div>
        ))
      ) : (
        <div>not found</div>
      )}
    </div>
  );
};

export default Result;
