import { getByName } from 'fetch';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from 'components/MovieListComponent.jsx/movieList';
import { Form } from 'components/form';
export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [films, setfilm] = useState('');

  useEffect(() => {
    if (!searchParams.get('query')) {
      return;
    }
    const controller = new AbortController();
    const fetchedEl = async () => {
      try {
        const item = await getByName(searchParams.get('query'), {
          signal: controller.signal,
        });
        setfilm(item.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedEl();
    return () => {
      controller.abort();
    };
  }, [searchParams]);
  return (
    <div>
      <Form onSetSearchParams={setSearchParams} />
      {films && <MovieList films={films} />}
    </div>
  );
}
