import React from 'react';
import Default from 'assets/png/default.png';
import Image from 'next/image';
import { Grid, Rating, Stack, Typography } from '@mui/material';
import StarIcon from 'components/icons/star.icon';
// import HeadPhoneIcon from 'components/icons/headphone.icon';
// import ShippingIcon from 'components/icons/shipping.icon';
// import BookmarkIcon from 'components/icons/bookmark.icon';
import { COLORS } from 'config/styles-config';
import StarWhiteIcon from 'components/icons/star-white.icon';
import Link from 'next/link';
import { get } from 'lodash';
import { Paths } from 'config/site-paths';
import {
  ProductCardImage,
  ProductCardInfo,
  ProductCardWrapper,
} from './product-card.styles';
import ProductCharacteristics from './product-characteristics';

interface ProductCardProps {
  horizontal?: boolean;
  isnotmobile?: boolean;
  product?: object;
}

const ProductCard: React.FC<ProductCardProps> = ({
  horizontal,
  isnotmobile,
  product,
}) => (
  <Link href={`${Paths.PRODUCT_DETAIL}${get(product, 'guid')}`}>
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <a>
      <ProductCardWrapper horizontal={horizontal}>
        {horizontal ? (
          <Grid container columnSpacing={2}>
            <Grid item xs={3} width="100%">
              <ProductCardImage {...{ isnotmobile, horizontal }}>
                <Image
                  layout="fill"
                  src={get(product, 'thumbnail') || Default}
                  alt={get(product, 'title')}
                  objectFit="cover"
                  // placeholder="blur"
                />
              </ProductCardImage>
            </Grid>
            <Grid item xs={9}>
              <ProductCardInfo>
                <Stack
                  direction={isnotmobile ? 'row' : 'column'}
                  justifyContent="space-between"
                >
                  <Stack>
                    <Typography
                      fontSize={isnotmobile ? '30px' : '22px'}
                      marginTop={isnotmobile ? '0' : '10px'}
                      fontWeight={600}
                      sx={{
                        display: '-webkit-box',
                        webkitLineClamp: 2,
                        webkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {get(product, 'title')}
                    </Typography>
                    <Typography variant="subtitle2" color="primary">
                      {get(product, 'category')}
                    </Typography>
                  </Stack>
                  <Stack
                    gap={1}
                    marginTop={isnotmobile ? '0' : '10px'}
                    marginBottom={isnotmobile ? '0' : '10px'}
                  >
                    <Rating
                      icon={<StarIcon color={COLORS.secondary} />}
                      emptyIcon={<StarWhiteIcon />}
                      defaultValue={get(product, 'rating')}
                      disabled
                    />
                    <Stack gap={2} alignItems="flex-end" direction="row">
                      <Typography variant="h5" fontWeight={600}>
                        {get(product, 'rating')}
                      </Typography>
                      <Typography variant="subtitle2" color={COLORS.disabled}>
                        Фикрлар: {get(product, 'category')} та
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Typography variant="subtitle2">
                  {get(product, 'short_description')}
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-end"
                >
                  <Stack
                    direction="row"
                    alignItems="flex-start"
                    gap="2rem"
                    marginTop={2}
                  >
                    <ProductCharacteristics
                      name="Муаллиф"
                      value={get(product, 'author')}
                    />
                    <ProductCharacteristics
                      name="Нашриёт"
                      value="Printarea Studios"
                    />
                    <ProductCharacteristics name="Йил" value="2019" />
                  </Stack>
                  {/* <Stack gap="21px" direction="row" marginTop="20px">
                    {get(product, 'types').map(
                      (type: { book_type: string; price: string }) =>
                        type.book_type === 'audio' && (
                          <HeadPhoneIcon key={get(product, 'guid')} />
                        )
                    )}
                    {get(product, 'types').map(
                      (type: { book_type: string; price: string }) =>
                        type.book_type === 'online' && (
                          <BookmarkIcon key={get(product, 'guid')} />
                        )
                    )}
                  </Stack> */}
                </Stack>
              </ProductCardInfo>
            </Grid>
          </Grid>
        ) : (
          <>
            <ProductCardImage>
              <Image
                layout="fill"
                // src={Default}
                src={get(product, 'thumbnail') || Default}
                alt={get(product, 'title')}
                // placeholder="blur"
              />
            </ProductCardImage>
            <Stack sx={{ justifyContent: 'space-between', minHeight: '100px' }}>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={(theme) => ({
                  [theme.breakpoints.down('md')]: {
                    fontSize: '16px',
                  },
                  display: '-webkit-box',
                  '-webkit-line-clamp': '2',
                  '-webkit-box-orient': 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                })}
              >
                {get(product, 'title')}
              </Typography>
              <Typography
                variant="subtitle2"
                color="primary"
                fontWeight={300}
                sx={(theme) => ({
                  [theme.breakpoints.down('md')]: {
                    fontSize: '12px',
                  },
                })}
              >
                {get(product, 'category')}
              </Typography>
              <Stack direction="row" justifyContent="space-between">
                <Stack gap="0.35rem" direction="row">
                  <StarIcon color={COLORS.secondary} />
                  <Typography
                    color="secondary"
                    fontSize="18px"
                    fontWeight={700}
                  >
                    {get(product, 'rating')}
                  </Typography>
                </Stack>
                {/* <Stack gap="0.35rem" direction="row">
                  {get(product, 'types').map(
                    (type: { book_type: string; price: string }) =>
                      type.book_type === 'audio' && (
                        <HeadPhoneIcon key={get(product, 'guid')} />
                      )
                  )}
                  {product &&
                    get(product, 'types', []).map(
                      (type: { book_type: string; price: string }) =>
                        type.book_type === 'online' && (
                          <BookmarkIcon key={get(product, 'guid')} />
                        )
                    )}
                </Stack> */}
              </Stack>
            </Stack>
          </>
        )}
      </ProductCardWrapper>
    </a>
  </Link>
);

export default ProductCard;
