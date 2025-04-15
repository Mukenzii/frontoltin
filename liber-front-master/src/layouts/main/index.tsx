import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { BottomMenu } from 'layouts/bottomNavigation';
import { Footer } from 'layouts/footer';
import { Header, HeaderMobile } from 'layouts/header';

const Main: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const theme: any = useTheme();
  const isMobile = useMediaQuery(theme?.breakpoints.down('md'));
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      {isMobile && <BottomMenu />}
    </>
  );
};
export default Main;
