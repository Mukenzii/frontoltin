import { COLORS } from 'config/styles-config';
import styled from 'styled-components';

export const RatingProgress = styled.div<{ value: number }>`
  position: relative;
  width: 100%;
  height: 7px;
  border-radius: 12px;
  background-color: ${COLORS.lightBg};
  overflow: hidden;
  &::before {
    border-radius: 12px;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    height: 100%;
    width: ${({ value }) => value}%;
    background-color: ${COLORS.primary};
  }
`;
