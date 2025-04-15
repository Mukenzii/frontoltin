import {
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'next-i18next';
import UzCard from 'assets/png/uzcard.png';
import { useRouter } from 'next/router';
import { get } from 'lodash';
import Humocard from 'assets/png/humocard.png';
import Payme from 'assets/png/payme.png';
import {
  FooterDownWrapper,
  FooterWrapper,
  PaymentTypes,
} from './footer.styles';
import footerLinks, { socialLins } from './footer-links';

const Footer = () => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <footer>
      <FooterWrapper>
        <Container maxWidth="lg">
          <Grid container rowGap="3rem">
            {footerLinks.map((item) => (
              <Grid
                key={item.title_uz.toString()}
                item
                lg={3}
                md={3}
                sm={6}
                xs={12}
              >
                <Stack gap="18px" width="96%">
                  <Typography variant="h6" fontWeight={700}>
                    {get(item, `title_${locale}`)}
                  </Typography>
                  {item.links.map((link) =>
                    link.img ? (
                      <Link key={link.toString()} href={link.href} passHref>
                        <Image layout="fixed" src={link.img} alt="stores" />
                      </Link>
                    ) : (
                      <Link
                        key={get(link, `label_${locale}`)}
                        href={link.href}
                        passHref
                      >
                        <Typography
                          variant="body1"
                          fontSize="18px"
                          component="a"
                        >
                          {get(link, `label_${locale}`)}
                        </Typography>
                      </Link>
                    )
                  )}
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </FooterWrapper>
      <FooterDownWrapper {...{ isMobile }}>
        <Container maxWidth="lg">
          <Grid container rowGap="2rem">
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Stack gap="12px">
                <Typography color="white" variant="body2">
                  {t('social-networks')}
                </Typography>
                <Stack direction="row" gap="24px">
                  {socialLins.map((link) => (
                    <Link key={link.toString()} passHref href={link.link}>
                      <a href={link.link}>
                        <link.Icon />
                      </a>
                    </Link>
                  ))}
                </Stack>
              </Stack>
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Stack gap="12px">
                <Typography color="white" variant="body2">
                  {t('connection')}
                </Typography>
                <Stack direction="row" gap="1.5rem">
                  <Typography color="white" variant="body1" fontWeight={300}>
                    +998 90 253 77 53
                  </Typography>
                  <Typography color="white" variant="body1" fontWeight={300}>
                    support@liber.uz
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Stack gap="12px">
                <Typography color="white" variant="body2">
                  {t('we-can-accept')}
                </Typography>
                <Stack direction="row" gap="0.5rem">
                  <PaymentTypes>
                    <Image
                      layout="fixed"
                      width={46}
                      height={10}
                      src={UzCard}
                      alt="uzcard"
                    />
                  </PaymentTypes>
                  <PaymentTypes>
                    <Image
                      layout="fixed"
                      width={46}
                      height={10}
                      src={Humocard}
                      alt="humocard"
                    />
                  </PaymentTypes>
                  <PaymentTypes>
                    <Image
                      layout="fixed"
                      width={46}
                      height={10}
                      src={Payme}
                      alt="payme"
                    />
                  </PaymentTypes>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </FooterDownWrapper>
    </footer>
  );
};

export default Footer;
