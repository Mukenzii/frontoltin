import React, { useContext, useEffect, useState } from 'react';
import {
  Divider,
  ListItemIcon,
  MenuItem,
  MenuList,
  Paper,
  Switch,
  Typography,
} from '@mui/material';
import styled from 'styled-components';
import SubscriptionIcon from 'components/icons/user/subscription.icon';
import { useTranslation } from 'next-i18next';
import WalletIcon from 'components/icons/user/wallet.icon';
import BooksIcon from 'components/icons/user/books.icon';
import SavedIcon from 'components/icons/user/saved.icon';
// import ModeIcon from 'components/icons/user/mode.icon';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from 'components/icons/user/settings.icon';
import UserContext from 'context/user';
import Router, { useRouter } from 'next/router';
import { get } from 'lodash';
import OrderIcon from 'components/icons/user/orders.icon';

const MenuWithICon = styled.div`
  width: 100%;
  margin-left: 20px;
  display: flex;
  align-items: center;
`;

const ProfileSidebarMenu = () => {
  const { t } = useTranslation();
  const Menu = [
    { id: 1, name: t('subscription'), icon: <SubscriptionIcon /> },
    { id: 2, name: t('e-wallet'), icon: <WalletIcon /> },
    { id: 3, name: t('my-books'), icon: <BooksIcon /> },
    { id: 4, name: t('saved-books'), icon: <SavedIcon /> },
    { id: 5, name: t('my-orders'), icon: <OrderIcon /> },
    { id: 6, name: t('settings'), icon: <SettingsIcon /> },
    // { id: 7, name: 'Тунги режим', icon: <ModeIcon /> },
    { id: 8, name: t('logout'), icon: <LogoutIcon /> },
  ];
  const [isChecked, setIsChecked] = useState(false);
  const { query } = useRouter();

  const activeTab = Number(query?.activeTab) as number;
  const { setCurrentUser } = useContext(UserContext);
  const handleLogOut = () => {
    localStorage.removeItem('user');
    setCurrentUser({});
    Router.push('/');
  };
  useEffect(() => {
    if (activeTab === 7) {
      setIsChecked(!isChecked);
    }
  }, [activeTab]);

  return (
    <Paper
      sx={(theme) => ({
        width: 300,
        [theme.breakpoints.down('md')]: {
          width: '100%',
        },
      })}
    >
      <MenuList>
        {Menu.map((item) =>
          get(item, 'id') !== 8 ? (
            <MenuItem
              key={item.toString()}
              disableGutters
              onClick={() =>
                Router.push(
                  `/profile/${get(query, 'guid')}?activeTab=${item.id}`
                )
              }
            >
              {activeTab === item.id && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    background: '#3F51B5',
                    width: 2,
                  }}
                />
              )}
              <MenuWithICon>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Typography
                  variant="inherit"
                  sx={{
                    color: '#242424',
                    fontWeight: 400,
                    fontSize: 18,
                    lineHeight: '40px',
                  }}
                >
                  {item.name}
                </Typography>
                {item.id === 7 && (
                  <Switch checked={isChecked} sx={{ marginLeft: 5 }} />
                )}
              </MenuWithICon>
            </MenuItem>
          ) : (
            <MenuItem
              key={item.toString()}
              disableGutters
              onClick={handleLogOut}
            >
              {activeTab === item.id && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    background: '#3F51B5',
                    width: 2,
                  }}
                />
              )}
              <MenuWithICon>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Typography
                  variant="inherit"
                  sx={{
                    color: '#242424',
                    fontWeight: 400,
                    fontSize: 18,
                    lineHeight: '40px',
                  }}
                >
                  {item.name}
                </Typography>
                {item.id === 7 && (
                  <Switch checked={isChecked} sx={{ marginLeft: 5 }} />
                )}
              </MenuWithICon>
            </MenuItem>
          )
        )}
      </MenuList>
    </Paper>
  );
};
export default ProfileSidebarMenu;
