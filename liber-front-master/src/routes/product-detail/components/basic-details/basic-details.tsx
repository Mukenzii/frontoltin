/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import Default from 'assets/png/default.png';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import CustomRating from 'components/custom-rating';
import HeadPhoneIcon from 'components/icons/headphone.icon';
import BookmarkIcon from 'components/icons/bookmark.icon';
import ChatIcon from 'components/icons/chat.icon';
import ProductCharacteristics from 'components/cards/product-card/product-characteristics';
import { useDeleteFavourite, useFavourite } from 'services/mutate/favourite';
import { Button } from 'components/button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShippingIcon from 'components/icons/shipping.icon';
import { COLORS } from 'config/styles-config';
import { get, groupBy } from 'lodash';
import {
  BasicDetailsWrapper,
  BasicProductImage,
} from './basic-detiails.sytles';
import PaymentModal from '../payment';
import PayByWallet from '../payment/pay-by-wallet';

// import dynamic from 'next/dynamic';
// import { useBookFile } from 'services/api/use-book-file';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
// const AuidoRoute = dynamic(() => import('components/audio-player/auido'), {
//   ssr: false,
// });

const BasicDetails = ({ isnotmobile, data, locale }: any) => {
  const { t } = useTranslation();
  const [state, setState] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);

  const [bookDetail, setBookDetail] = useState({});
  const { mutate } = useFavourite();
  const deleteFavorite = useDeleteFavourite();

  const handleFavourite = () => {
    setState(!state);
    if (state) {
      deleteFavorite.mutate({ guid: get(data, 'guid') });
    } else {
      mutate({ book: get(data, 'guid') });
    }
  };
  const handlePaymentFromWallet = (value: any) => {
    setIsOrderSuccess(false);
    setOpenPaymentModal(true);
    setBookDetail(value);
  };
  // const [isActiveAudio, setIsActiveAudio] = useState(false);
  // const bookFiles = useBookFile(get(data, 'guid'));
  // const handleListenAudio = () => {
  //   if (get(bookFiles, 'data.audio_books.length') > 0) setIsActiveAudio(true);
  // };
  // const handleEpubRedirect = () => {
  //   Router.push(`/books/read-online/${get(data, 'guid')}`);
  // };
  const groupByBookType = groupBy(
    get(data, 'types', []),
    (type) => type.book_type
  );
  return (
    <>
      <Grid item xs={3} padding={isnotmobile ? 0 : '0 1rem'} width="100%">
        <BasicProductImage>
          <Image
            src={get(data, 'thumbnail') || Default}
            alt={get(data, 'title')}
            layout="fill"
          />
          <Box
            sx={{
              position: 'absolute',
              right: 10,
              top: 5,
            }}
          >
            <Button
              size="small"
              sx={{ padding: '0.3rem!important', minWidth: '100%!important' }}
              onClick={handleFavourite}
            >
              {state ? (
                <FavoriteIcon fontSize="medium" sx={{ color: '#fff' }} />
              ) : (
                <FavoriteBorderIcon fontSize="medium" sx={{ color: '#fff' }} />
              )}
            </Button>
          </Box>
        </BasicProductImage>
      </Grid>
      <Grid
        item
        xs={9}
        paddingLeft={isnotmobile ? 0 : '0px!important'}
        padding={isnotmobile ? 0 : '0 1rem!important'}
      >
        <BasicDetailsWrapper>
          <Stack
            alignItems="baseline"
            direction={isnotmobile ? 'row' : 'column'}
            justifyContent="space-between"
            width="100%"
          >
            <Stack width={isnotmobile ? 'max-content' : '100%'}>
              <Typography variant="h4" fontSize={isnotmobile ? '30px' : '24px'}>
                {get(data, 'title')}
              </Typography>
              <Typography
                variant="subtitle2"
                color="primary"
                marginTop={isnotmobile ? '0' : '10px'}
              >
                {get(data, `category.title_${locale}`)}
              </Typography>
            </Stack>
            <Stack
              width={isnotmobile ? 'fit-content' : '100%'}
              gap={isnotmobile ? '3rem' : '1rem'}
              direction={isnotmobile ? 'row' : 'column'}
              marginTop={isnotmobile ? '0' : '10px'}
            >
              <Stack
                direction="row"
                gap="1.5rem"
                justifyContent="space-between"
              >
                <Stack direction="row" gap="1.25rem">
                  <HeadPhoneIcon />
                  <BookmarkIcon />
                </Stack>
                <CustomRating rate={get(data, 'get_review.rate')} readOnly />
                <Typography variant="h5">
                  {Number.isInteger(get(data, 'get_review.rate'))
                    ? `${get(data, 'get_review.rate')}.0`
                    : get(data, 'get_review.rate')}
                </Typography>
              </Stack>
              <Stack alignItems="center" direction="row" gap="12px">
                <ChatIcon />
                <Typography variant="subtitle2">
                  {t('comments')}:{` ${get(data, 'get_review.review_count')}`}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 300, textAlign: 'justify' }}
          >
            {get(data, `short_description_${locale}`)}
          </Typography>
          <Stack gap="3rem" direction="row">
            <ProductCharacteristics
              name={t('author')}
              value={get(data, 'author')}
            />
            <ProductCharacteristics
              name={t('publisher')}
              value={get(data, 'publisher')}
            />
            <ProductCharacteristics
              name={t('year')}
              value={get(data, 'published_date')}
            />
          </Stack>
        </BasicDetailsWrapper>
        <Stack
          margin="1.5rem 0"
          gap="1rem"
          direction={isnotmobile ? 'row' : 'column'}
        >
          {Number(get(groupByBookType, 'paper[0].price')) !== 0 && (
            <Button
              curved
              fullWidth
              size="small"
              startIcon={<ShippingIcon color={COLORS.white} />}
              variant="contained"
              onClick={() => setOpenModal(true)}
            >
              {t('buy')} -{' '}
              {Number(get(groupByBookType, 'paper[0].price')).toLocaleString()}{' '}
              сум
            </Button>
          )}
          {Number(get(groupByBookType, 'audio[0].price')) !== 0 && (
            <Button
              curved
              fullWidth
              size="small"
              startIcon={<HeadPhoneIcon />}
              variant="outlined"
              onClick={() =>
                handlePaymentFromWallet(get(groupByBookType, 'audio[0]'))
              }
            >
              {t('listen-audio')} -{' '}
              {Number(get(groupByBookType, 'audio[0].price')).toLocaleString()}{' '}
              сум
            </Button>
          )}
          {Number(get(groupByBookType, 'online[0].price')) !== 0 && (
            <Button
              curved
              fullWidth
              size="small"
              startIcon={<BookmarkIcon />}
              variant="outlined"
              onClick={() =>
                handlePaymentFromWallet(get(groupByBookType, 'online[0]'))
              }
            >
              {t('read-book')} -{' '}
              {Number(get(groupByBookType, 'online[0].price')).toLocaleString()}{' '}
              сум
            </Button>
          )}

          {/* <Button
            curved
            size="small"
            startIcon={<HeadPhoneIcon />}
            variant="outlined"
            onClick={handleListenAudio}
          >
            Аудио китобни тинглаш
          </Button>
          <Button
            curved
            size="small"
            startIcon={<HeadPhoneIcon />}
            variant="outlined"
            onClick={handleEpubRedirect}
          >
            Электрон китобни ўқиш
          </Button> */}
        </Stack>
      </Grid>
      {/* {isActiveAudio && (
        // @ts-ignore:next-line
        <AuidoRoute audioFiles={get(bookFiles, 'data.audio_books')} />
      )} */}
      <PaymentModal
        {...{ openModal, setOpenModal, data }}
        bookPrice={Math.floor(Number(get(data, 'types[1].price')))}
      />
      <PayByWallet
        {...{
          openPaymentModal,
          setOpenPaymentModal,
          data,
          bookDetail,
          isOrderSuccess,
          setIsOrderSuccess,
        }}
      />
    </>
  );
};

export default BasicDetails;
