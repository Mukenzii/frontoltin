import { Button } from 'components/button';
// import { COLORS } from 'config/styles-config';
import styled from 'styled-components';

export const OpenerButton = styled(Button)`
  border-radius: 14px 0 0 14px !important;
  background-color: transparent !important;
  color: #3f51b5;
  border: 1px solid #e1e1e1 !important;
  font-weight: 600 !important;
  font-size: 1rem !important;
  &:hover {
    background-color: transparent;
    border-width: 1px;
  }
  '.muibutton-sizemedium': {
    padding: 0 !important;
  }
`;
