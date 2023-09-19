import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
export const MovieStyled = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
`;
export const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 10px;
`;
export const StyledLink = styled(NavLink)`
  color: blue;

  &:hover {
    color: orange;
  }
`;
export const StyledButton = styled.button`
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
