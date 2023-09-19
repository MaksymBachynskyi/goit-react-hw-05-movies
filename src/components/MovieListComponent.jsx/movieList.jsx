import { UlStyled, StyledLink } from './MovieListStyled';
import { useLocation } from 'react-router-dom';

export default function MovieList({ films }) {
  const location = useLocation();

  return (
    <UlStyled>
      {films &&
        films.map(item => (
          <li key={item.id}>
            <StyledLink state={{ from: location }} to={`/movies/${item.id}`}>
              {item.title}
            </StyledLink>
          </li>
        ))}
    </UlStyled>
  );
}
