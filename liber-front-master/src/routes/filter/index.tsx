import {
  Box,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import HeartIcon from 'components/icons/heart.icon';
import Note from 'components/note/note';
import Link from 'next/link';
import { ProductCard } from 'components/cards/product-card';
import ProductCardSkeleton from 'components/cards/product-card/product-card.skeleton';
import { get } from 'lodash';
import { COLORS } from 'config/styles-config';
import { useFilterContext } from 'context/filter';
import { loadState } from 'utils/storage';
import React from 'react';
import Image from 'next/image';
import PageBreadcrumb from 'components/breadcrumb';
import { useTranslation } from 'next-i18next';
import Empty from 'assets/png/empty.png';
import { getFilter } from 'services/api/use-filter';
import { IBook } from 'routes/product-detail/types';
import Router, { useRouter } from 'next/router';
import { SubscribeButton } from 'routes/home/components/subscribe/subscribe.styles';
import { FilterLayout } from './layout';

const FilterPage = () => {
  const { grid_view } = useFilterContext();
  const perPage = 12;
  const { t } = useTranslation();
  const user = loadState('user');
  const products = new Array(8).fill('s');
  const theme = useTheme();
  const isnotmobile = useMediaQuery(theme.breakpoints.up('md'));
  const { query } = useRouter();
  const handlePagination = (page: number) => {
    Router.push(`/filter?page=${page}`);
  };
  const { data, isSuccess, isFetching } = getFilter(
    (query?.min_price || 0) as number,
    (query?.max_price || 9999999) as number,
    query?.category || '',
    query?.book_type || '',
    (query?.published_date || '') as string,
    Number(query?.page) || 1,
    query?.sort as string,
    (query?.search_value || '') as string
  );

  return (
    <Box sx={{ backgroundColor: COLORS.gray }}>
      <PageBreadcrumb pageData={[{ title: 'Филтр', link: '/filter' }]} />
      <Container maxWidth="lg">
        <FilterLayout isnotmobile={isnotmobile}>
          <Grid columnSpacing={2} rowSpacing={2} container>
            {isSuccess && !isFetching && get(data, 'results.length') === 0 && (
              <Grid>
                <Stack alignItems="center">
                  <Image src={Empty} alt="empty" layout="fixed" />
                  <Typography variant="subtitle2" color="disabled">
                    {t('anything-not-found')}
                  </Typography>
                </Stack>
              </Grid>
            )}
            {isSuccess &&
              !isFetching &&
              get(data, 'results.length') > 0 &&
              get(data, 'results', []).map((product: IBook) => (
                <Grid
                  key={get(product, 'guid').toString()}
                  item
                  lg={grid_view ? 3 : 12}
                  md={grid_view ? 4 : 12}
                  sm={grid_view ? 6 : 12}
                  xs={grid_view ? 6 : 12}
                  sx={{ width: grid_view ? '50%' : '100%' }}
                >
                  <ProductCard horizontal={!grid_view} product={product} />
                </Grid>
              ))}
            {isFetching &&
              products.map((fakeProduct: string, i: number) => (
                <Grid
                  key={(fakeProduct + i).toString()}
                  item
                  lg={grid_view ? 3 : 12}
                  md={grid_view ? 4 : 12}
                  sm={grid_view ? 6 : 12}
                  xs={grid_view ? 6 : 12}
                  sx={{ width: grid_view ? '50%' : '100%' }}
                >
                  <ProductCardSkeleton width="100%" />
                </Grid>
              ))}
          </Grid>
          <Stack
            alignItems={isnotmobile ? 'flex-end' : 'center'}
            sx={{ my: 2 }}
          >
            <Pagination
              count={Math.ceil(get(data, 'count') / perPage)}
              page={Number(query?.page) || 1}
              variant="outlined"
              shape="rounded"
              size={isnotmobile ? 'large' : 'medium'}
              onChange={(event, page: number) => handlePagination(page)}
            />
          </Stack>
          <Stack>
            <Note
              title={t('subscription1.title')}
              description={t('subscription2')}
              button={
                <Link href={`/profile/${user?.guid}?activeTab=1`} passHref>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a>
                    <SubscribeButton
                      sx={{ width: 'max-content' }}
                      startIcon={<HeartIcon />}
                    >
                      {t('subscription1.button')}
                    </SubscribeButton>
                  </a>
                </Link>
              }
              isnotmobile={isnotmobile}
            />
          </Stack>
        </FilterLayout>
      </Container>
    </Box>
  );
};

export default FilterPage;
