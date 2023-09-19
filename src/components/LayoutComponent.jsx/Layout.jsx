import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { StyledLayout, StyledList, StyledNavLink } from './layoutStyled';
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
