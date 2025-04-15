import { Grid, Stack, Typography } from '@mui/material';
import CustomRating from 'components/custom-rating';
import { get } from 'lodash';
import React from 'react';
import { CardWrapper } from '../../../layout/card-wrapper';
import RatingItem from './rating-item';

const CommentDetails = (props: any) => (
  <CardWrapper>
    <Grid columnSpacing={4} container>
      <Grid item xs={4}>
        <Stack gap="14px">
          <Typography variant="h5">Рейтинг</Typography>
          <Typography fontSize="10px">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={4}>
        <Stack gap="1rem">
          <RatingItem
            title={get(props, 'data.get_review.point_five')}
            value={get(props, 'data.get_review.point_five_percent')}
          />
          <RatingItem
            title={get(props, 'data.get_review.point_four')}
            value={get(props, 'data.get_review.point_four_percent')}
          />
          <RatingItem
            title={get(props, 'data.get_review.point_three')}
            value={get(props, 'data.get_review.point_three_percent')}
          />
          <RatingItem
            title={get(props, 'data.get_review.point_two')}
            value={get(props, 'data.get_review.point_two_percent')}
          />
          <RatingItem
            title={get(props, 'data.get_review.point_one')}
            value={get(props, 'data.get_review.point_one_percent')}
          />
        </Stack>
      </Grid>
      <Grid item xs={4}>
        <Stack height="100%" justifyContent="center" alignItems="center">
          <Stack justifyContent="center" alignItems="center">
            <Typography variant="h4">
              {Number.isInteger(get(props, 'data.get_review.rate'))
                ? `${get(props, 'data.get_review.rate')}.0`
                : get(props, 'data.get_review.rate')}
            </Typography>
            <CustomRating rate={get(props, 'data.get_review.rate')} readOnly />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  </CardWrapper>
);
export default CommentDetails;
