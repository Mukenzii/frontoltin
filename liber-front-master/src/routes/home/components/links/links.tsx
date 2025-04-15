import { Container, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import React from 'react';
import { LinksWrapper } from './links.styles';

const Links = () => {
  const { t } = useTranslation();
  const links = [
    {
      label: t('audioBooks'),
      href: '/filter?book_type=audio',
    },
    {
      label: t('eBooks'),
      href: '/filter?book_type=online',
    },
    {
      label: t('paperBooks'),
      href: '/filter?book_type=paper',
    },
    {
      label: t('contacts'),
      href: '/contact',
    },
    {
      label: t('aboutUs'),
      href: '/about-us',
    },
  ];
  return (
    <LinksWrapper>
      <Container maxWidth="lg">
        <Stack direction="row" gap="20px">
          {links.map((link) => (
            <Link key={link.label} href={link.href} passHref>
              <Typography component="a" color="primary" variant="h6">
                {link.label}
              </Typography>
            </Link>
          ))}
        </Stack>
      </Container>
    </LinksWrapper>
  );
};

export default Links;
