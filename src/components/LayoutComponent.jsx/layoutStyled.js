import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
export const StyledLayout = styled.div`
  width: 1430px;
  padding: 0px 15px;
`;
export const StyledList = styled.ul`
  display: flex;
  gap: 8px;
`;
export const StyledNavLink = styled(NavLink)`
  color: black;
  font-size: 2rem;
  line-height: 2.8rem;
  font-weight: 600;
  text-decoration: none;
  &.active {
    color: orange;
  }
`;
