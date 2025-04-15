import styled from 'styled-components';

export const Title = styled.h3<{ isMobile?: boolean }>`
  font-size: ${(props) => (!props.isMobile ? '30px' : '20px')};
  line-height: 20px;
  color: #11142d;
`;
