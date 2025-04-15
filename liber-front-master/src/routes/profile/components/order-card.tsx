import React from 'react';
import Default from 'assets/png/default.png';
import Image from 'next/image';
import {
  Grid,
  Rating,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
  Alert,
} from '@mui/material';
import StarIcon from 'components/icons/star.icon';
import { COLORS } from 'config/styles-config';
import StarWhiteIcon from 'components/icons/star-white.icon';
import Link from 'next/link';
import ProductCharacteristics from 'components/cards/product-card/product-characteristics';
import { get } from 'lodash';
import { Paths } from 'config/site-paths';
import {
  ProductCardWrapper,
  ProductCardImage,
  ProductCardInfo,
} from '../../../components/cards/product-card/product-card.styles';

interface OrderCardProps {
  product?: object;
}

const OrderCard: React.FC<OrderCardProps> = ({ product }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Link href={`${Paths.PRODUCT_DETAIL}${get(product, 'book_guid')}`} passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a>
        <ProductCardWrapper horizontal>
          <Grid container columnSpacing={2}>
            <Grid item lg={2} md={3} xs={6} sm={12} width="100%">
              <ProductCardImage
                isnotmobile={!isMobile}
                horizontal
                profileTab
                orderTab
              >
                <Image
                  layout="fill"
                  src={get(product, 'book_image') || Default}
                  alt={get(product, 'book_title')}
                  objectFit="cover"
                />
              </ProductCardImage>
            </Grid>
            <Grid item lg={10} md={9} xs={6} sm={12}>
              <ProductCardInfo>
                <Stack
                  direction={!isMobile ? 'row' : 'column'}
                  justifyContent="space-between"
                >
                  <Stack>
                    <Typography
                      fontSize={!isMobile ? '24px' : '22px'}
                      marginTop={!isMobile ? '0' : '10px'}
                      fontWeight={500}
                    >
                      {get(product, 'book_title')}
                    </Typography>
                    <Typography variant="subtitle2" color="primary">
                      {get(product, 'category_title')}
                    </Typography>
                  </Stack>

                  <Stack
                    gap={1}
                    marginTop={!isMobile ? '0' : '10px'}
                    marginBottom={!isMobile ? '0' : '10px'}
                  >
                    <Rating
                      icon={<StarIcon color={COLORS.secondary} />}
                      emptyIcon={<StarWhiteIcon />}
                      defaultValue={get(product, 'get_review.rate')}
                      readOnly
                    />
                    <Stack gap={2} alignItems="flex-end" direction="row">
                      <Typography variant="h5" fontWeight={600}>
                        {get(product, 'get_review.rate')}
                      </Typography>
                      <Typography variant="subtitle2" color={COLORS.disabled}>
                        Фикрлар: {get(product, 'category')} та
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Typography variant="subtitle2">Буюртма ҳолати:</Typography>
                {get(product, 'status') === 'pending' && (
                  <Alert severity="info">Буюртма тайёрланмоқда ...</Alert>
                )}
                {get(product, 'status') === 'accepted' && (
                  <Alert severity="success">Буюртма етказиб берилган!</Alert>
                )}
                {get(product, 'status') === 'cancelled' && (
                  <Alert severity="error">Буюртма бекор қилинган!</Alert>
                )}
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
                      name="Буюртма ID"
                      value={get(product, 'order_number')}
                    />
                    <ProductCharacteristics
                      name="Буюртма сони"
                      value={`${get(product, 'quantity')} дона`}
                    />
                    <ProductCharacteristics
                      name="Нархи"
                      value={`${Number(
                        get(product, 'total_price')
                      ).toLocaleString()} cўм`}
                    />
                  </Stack>
                </Stack>
              </ProductCardInfo>
            </Grid>
          </Grid>
        </ProductCardWrapper>
      </a>
    </Link>
  );
};

export default OrderCard;
