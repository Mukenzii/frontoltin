import { COLORS } from 'config/styles-config';
import styled from 'styled-components';

export const FooterWrapper = styled.div`
  padding: 31px 0;
  background-color: ${COLORS.lightBg};
`;

export const FooterDownWrapper = styled.div<{ isMobile: boolean }>`
  padding: 12px 0;
  background-color: #1C1014;
  margin-bottom: ${(props) => (props.isMobile ? '56px' : 0)};
`;

export const PaymentTypes = styled.div`
  padding: 8px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.white};
  border-radius: 5px;
  img {
    object-fit: contain;
  }
`;
