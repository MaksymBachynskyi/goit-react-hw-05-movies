import { Outlet, useLocation, useParams } from 'react-router';
import { getId } from 'fetch';
import { Suspense, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
const MovieStyled = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
`;
const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 10px;
`;
const StyledLink = styled(NavLink)`
  color: blue;

  &:hover {
    color: orange;
  }
`;
const StyledButton = styled.button`
  padding: 0px;
  width: 100px;
  background-color: white;
  border-radius: 10px;
  color: black;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    background-color: blue;
    color: white;
  }
`;
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
