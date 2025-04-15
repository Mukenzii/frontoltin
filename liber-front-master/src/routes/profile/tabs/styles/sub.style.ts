import styled from 'styled-components';

interface Istyle {
  bgColor?: string;
  minHeight?: number;
  topBottom?: string;
  justify?: string;
  direction?: string;
}
export const CardBox = styled.div<Istyle>`
  position: relative;
  background-color: ${(props) => props.bgColor};
  width: 100%;
  min-height: ${(props) => props.minHeight}px;
  border-radius: 12px;
  margin: 0;
  overflow: hidden;
`;
export const CardTitle = styled.p`
  font-weight: 700;
  font-size: 26px;
  line-height: 32px;
  color: #fff;
  margin: 0;
  position: absolute;
  top: 32px;
  left: 32px;
`;
export const ImageBox = styled.div<Istyle>`
  position: absolute;
  right: 0;
  top: ${(props) => (props.topBottom === 'top' ? 0 : 'auto')};
  bottom: ${(props) => (props.topBottom !== 'top' ? 0 : 'auto')};
`;
export const Flex = styled.div<Istyle>`
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : 'row')};
  align-items: flex-start;
  margin-top: 16px;
  justify-content: ${(props) =>
    props.justify ? props.justify : 'space-between'};
`;
export const Label = styled.label`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 6px;
  color: #242424;
`;
export const CustomBox = styled.div<{ isMobile?: boolean }>`
  padding: 16px 15px;
  background: #f5f5f5;
  min-height: 135px;
  min-width: ${(props) => (!props.isMobile ? '368px' : '100%')};
  box-sizing: border-box;
  border-radius: 14px;
`;
