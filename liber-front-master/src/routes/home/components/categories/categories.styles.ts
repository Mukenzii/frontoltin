import styled from 'styled-components';

export const CarouselWrapper = styled.div<{ isInTheEnd: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: ${({ isInTheEnd }) => (!isInTheEnd ? 0 : 'unset')};
  left: ${({ isInTheEnd }) => (isInTheEnd ? 0 : 'unset')};
  z-index: 100;
  @media (max-width: 768px) {
    width: 50px;
    background: linear-gradient(
      ${({ isInTheEnd }) => (isInTheEnd ? '90' : '270')}deg,
      #ffffff8a -3.5%,
      rgba(255, 255, 255, 0) 100%
    );
  }
`;
