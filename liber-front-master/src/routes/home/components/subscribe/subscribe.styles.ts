import { COLORS } from 'config/styles-config';
import WaveElement from 'assets/png/waveElement.png';
import styled from 'styled-components';
import { Button } from 'components/button';

export const SubscribeWrapper = styled.div`
  padding: 2rem 1.5rem;
  background-color: ${COLORS.primary};
  background-image: url(${WaveElement.src});
  background-position: right;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 12px;
  height: 339px;
`;

export const SubscribeButton = styled(Button)`
  background-color: ${COLORS.white} !important;
  color: ${COLORS.textMain} !important;
  margin-top: auto;
  &:hover {
    background-color: ${COLORS.white};

    color: ${COLORS.textMain};
  }
`;
