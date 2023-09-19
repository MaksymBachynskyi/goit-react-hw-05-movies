import { get } from 'fetch';
import { useEffect, useState } from 'react';

import MovieList from 'components/MovieListComponent.jsx/movieList';
export default function Home() {
  const [homeList, setHomelist] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    const fetchedEl = async () => {
      try {
        const item = await get({ signal: controller.signal });
        setHomelist(item.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedEl();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      <h1>Trending Today</h1>
      {homeList && <MovieList films={homeList} />}
    </div>
  );
}
