/* eslint-disable import/no-absolute-path */
import React from 'react';
import Default from 'assets/png/default.png';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  Button,
  Grid,
  Link,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import StarIcon from 'components/icons/star.icon';
import HeadPhoneIcon from 'components/icons/headphone.icon';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BookmarkIcon from 'components/icons/bookmark.icon';
import { COLORS } from 'config/styles-config';
import StarWhiteIcon from 'components/icons/star-white.icon';
import {
  ProductCardImage,
  ProductCardInfo,
  ProductCardWrapper,
} from 'components/cards/product-card/product-card.styles';
import { useBookFile } from 'services/api/use-book-file';
import { get } from 'lodash';
import ProductCharacteristics from 'components/cards/product-card/product-characteristics';
import dynamic from 'next/dynamic';

const AuidoRoute = dynamic(() => import('components/audio-player/auido'), {
  ssr: false,
});
interface ProductCardProps {
  horizontal?: boolean;
  isnotmobile?: boolean;
  product?: object;
}

const BooksCard: React.FC<ProductCardProps> = ({
  horizontal,
  isnotmobile,
  product,
  // eslint-disable-next-line arrow-body-style
}) => {
  const { locale } = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const bookFiles = useBookFile(get(product, 'book_guid'));
  const [isActiveAudio, setActiveAudio] = React.useState(false);
  return (
    <>
      {isActiveAudio && (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore:next-line
        <AuidoRoute audioFiles={get(bookFiles, 'data.audio_books')} />
      )}
      <ProductCardWrapper horizontal>
        <Grid container columnSpacing={2}>
          <Grid item xs={3} width="100%">
            <ProductCardImage {...{ isnotmobile, horizontal }} profileTab>
              <Image
                layout="fill"
                // src={Default}
                src={get(product, 'thumbnail') || Default}
                alt={get(product, 'title')}
                // placeholder="blur"
              />
            </ProductCardImage>
          </Grid>
          <Grid item xs={9} sx={{ width: isMobile ? '100%' : '90%' }}>
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
                  >
                    {get(product, 'book') || 'dqwdqw dqwd qw dqw'}
                  </Typography>
                  <Typography variant="subtitle2" color="primary">
                    {get(product, 'category') || 'Category'}
                  </Typography>
                </Stack>
                <Stack
                  gap={2}
                  direction="row"
                  marginTop={isnotmobile ? '0' : '10px'}
                  marginBottom={isnotmobile ? '0' : '10px'}
                >
                  <Rating
                    icon={<StarIcon color={COLORS.secondary} />}
                    emptyIcon={<StarWhiteIcon />}
                    defaultValue={get(product, 'get_review.rate')}
                    readOnly
                  />

                  <Typography variant="h5" fontWeight={600}>
                    {get(product, 'get_review.rate') || 5.0}
                  </Typography>
                  <Typography variant="subtitle1" color={COLORS.disabled}>
                    Фикрлар: {get(product, 'get_review.review_count')} та
                  </Typography>
                </Stack>
              </Stack>
              {/* <Typography variant="subtitle2">
            {get(product, 'short_description') ||
              'qldqwleoqwm qd qondoqwndioqwn dqwdqwi doqw nqo fq fqo f qfq fq fq fj qfj qfj qijfqij '}
          </Typography> */}
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
                    value={get(product, 'publisher')}
                  />
                  <ProductCharacteristics
                    name="Йил"
                    value={get(product, 'published_date')}
                  />
                </Stack>
                <Stack gap="21px" direction="row" marginTop="20px">
                  {get(product, 'book_type') === 'audio' ? (
                    <HeadPhoneIcon />
                  ) : (
                    <BookmarkIcon />
                  )}
                </Stack>
              </Stack>
              <Stack
                direction={isMobile ? 'column' : 'row'}
                gap={isMobile ? 2 : 3}
                sx={{ mt: isMobile ? 2 : 0 }}
              >
                {get(product, 'book_type') === 'audio' ? (
                  <Button fullWidth onClick={() => setActiveAudio(true)}>
                    <HeadPhoneIcon color={COLORS.white} />
                    <Typography
                      variant="button"
                      color={COLORS.white}
                      marginLeft={2}
                    >
                      Тинглаш
                    </Typography>
                  </Button>
                ) : (
                  <Link
                    sx={{ width: '100%' }}
                    href={`/books/read-online/${get(product, 'book_guid')}`}
                  >
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a>
                      <Button fullWidth>
                        <AutoStoriesIcon />
                        <Typography
                          variant="button"
                          color={COLORS.white}
                          marginLeft={2}
                        >
                          Ўқиш
                        </Typography>
                      </Button>
                    </a>
                  </Link>
                )}
                <Link
                  sx={{ width: '100%' }}
                  href={`/${locale}/books/${get(product, 'book_guid')}`}
                >
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a>
                    <Button fullWidth variant="outlined">
                      <VisibilityIcon />
                      <Typography variant="button" marginLeft={2}>
                        Kўриш
                      </Typography>
                    </Button>
                  </a>
                </Link>
              </Stack>
            </ProductCardInfo>
          </Grid>
        </Grid>
      </ProductCardWrapper>
    </>
  );
};

export default BooksCard;
