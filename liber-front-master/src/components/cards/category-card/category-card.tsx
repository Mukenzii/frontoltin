import React from 'react';
import { Typography } from '@mui/material';
import Image from 'next/image';
import Placeholder from 'assets/png/placeholder.png';
import { useRouter } from 'next/router';
import { get } from 'lodash';
import { CategoryCardWrapper, CategoryTitle } from './category-card.styles';

interface ICategory {
  category: {
    title: string;
    thumbnail: string;
  };
}

const CategoryCard: React.FC<ICategory> = ({ category }) => {
  const { locale } = useRouter();

  return (
    <CategoryCardWrapper>
      <Image
        src={get(category, `thumbnail`)}
        alt={get(category, `title_${locale}`)}
        layout="fill"
      />
      <CategoryTitle>
        <Typography
          fontWeight={600}
          color="white"
          variant="subtitle1"
          fontSize="18px"
        >
          {get(category, `title_${locale}`)}
        </Typography>
      </CategoryTitle>
    </CategoryCardWrapper>
  );
};

export default CategoryCard;
