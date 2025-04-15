import React, { useState, useContext } from 'react';
import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import { get } from 'lodash';
import PageBreadcrumb from 'components/breadcrumb';
import { useUser } from 'services/api/user';
import { UserDetails } from 'types/user.types';
import ChangerContext from 'context/is-changed';
import { useRouter } from 'next/router';
import { ProfileLayout } from './layout';
import UserCard from './components/user-card';
import Subscription from './tabs/subscription';
import Wallet from './tabs/wallet';
import Books from './tabs/books';
import SavedBooks from './tabs/saved-books';
import Settings from './tabs/settings';
import OrdersTab from './tabs/orders';

const UserProfile = ({ guid }: { guid?: string }) => {
  const { isChanged } = useContext(ChangerContext);
  const { query } = useRouter();
  const activeTab = Number(query?.activeTab) as number;
  const { data, isFetching } = useUser(guid as string, isChanged);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box sx={{ background: '#FBFBFB' }}>
      <>
        <PageBreadcrumb
          pageData={[
            { title: 'Профил', link: '#' },
            { title: get(data, 'first_name'), link: '/profile' },
          ]}
        />

        <Container sx={{ padding: !isMobile ? '0' : '1rem 0' }} maxWidth="lg">
          <UserCard {...{ isMobile, isFetching }} data={data as UserDetails} />
          <ProfileLayout {...{ isMobile }}>
            {activeTab === 1 && (
              <Subscription {...{ isMobile }} userData={data} />
            )}
            {activeTab === 2 && <Wallet {...{ isMobile, data }} />}
            {activeTab === 3 && <Books {...{ isMobile }} />}
            {activeTab === 4 && <SavedBooks />}
            {activeTab === 5 && <OrdersTab />}
            {activeTab === 6 && <Settings {...{ data, guid }} />}
          </ProfileLayout>
        </Container>
      </>
    </Box>
  );
};

export default UserProfile;
