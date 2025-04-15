import { COLORS } from 'config/styles-config';
import styled from 'styled-components';
import Hero from 'assets/png/hero.png';

export const HeroWrapper = styled.div<{ isMobile?: boolean }>`
  padding: ${(props) =>
    !props.isMobile ? '34px 24px 34px 32px' : '32px 0px 16px 0px'};
  background-color: ${(props) => (!props.isMobile ? COLORS.lightBg : '#fff')};
  background-image: url(${(props) => (!props.isMobile ? Hero.src : '')});
  background-repeat: no-repeat;
  background-position: left bottom;
  border-radius: 12px;
`;
