import {
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import PageBreadcrumb from 'components/breadcrumb';
import { Button } from 'components/button';
import { StyledTab, StyledTabs, TabPanel } from 'components/tabs';
import { COLORS } from 'config/styles-config';
import { get } from 'lodash';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { useBookFile } from 'services/api/use-book-file';
import { useRelatedBook } from 'services/api/use-relatedbook';
import { BasicDetails } from './components/basic-details';
import Comments from './components/comments';
import CompleteDetails from './components/complete-details';
import SmallProductCardSkeleton from './components/small-product-card/small-product.skeleton';
import { SmallProductCard } from './components/small-product-card';
import { IBook } from './types';

const ProductDetailsPage: React.FC<{ data?: IBook; locale?: string }> = ({
  data,
  locale,
}) => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const { t } = useTranslation();
  const { query } = useRouter();
  const fakeArray = new Array(3).fill('s');
  const isnotmobile = useMediaQuery(theme.breakpoints.up('md'));
  const relatedBooks = useRelatedBook(query?.guid as string);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  console.log(data);
  // const bookFile = useBookFile('20585c0c-86a3-441e-a54e-1d961d6adbcc').data;
  return (
    <>
      <PageBreadcrumb
        pageData={[
          { title: 'Филтр', link: '/filter' },
          { title: get(data, 'title'), link: '/profile' },
        ]}
      />
      <Container sx={{ padding: '1.5rem 0' }} maxWidth="lg">
        <Grid container columnSpacing={isnotmobile ? 2 : 0}>
          <BasicDetails isnotmobile={isnotmobile} {...{ data, locale }} />
          <Grid
            item
            xs={9}
            padding={isnotmobile ? 'auto' : '0 1rem'}
            width="100%"
          >
            <Stack>
              <StyledTabs
                value={value}
                onChange={handleChange}
                aria-label="styled tabs example"
              >
                <StyledTab label={t('information')} isMobile={!isnotmobile} />
                <StyledTab label={t('comments')} isMobile={!isnotmobile} />
              </StyledTabs>
              <TabPanel value={value} index={0}>
                <CompleteDetails {...{ data, locale }} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Comments {...{ data, locale }} />
              </TabPanel>
            </Stack>
          </Grid>
          <Grid item xs={3} padding={isnotmobile ? 'auto' : '0 1rem'}>
            <Stack marginTop="2rem" gap="1rem">
              <Typography variant="h4" fontSize="2rem">
                {t('related-books')}
              </Typography>
              {!relatedBooks.isFetching &&
                get(relatedBooks, 'data.results', []).map((book: IBook) => (
                  <Link
                    key={get(book, 'guid')}
                    href={`/books/${get(book, 'guid')}`}
                    passHref
                  >
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a>
                      <SmallProductCard
                        isnotmobile={isnotmobile}
                        {...{ book, locale }}
                      />
                    </a>
                  </Link>
                ))}
              {relatedBooks.isFetching &&
                fakeArray.map((item, index) => (
                  <SmallProductCardSkeleton
                    key={(item + index).toString()}
                    relatedBook
                  />
                ))}
              <Button
                sx={{ backgroundColor: COLORS.lightBg }}
                size="large"
                fullWidth
                variant="text"
                onClick={() =>
                  Router.push(`/filter/?category=${get(data, 'category.guid')}`)
                }
              >
                {t('load-more')}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProductDetailsPage;
