import { Rating } from '@mui/material';
import StarWhiteIcon from 'components/icons/star-white.icon';
import StarIcon from 'components/icons/star.icon';
import { COLORS } from 'config/styles-config';
import { get } from 'lodash';
import React from 'react';

const CustomRating: React.FC<{
  rate?: number;
  setRate?: (value: number) => void;
  readOnly?: boolean;
}> = (props) => {
  const handleRate = (event: React.SyntheticEvent<Element, Event>) => {
    if (props.setRate) {
      props.setRate(Number(get(event, 'target.value')));
    }
  };
  return (
    <Rating
      defaultValue={props.rate}
      icon={<StarIcon color={COLORS.secondary} />}
      emptyIcon={<StarWhiteIcon color={COLORS.secondary} fontSize="inherit" />}
      readOnly={props.readOnly || false}
      onChange={handleRate}
      {...props}
    />
  );
};

export default CustomRating;
