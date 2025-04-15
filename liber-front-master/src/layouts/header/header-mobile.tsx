import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import Logo from '../../assets/svg/Logo.svg';
import SearchIcon from '../../components/icons/search.icon';
import { Paths } from '../../config/site-paths';
import { Button } from '../../components/button';
import { Categories } from './components/categories';
import { HeaderContent, HeaderWrapper } from './header.styles';

const HeaderMobile = () => {
  const router = useRouter();
  const ismobile = true;
  const handleSearchFieldClick = () => {
    if (router.pathname === '/filter') return;
    router.push(Paths.FILTER);
  };
  return (
    <HeaderWrapper padding="10px 0">
      <Container maxWidth="lg">
        <HeaderContent justify="space-between">
          <Link href="/" passHref>
            <Image src={Logo} alt="logo" width="165px" height={44} />
          </Link>
          <HeaderContent justify="flex-end">
            <Categories isLabel={false} {...{ ismobile }} />
            {router.pathname !== '/filter' && (
              <Button
                style={{ textAlign: 'right', padding: '12px 0px 8px 20px' }}
                onClick={handleSearchFieldClick}
              >
                <SearchIcon />
              </Button>
            )}
          </HeaderContent>
        </HeaderContent>
      </Container>
    </HeaderWrapper>
  );
};

export default HeaderMobile;
