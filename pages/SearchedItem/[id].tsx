import { useRouter } from 'next/router';
import Link from 'next/link';
import { useGetBerryByIdQuery } from '../../src/redux/query/apiSlice';
import Image from 'next/image';

const SearchedItemById = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: pokemon, error, isLoading } = useGetBerryByIdQuery(id);

  console.log(pokemon);

  if (isLoading) return <div style={{ marginTop: '20px' }}>Loading ...</div>;
  if (error) return <div>Ooops</div>;

  return (
    <div className="container">
      <div>
        <Link href="/">
          <button hidden={!pokemon}>close</button>
        </Link>
      </div>
      <div>
        <h3>{pokemon?.data.name}</h3>
        <Image
          src={pokemon.data.images.large}
          alt={pokemon.data.name}
          width={300}
          height={413}
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
};

export default SearchedItemById;
