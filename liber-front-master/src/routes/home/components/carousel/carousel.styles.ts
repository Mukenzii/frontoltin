import { COLORS } from 'config/styles-config';
import styled from 'styled-components';

export const SlideNav = styled.button`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: ${COLORS.primary};

  position: absolute;
  border: none;
  outline: none;
  top: 50%;
  margin-top: -15px;
  z-index: 1;
  cursor: pointer;
  &.slider-prev {
    left: 0;
  }
  &.slider-next {
    right: 0;
  }
`;

export const SwiperWrapper = styled.div`
  .swiper {
    padding: 1rem;
  }
  .swiper-container {
    width: 100% !important;
    max-width: 100%;
  }
  .wrap {
    box-sizing: border-box;
  }
  #content {
    box-sizing: border-box;
  }
`;
