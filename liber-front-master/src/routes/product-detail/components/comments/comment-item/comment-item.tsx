import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import Default from 'assets/png/default.png';
import { CardWrapper } from 'routes/product-detail/layout/card-wrapper';
import { Button } from 'components/button';
import CustomRating from 'components/custom-rating';
import { get } from 'lodash';

interface CommentItemProps {
  isMy?: boolean;
  comment?: any;
}

const CommentItem: React.FC<CommentItemProps> = ({ isMy, comment }) => (
  <CardWrapper>
    <Stack gap="2rem">
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" gap="20px">
          <Box
            sx={{
              width: '50px',
              height: '50px',
              borderRadius: '14px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Image
              src={get(comment, 'owner.profile_picture') || Default}
              alt="user_image"
              layout="fill"
            />
          </Box>
          <Stack>
            <Typography variant="subtitle1" fontSize="18px">
              {get(comment, 'owner.first_name')}
            </Typography>
            <Typography variant="subtitle2" color="#AAAAAA">
              {get(comment, 'created_at')}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" gap="1.5rem" alignItems="center">
          <CustomRating rate={get(comment, 'point')} readOnly />
        </Stack>
      </Stack>
      <Typography variant="subtitle1">{get(comment, 'title')}</Typography>
      {isMy && (
        <Button variant="contained" size="large">
          Ўзгартириш
        </Button>
      )}
    </Stack>
  </CardWrapper>
);

export default CommentItem;
