import React from 'react';
import Head from 'next/head';
import Main from 'layouts/main';
import {
  Container,
  Box,
  Stack,
  Typography,
  TextareaAutosize,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CallContactIcon from 'components/icons/call-contact.icon';
import PostIcon from 'components/icons/post.icon';
import AdressIcon from 'components/icons/adress.icon';
import { Input } from 'components/input';
import { Button } from 'components/button';
import PageBreadcrumb from 'components/breadcrumb';

const style = {
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '22px',
  color: '#352524',
};

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Main>
      <Head>
        <title>Contact Page</title>
      </Head>
      <PageBreadcrumb pageData={[{ title: 'Контакты', link: '#' }]} />
      <Container maxWidth="lg">
        <Stack
          direction={isMobile ? 'column' : 'row'}
          spacing="10px"
          sx={{ minHeight: '800px', margin: '20px 0' }}
        >
          <Box
            sx={{
              width: isMobile ? '100%' : '35%',
              p: '40px 20px',
              background: '#F1F3F4',
              borderTopLeftRadius: '15px',
              borderBottomLeftRadius: '15px',
              boxSizing: 'border-box',
            }}
          >
            <Box
              sx={{
                p: '20px 28px',
                background: '#fff',
                borderRadius: '12px',
              }}
            >
              <Stack direction="row" alignItems="center">
                <CallContactIcon />
                <Stack marginLeft="13px">
                  <Typography sx={style}>+998 95 169-8555 </Typography>
                  <Typography sx={style}>+998 95 169-8555 </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" marginTop="20px">
                <AdressIcon />
                <Stack marginLeft="13px">
                  <Typography sx={style}>
                    Toshkent sh, Chilonzor 9KV, 11A
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" marginTop="20px">
                <PostIcon />
                <Stack marginLeft="13px">
                  <Typography sx={style}>liber@gmail.com</Typography>
                </Stack>
              </Stack>
            </Box>
            <Typography
              variant="h3"
              fontSize="24px"
              fontWeight="600"
              lineHeight="42px"
              marginTop="26px"
            >
              Тезкор алоқа
            </Typography>
            <Typography
              variant="subtitle1"
              fontSize="12px"
              fontWeight="400"
              color="#333"
            >
              Бизга хабарингизни колдиринг. Сизнинг хабарингизни албатта
              инобатга оламиза!
            </Typography>

            <Input
              placeholder="Исмингиз"
              sx={{ width: '100%', marginTop: '20px' }}
            />
            <Input
              placeholder="Е-маил"
              sx={{ width: '100%', marginTop: '20px' }}
            />
            <Input
              placeholder="Сарлавҳа"
              sx={{ width: '100%', marginTop: '20px' }}
            />
            <TextareaAutosize
              aria-label="minimum height"
              placeholder="Тўлиқ матн"
              minRows={5}
              style={{
                boxSizing: 'border-box',
                border: 'none',
                outline: 'none',
                width: '100%',
                borderRadius: '12px',
                padding: '16px 12px 14px 12px',
                marginTop: '20px',
              }}
            />
            <Button
              variant="contained"
              size="large"
              sx={{ marginTop: '20px', borderRadius: '14px' }}
            >
              Хабарни юбориш
            </Button>
          </Box>
          <Box
            sx={{
              borderTopRightRadius: '15px',
              borderBottomRightRadius: '15px',
              overflow: 'hidden',
            }}
          >
            <iframe
              title="maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11988.37846886121!2d69.22802430396729!3d41.306805225242854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8bafbbf3ceff%3A0xe23b1ad006da350d!2sKamolon%20Masjidi!5e0!3m2!1suz!2s!4v1658841206651!5m2!1suz!2s"
              width={isMobile ? '400' : '800'}
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Box>
        </Stack>
      </Container>
    </Main>
  );
};

export default Contact;
