import React from 'react';
import Head from 'next/head';
import Main from 'layouts/main';
import Image from 'next/image';
import {
  Container,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Stack,
} from '@mui/material';
import photo from 'assets/placeholder.jpg';
import PageBreadcrumb from 'components/breadcrumb';

const Contact = () => {
  const theme = useTheme();
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Main>
      <Head>
        <title>Биз хакимизида</title>
      </Head>
      <PageBreadcrumb pageData={[{ title: 'Биз хакимизида', link: '#' }]} />
      <Container maxWidth="lg" sx={{ minHeight: '60vh' }}>
        <Stack
          gap={4}
          direction={isMobile ? 'column' : 'row'}
          margin="20px 0 50px"
        >
          <Image
            src={photo}
            max-width={isMobile ? 300 : 1500}
            height={370}
            alt=""
          />
          <Box>
            <Typography variant="h1" fontSize="30px" lineHeight="56px">
              Биз хакимизида
            </Typography>
            <Typography
              variant="body2"
              fontWeight={500}
              fontSize="14px"
              lineHeight="26px"
              textAlign="justify"
              color="green"
            >
              Zukko Kitobxon haqida malumot ko&apos;p, ammo nimadan boshlay ?!
            </Typography>
            {/* <Typography
              variant="body1"
              fontWeight={400}
              fontSize="14px"
              lineHeight="26px"
            >
              da.
            </Typography> */}
          </Box>
        </Stack>
      </Container>
    </Main>
  );
};

export default Contact;
