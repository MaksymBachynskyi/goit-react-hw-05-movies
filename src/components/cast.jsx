import { getCast } from 'fetch';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export default function Cast() {
  const defaultImg =
    'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  useEffect(() => {
    if (!movieId) return;
    const controller = new AbortController();
    const fetchedEl = async () => {
      try {
        const item = await getCast(movieId, { signal: controller.signal });
        setCast(item.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedEl();
    return () => {
      controller.abort();
    };
  }, [movieId]);

  return (
    <ul>
      {cast &&
        cast.cast.map(item => (
          <li key={item.id}>
            <img
              src={
                item.profile_path
                  ? `https://image.tmdb.org/t/p/w200/${item.profile_path}`
                  : defaultImg
              }
              width={250}
              alt="poster"
            />
            <p>
              <span>Name:</span> {item.name}
            </p>
            <p>
              <span>Character:</span> {item.character}
            </p>
          </li>
        ))}
    </ul>
  );
}
