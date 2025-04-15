import { COLORS } from 'config/styles-config';
import styled from 'styled-components';

export const ControllerButtons = styled.button`
  border-radius: 50%;
  background-color: ${COLORS.lightBg};
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
`;

export const PaginationWrapper = styled.div`
  margin-bottom: 5px;
`;
