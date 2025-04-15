import React from 'react';
import { Box } from '@mui/material';
import ProfileSidebarMenu from '../components/sidebar-menu';

interface Content {
  children?: React.ReactNode;
  isMobile: boolean;
}

const ProfileLayout: React.FC<Content> = ({ children, isMobile }) => (
  <Box
    sx={(theme) => ({
      padding: !isMobile ? '60px 0' : '20px 1rem',
      display: 'flex',
      alignItems: 'flex-start',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
    })}
  >
    <ProfileSidebarMenu />
    <Box
      sx={(theme) => ({
        paddingLeft: '36px',
        width: '100%',
        [theme.breakpoints.down('md')]: { paddingLeft: 0, marginTop: '30px' },
      })}
    >
      {children}
    </Box>
  </Box>
);
export default ProfileLayout;
