import { Container, Stack, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import React, { useContext } from 'react';
// eslint-disable-next-line import/no-unresolved
import Logo from 'assets/svg/Logo.svg';
import { useUser } from 'services/api/user';
import UserIcon from 'components/icons/user.icon';
import { Button } from 'components/button';
import Default from 'assets/png/default.png';
import Link from 'next/link';
import ChangerContext from 'context/is-changed';
import { get } from 'lodash';
import Router from 'next/router';
import { loadState } from 'utils/storage';
import { useTranslation } from 'react-i18next';
import { SearchField } from './components/search-field';
import { LanguageChanger } from './components/language-changer';
import { HeaderContent, HeaderWrapper, ImageWrapper } from './header.styles';
// import Cart from './components/cart';

const Header = () => {
  const { isChanged } = useContext(ChangerContext);
  const { t } = useTranslation('common');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const user = loadState('user');
  const { data } = useUser(user?.guid as string, isChanged);

  return (
    <HeaderWrapper>
      <Container maxWidth="lg">
        <HeaderContent justify="space-between">
          <Link href="/" passHref>
            <Image src={Logo} alt="logo" width="165px" height={44} />
          </Link>
          {!isMobile && <SearchField isLabel isnotmobile={!isMobile} />}
          <Stack gap={isMobile ? 0 : '20px'} direction="row">
            <LanguageChanger />
            {/* {!isMobile && <Cart />} */}
            <Stack gap="20px" direction="row">
              {!isMobile &&
                (!user ? (
                  <Button
                    variant="contained"
                    startIcon={<UserIcon />}
                    type="button"
                    onClick={() => Router.push('/login')}
                  >
                    {t('login')}
                  </Button>
                ) : (
                  <Link href={`/profile/${user?.guid}?activeTab=1`} passHref>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a>
                      <ImageWrapper>
                        <Image
                          src={get(data, 'profile_picture') || Default}
                          // layout="fill"
                          width="50px"
                          height="50px"
                          objectFit="cover"
                          alt=""
                        />
                      </ImageWrapper>
                    </a>
                  </Link>
                ))}
            </Stack>
          </Stack>
        </HeaderContent>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
