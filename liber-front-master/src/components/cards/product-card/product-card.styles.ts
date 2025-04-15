import { COLORS } from 'config/styles-config';
import styled from 'styled-components';

interface productCardType {
  horizontal?: boolean;
  isnotmobile?: boolean;
  orderTab?: boolean;
  profileTab?: boolean;
}

export const ProductCardWrapper = styled.div<{ horizontal?: boolean }>`
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 20px;
  background-color: ${({ horizontal }) => (horizontal ? COLORS.white : '')};
  padding: ${({ horizontal }) => (horizontal ? '1.5rem' : 0)};
  border: ${({ horizontal }) =>
    horizontal ? `1px solid ${COLORS.borderColor}` : 'none'};
`;

export const ProductCardImage = styled.div<productCardType>`
  border-radius: 14px;
  height: ${({ horizontal, orderTab }) =>
    // eslint-disable-next-line no-nested-ternary
    horizontal ? (orderTab ? '220px' : '307px') : '336px'};
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 768px) {
    height: ${({ profileTab }) => (profileTab ? '500px' : '210px')};
  }
`;

export const ProductCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  align-content: space-between;
`;
