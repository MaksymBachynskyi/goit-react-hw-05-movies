import { Outlet, useLocation, useParams } from 'react-router';
import { getId } from 'fetch';
import { NavLink } from 'react-router-dom';
import { Suspense, useEffect, useRef, useState } from 'react';
import {
  MovieStyled,
  WrapperStyled,
  StyledLink,
  StyledButton,
} from './moveDetailsStyled';
export default function MovieDetails() {
  const defaultImg =
    'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';
  const location = useLocation();
  const back = useRef(location.state?.from ?? '/');
  const { movieId } = useParams();
  const [film, setfilm] = useState(null);
  useEffect(() => {
    if (!movieId) return;
    const controller = new AbortController();
    const fetchedEl = async () => {
      try {
        const item = await getId(movieId, { signal: controller.signal });
        setfilm(item.data);
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
    <div>
      <NavLink to={back.current}>
        <StyledButton>Go Back</StyledButton>
      </NavLink>
      {film && (
        <MovieStyled>
          <img
            src={
              film.poster_path
                ? `https://image.tmdb.org/t/p/w200/${film.poster_path}`
                : defaultImg
            }
            width={250}
            alt="poster"
          />
          <WrapperStyled>
            <h1>{film.title}</h1>
            <span>User Score: {Math.ceil(film.vote_average * 10)}%</span>
            <h2>Overview</h2>
            <p>{film.overview}</p>
            <h2>Genres</h2>
            <MovieStyled>
              {film.genres.map(item => (
                <p key={item.id}>{item.name}</p>
              ))}
            </MovieStyled>
          </WrapperStyled>
        </MovieStyled>
      )}
      <WrapperStyled>
        Additional information <StyledLink to="cast">Cast</StyledLink>
        <StyledLink to="reviews">Reviews</StyledLink>
      </WrapperStyled>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
