import { get } from 'fetch';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
const StyledLink = styled(NavLink)`
  color: blue;

  &:hover {
    color: orange;
  }
`;
const UlStyled = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export default function Home() {
  const location = useLocation();
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
      <UlStyled>
        {homeList &&
          homeList.map(item => (
            <li key={item.id}>
              <StyledLink state={{ from: location }} to={`movies/${item.id}`}>
                {item.title}
              </StyledLink>
            </li>
          ))}
      </UlStyled>
    </div>
  );
}
