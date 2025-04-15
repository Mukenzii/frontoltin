import styled from 'styled-components';

export const CategoryCardWrapper = styled.div`
  position: relative;
  height: 164px;
  z-index: 100;
  cursor: pointer;
  background: linear-gradient(
    38.37deg,
    rgba(0, 0, 0, 0.5) 6.38%,
    rgba(0, 0, 0, 0) 86.69%
  );
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;

  border-radius: 14px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CategoryTitle = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  pointer-events: none;
`;
