import React from 'react';
import { useFavouriteList } from 'services/api/use-favourite';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { get } from 'lodash';
import SmallProductCardSkeleton from 'routes/product-detail/components/small-product-card/small-product.skeleton';
import { SmallProductCard } from 'routes/product-detail/components/small-product-card';
import { Title } from './styles/tabs-title.style';

const SavedBooks = () => {
  const { t } = useTranslation();
  const { data, refetch, isFetching } = useFavouriteList();
  const fakeArray = new Array(6).fill('s');
  return (
    <Box>
      <Title>{t('saved-books')}</Title>
      <Grid container spacing={4}>
        {!isFetching &&
          get(data, 'results', []).map((book: any) => (
            <Grid key={get(book, 'guid')} item xs={6}>
              <Link
                key={get(book, 'guid')}
                href={`/books/${get(book, 'book_guid')}`}
                passHref
              >
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a>
                  <SmallProductCard isSavedTabs {...{ book, refetch }} />
                </a>
              </Link>
            </Grid>
          ))}
        {isFetching &&
          fakeArray.map((item, index) => (
            <Grid key={(item + index).toString()} item xs={6}>
              <SmallProductCardSkeleton />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default SavedBooks;
