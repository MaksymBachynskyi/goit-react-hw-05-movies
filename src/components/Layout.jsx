import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
const StyledLayout = styled.div`
  width: 1430px;
  padding: 0px 15px;
`;
const StyledList = styled.ul`
  display: flex;
  gap: 8px;
`;
const StyledNavLink = styled(NavLink)`
  color: black;
  font-size: 2rem;
  line-height: 2.8rem;
  font-weight: 600;
  text-decoration: none;
  &.active {
    color: orange;
  }
`;
export default function Layout() {
  return (
    <StyledLayout>
      <header>
        <StyledList>
          <li>
            <StyledNavLink to="/">Home</StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/movies">Movie</StyledNavLink>
          </li>
        </StyledList>
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </StyledLayout>
  );
}
