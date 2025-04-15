import styled from 'styled-components';

export const HeaderWrapper = styled.header<{ padding?: string }>`
  padding: ${(props) => (props.padding ? props.padding : '12px 0')};
  border-bottom: 1px solid #f0f0f0;
`;

export const HeaderContent = styled.div<{ justify?: string }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.justify};
`;
export const searchIconPosition = styled.div`
  text-align: right;
`;
export const ImageWrapper = styled.div`
  max-width: 50px;
  max-height: 50px;
  height: 100%;
  width: 100%;
  border-radius: 14px;
  overflow: hidden;
`;
