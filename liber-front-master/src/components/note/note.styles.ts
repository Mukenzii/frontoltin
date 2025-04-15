import { COLORS } from 'config/styles-config';
import styled from 'styled-components';

export const NoteContainer = styled.div`
  border-radius: 14px;
  padding: 1.25rem 1.5rem;
  background-color: ${COLORS.secondary};
  position: relative;
  overflow: hidden;
`;

export const HeroWrapper = styled.div`
  position: absolute;
  right: 0;
  z-index: 2;
  bottom: 0;
  pointer-events: none;
  user-select: none;
  height: 100%;
  img {
    transform: rotateY(180deg);
  }
`;

export const WaveWrapper = styled.div`
  position: absolute;
  right: 10%;
  pointer-events: none;
  user-select: none;
  bottom: 0;
  height: 100%;
  transform: scale(1.4);
`;
