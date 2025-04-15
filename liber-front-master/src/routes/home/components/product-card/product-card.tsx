import React from 'react';
import DefaultImage from 'assets/png/default.png';
import Image from 'next/image';
import { Typography } from '@mui/material';
import { get } from 'lodash';
import {
  ImageWrapperFeatured,
  ProductCardWrapper,
} from './product-card.styles';

const ProductCard = ({
  books,
}: {
  books: { title: string; thumbnail: string };
}) => (
  <ProductCardWrapper>
    <ImageWrapperFeatured>
      <Image
        src={
          get(books, 'book.thumbnail.length') > 0
            ? get(books, 'book.thumbnail')
            : DefaultImage.src
        }
        width={200}
        height={300}
        objectFit="cover"
        alt={get(books, 'book.title')}
      />
    </ImageWrapperFeatured>

    <Typography
      variant="subtitle1"
      fontWeight={400}
      sx={{
        display: '-webkit-box',
        '-webkit-line-clamp': '2',
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {get(books, 'book.title')}
    </Typography>
  </ProductCardWrapper>
);

export default ProductCard;
