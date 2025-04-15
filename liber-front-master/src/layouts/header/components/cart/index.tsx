import * as React from 'react';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box } from '@mui/material';
import { COLORS } from '../../../../config/styles-config';

const StyledBadge = styled((props: BadgeProps) => (
  <Badge {...props} />
))<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    border: `2px solid ${theme.palette.background.default}`,
    padding: '0 4px',
    color: COLORS.white,
    '&:hover': {
      backgroundColor: 'transparent !important',
    },
  },
}));

const Cart = () => (
  <Box
    sx={{
      padding: '3px 4px',
      border: `2px solid ${COLORS.lightBg}`,
      borderRadius: '14px',
      '&:hover': {
        backgroundColor: COLORS.lightBg,
      },
    }}
  >
    <IconButton
      aria-label="cart"
      sx={{
        color: COLORS.darkBg,
        '&:hover': {
          backgroundColor: 'transparent !important',
        },
      }}
    >
      <StyledBadge
        badgeContent={4}
        color="secondary"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  </Box>
);

export default Cart;
