import { COLORS } from 'config/styles-config';
import styled from 'styled-components';

export const BasicDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-bottom: 1px dashed ${COLORS.disabled};
  padding-bottom: 1.25rem;
`;

export const BasicProductImage = styled.div`
  height: 422px;
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
