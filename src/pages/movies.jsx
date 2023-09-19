import { getByName } from 'fetch';
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
const UlStyled = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const StyledLink = styled(NavLink)`
  color: blue;
  &:hover {
    color: orange;
  }
`;
export default function Movies() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [films, setfilm] = useState('');
  function search(evnt) {
    evnt.preventDefault();
    const nameFilm = evnt.target.elements.searchValue.value;
    if (nameFilm === '') {
      return setSearchParams({});
    }
    setSearchParams({ query: nameFilm });

    evnt.target.reset();
  }
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
        setfilm(item.data);
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
      <form onSubmit={search}>
        <input type="text" name="searchValue" />
        <button type="submit">Search</button>
      </form>
      <UlStyled>
        {films &&
          films.results.map(item => {
            return (
              <StyledLink
                state={{ from: location }}
                to={`${item.id}`}
                key={item.id}
              >
                {item.title}
              </StyledLink>
            );
          })}
      </UlStyled>
    </div>
  );
}
