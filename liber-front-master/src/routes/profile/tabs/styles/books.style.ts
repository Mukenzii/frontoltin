import styled from 'styled-components';

export const TabBox = styled.div<{ isMobile: boolean }>`
  display: flex;
  background: #fff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  padding: 12px 32px;
  align-items: center;
  flex-direction: ${(props) => (!props.isMobile ? 'row' : 'column')};
`;
