import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { useQuery } from 'react-query';
import { Link } from '@mui/material';
import { getAllData } from 'services/api/get';
import { get } from 'lodash';
import HeroSkeleton from './hero.skeleton';
import { HeroProductCard } from '../product-card';

SwiperCore.use([Navigation]);

const Carousel = () => {
  const { data, isFetching, isSuccess } = useQuery('recommendation', () =>
    getAllData('/book/recommendation/list/?page_size=3/')
  );
  const fakeArray = new Array(10).fill('');

  return (
    <Swiper
      spaceBetween={20}
      key="categoryCarousel"
      slidesPerView={3}
      navigation={{
        prevEl: '.slider-prev',
        nextEl: '.slider-next',
      }}
      breakpoints={{
        300: {
          slidesPerView: 2.2,
        },
        400: {
          slidesPerView: 2.2,
        },
        500: {
          slidesPerView: 2.2,
        },
        600: {
          slidesPerView: 2.2,
        },
        700: {
          slidesPerView: 2.2,
        },
        768: {
          slidesPerView: 2.2,
        },
        920: {
          slidesPerView: 2.2,
        },
        1024: {
          slidesPerView: 3.5,
        },
      }}
    >
      {isSuccess &&
        get(data, 'data.results', []).map(
          (item: { title: string; thumbnail: string }) => (
            <SwiperSlide key={get(item, 'guid').toString()}>
              <Link href={`/books/${get(item, 'book.guid')}`}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a>
                  <HeroProductCard books={item} />
                </a>
              </Link>
            </SwiperSlide>
          )
        )}
      {isFetching &&
        fakeArray.map((item, index) => (
          <SwiperSlide key={(item + index).toString()}>
            <HeroSkeleton />
          </SwiperSlide>
        ))}
      {!isFetching &&
        !isSuccess &&
        fakeArray.map((item, index) => (
          <SwiperSlide key={(item + index).toString()}>
            <HeroSkeleton />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default Carousel;
