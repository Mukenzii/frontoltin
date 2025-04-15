/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Link, Typography } from '@mui/material';
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { CategoryCard } from 'components/cards/category-card';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { useQuery } from 'react-query';
import { get } from 'lodash';
import SwiperCore, { Navigation } from 'swiper';
import { COLORS } from 'config/styles-config';
import { getAllData } from 'services/api/get';
// import { CarouselWrapper } from './categories.styles';
import CategorySkeleton from './category.skeleton';
import ArrowIcon from '../../../../components/icons/arrow.icon';

SwiperCore.use([Navigation]);

const Categories = () => {
  const { t } = useTranslation();
  const fakeArray = new Array(10).fill('');
  // const [isInTheEnd, setIsInTheEnd] = React.useState(false);
  const { data, isFetching, isSuccess } = useQuery('categories', () =>
    getAllData('/category/list/')
  );

  return (
    <Box>
      <Typography
        marginBottom="2rem"
        variant="h4"
        sx={(theme) => ({
          [theme.breakpoints.down('md')]: {
            fontSize: '24px',
            fontWeight: 700,
          },
        })}
      >
        {t('ruknlar')}
      </Typography>
      <Box position="relative">
        <Swiper
          // spaceBetween={16}
          // onSlideChange={(swiper) => console.log(swiper)}
          // onReachBeginning={() => setIsInTheEnd(false)}
          // onReachEnd={() => setIsInTheEnd(true)}
          navigation={{
            prevEl: '.prevNav',
            nextEl: '.next',
          }}
          onInit={(swiper: any) => {
            // eslint-disable-next-line no-param-reassign
            swiper.params.navigation.prevEl = '.prevNav';
            // eslint-disable-next-line no-param-reassign
            swiper.params.navigation.nextEl = '.next';
          }}
          // slidesPerView={5}
          breakpoints={{
            // when window width is >= 640px
            300: {
              // width: 640,
              spaceBetween: 20,
              slidesPerView: 1.5,
              // spaceBetween: 100
            },
            // when window width is >= 768px
            400: {
              // width: 768,
              slidesPerView: 1.7,
              spaceBetween: 20,
            },
            500: {
              // width: 768,
              slidesPerView: 3,
              spaceBetween: 20,
            },
            600: {
              // width: 768,
              slidesPerView: 3.5,
              spaceBetween: 20,
            },
            700: {
              // width: 768,
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              // width: 768,
              slidesPerView: 3.5,
              spaceBetween: 20,
            },
            920: {
              // width: 768,
              slidesPerView: 4.5,
              spaceBetween: 20,
            },
            1024: {
              // width: 768,
              slidesPerView: 5.5,
              spaceBetween: 20,
            },
          }}
        >
          {isSuccess &&
            get(data, 'data.results', []).map(
              (item: { title: string; thumbnail: string }) => (
                <SwiperSlide key={get(item, 'guid').toString()}>
                  <Link href={`/filter?category=${get(item, 'guid')}`}>
                    <a>
                      <CategoryCard category={item} />
                    </a>
                  </Link>
                </SwiperSlide>
              )
            )}
          {isFetching &&
            fakeArray.map((item, index) => (
              <SwiperSlide key={(item + index).toString()}>
                <CategorySkeleton />
              </SwiperSlide>
            ))}
        </Swiper>
        {/* {isInTheEnd && ( */}
        {/* <div
          className="prevNav"
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            zIndex: 999,
            transform: 'translate(-50%,-50%)',
            width: '45px',
            height: '45px',
            background: '#FFF',
            boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <ArrowIcon
            color={COLORS.primary}
            style={{ transform: 'rotate(0deg)' }}
          />
        </div> */}
        {/* )} */}
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            top: '50%',
            zIndex: 999,
            transform: 'translate(50%,-50%)',
            boxShadow: '-42px 0px 100px 88px rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
          }}
        >
          <div
            className="next"
            style={{
              width: '45px',
              height: '45px',
              background: '#FFF',
              boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <ArrowIcon
              color={COLORS.primary}
              style={{ transform: 'rotate(180deg)' }}
            />
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Categories;
