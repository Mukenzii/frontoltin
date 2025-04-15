import React from 'react';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import {
  // AudioIcon,
  BookIcon,
  HomeIcon,
  OrderIcon,
  ProfileIcon,
} from 'components/icons/bottomNav';
import Router, { useRouter } from 'next/router';
import { loadState } from 'utils/storage';
import SearchIcon from 'components/icons/bottomNav/search.icon';
import { useTranslation } from 'next-i18next';

export const BottomMenu = () => {
  const { pathname, asPath } = useRouter();
  const { t } = useTranslation();
  const user = loadState('user');
  const handlePageRouting = (
    event: React.SyntheticEvent<Element, Event>,
    value: number
  ) => {
    switch (value) {
      case 0:
        Router.push('/');
        break;
      case 1:
        Router.push('/filter');
        break;
      case 2:
        Router.push('/filter?book_type=online');
        break;
      case 3:
        if (user) Router.push(`/profile/${user?.guid}`);
        else Router.push(`/login`);
        break;
      // case 4:
      //   Router.push('/orders/ewe');
      //   break;
      default:
        break;
    }
  };
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <BottomNavigation
        showLabels
        // value={value}
        onChange={handlePageRouting}
        sx={{
          '.MuiBottomNavigationAction-label': {
            color: '#242424',
            fontWeight: 'bold',
            '&:focus': {
              color: '#425bfb!important',
            },
          },
        }}
      >
        <BottomNavigationAction
          label="Асосий"
          icon={<HomeIcon color={pathname === '/' ? '#3F51B5' : '#242424'} />}
        />
        <BottomNavigationAction
          label={t('search')}
          icon={
            <SearchIcon color={asPath === '/filter' ? '#3F51B5' : '#242424'} />
          }
        />
        <BottomNavigationAction
          label="Э-китоб"
          icon={
            <BookIcon
              color={
                asPath === '/filter?book_type=online' ? '#3F51B5' : '#242424'
              }
            />
          }
        />
        {/* <BottomNavigationAction
          label="Буюртмалар"
          icon={
            <OrderIcon color={pathname === '/orders' ? '#3F51B5' : '#242424'} />
          }
        /> */}
        <BottomNavigationAction
          label="Профиль"
          icon={
            <ProfileIcon
              color={pathname === '/profile/[guid]' ? '#3F51B5' : '#242424'}
            />
          }
        />
      </BottomNavigation>
    </Box>
  );
};
