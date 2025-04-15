import { Box } from '@mui/material';
import { COLORS } from 'config/styles-config';
import styled from 'styled-components';

const WithCustomScrollBar = styled(Box)`
  overflow-y: scroll;
  margin-right: 4px;
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background: ${COLORS.borderColor};
  }

  ::-webkit-scrollbar-thumb {
    transition: all 0.3s;
    background: #aaa;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
`;

export default WithCustomScrollBar;
