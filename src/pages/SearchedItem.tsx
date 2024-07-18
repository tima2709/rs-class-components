import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

interface Film {
  name: string;
}

const SearchedItem: React.FC = () => {
  const params = useParams();
  const [data, setData] = useState<Film | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://swapi.dev/api/people/${params.id}`,
        );
        const data: Film = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) return <div style={{ marginTop: '20px' }}>Loading ...</div>;

  return (
    <div>
      <div>
        <Link to="/">
          <button hidden={!data} onClick={() => setData(null)}>
            close
          </button>
        </Link>
      </div>
      <div>
        <h3>{data?.name}</h3>
      </div>
    </div>
  );
};

export default SearchedItem;
