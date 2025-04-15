import { Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { IBook } from 'routes/product-detail/types';
import { get } from 'lodash';
import Default from 'assets/png/default.png';
import StarIcon from 'components/icons/star.icon';
import { COLORS } from 'config/styles-config';
import { useDeleteFavourite } from 'services/mutate/favourite';
import { Button } from 'components/button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { SmallProductCardImage } from './small-product.card.styles';

interface SavedProps {
  isSavedTabs?: boolean;
  isnotmobile?: boolean;
  book?: IBook;
  locale?: string;
  refetch?: any;
}

const SmallProductCard: React.FC<SavedProps> = ({
  isSavedTabs,
  isnotmobile,
  book,
  locale,
  refetch,
}) => {
  const deleteFavorite = useDeleteFavourite();
  const handleFavourite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    deleteFavorite.mutate(
      { guid: get(book, 'guid', '') },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };
  return (
    <Grid
      container
      columnSpacing={5}
      flexWrap={isnotmobile ? 'wrap' : 'nowrap'}
      sx={{ width: isSavedTabs ? '300' : 'auto' }}
    >
      <Grid item xs={isSavedTabs ? 4 : 5}>
        <SmallProductCardImage>
          <Image
            src={get(book, 'thumbnail') || Default}
            alt={get(book, 'title')}
            layout="fill"
          />
        </SmallProductCardImage>
      </Grid>
      <Grid item xs={isSavedTabs ? 8 : 7}>
        <Stack flexWrap="wrap" gap="0.5rem">
          <Typography fontSize="18px" fontWeight={600}>
            {get(book, 'title')}
          </Typography>
          <Typography variant="subtitle2" color="primary">
            {get(book, `category_${locale}`)}
          </Typography>
          <Stack direction="column" gap="12px">
            <Stack direction="row" gap="12px">
              <StarIcon color={COLORS.secondary} />
              <Typography fontSize="18px" fontWeight={600} color="secondary">
                {get(book, 'get_review.rate')}
              </Typography>
            </Stack>
            <Typography
              fontSize="18px"
              fontWeight={600}
              color={COLORS.disabled}
            >
              Фиклар: {get(book, 'get_review.review_count')}
            </Typography>
          </Stack>
          {isSavedTabs && (
            <Stack sx={{ alignItems: 'flex-end' }}>
              <div title="Сараланганлардан учириш">
                <Button
                  size="small"
                  variant="text"
                  sx={{
                    padding: '0.3rem!important',
                    width: '30px',
                  }}
                  onClick={handleFavourite}
                >
                  <FavoriteIcon fontSize="medium" sx={{ color: '#3748a6' }} />
                </Button>
              </div>
            </Stack>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SmallProductCard;
