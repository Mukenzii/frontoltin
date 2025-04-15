/* eslint-disable no-nested-ternary */
import { Avatar, Box, Skeleton, Stack, Typography } from '@mui/material';
import styled from 'styled-components';
import Image from 'next/image';
import React from 'react';
import { deepOrange } from '@mui/material/colors';
import { get } from 'lodash';
import { UserDetails } from 'types/user.types';

const UserCard: React.FC<{
  isMobile?: boolean;
  data: UserDetails;
  isFetching: boolean;
}> = ({ isMobile, data, isFetching }) => (
  <FlexBox {...{ isMobile }}>
    <Box sx={{ width: !isMobile ? 220 : 120 }}>
      <ImageBox {...{ isMobile }}>
        {!isFetching ? (
          get(data, 'profile_picture') ? (
            <Image
              alt="Avatar"
              src={get(data as UserDetails, 'profile_picture')}
              width={!isMobile ? 160 : 100}
              height={!isMobile ? 160 : 100}
              objectFit="cover"
            />
          ) : (
            <Avatar
              sx={{ bgcolor: deepOrange[400], width: '100%', height: '100%' }}
              alt="Remy Sharp"
              src="/broken-image.jpg"
            >
              <Typography fontSize="45px" fontWeight={600} color="white">
                {get(data as UserDetails, 'first_name', '').split('')[0]}
              </Typography>
            </Avatar>
          )
        ) : (
          <Skeleton
            sx={{ backgroundColor: '#f1f1f1' }}
            variant="circular"
            width={!isMobile ? 160 : 100}
            height={!isMobile ? 160 : 100}
          />
        )}
      </ImageBox>
    </Box>
    {!isFetching ? (
      <Box sx={{ marginLeft: isMobile ? '30px' : 0 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          fontSize={!isMobile ? 30 : 20}
          color="#242424"
          sx={{ wordBreak: 'break-all' }}
        >
          {get(data, 'first_name')}
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight={500}
          fontSize={!isMobile ? 20 : 16}
          color="#242424"
          marginTop="10px"
          sx={{ wordBreak: 'break-all' }}
        >
          {get(data, 'username')}
        </Typography>
        <Typography
          variant="subtitle2"
          fontWeight={500}
          fontSize={!isMobile ? 20 : 16}
          color="#9A9A9A"
          marginTop="10px"
        >
          ID: {get(data, 'user_generate_id')} | Баланс:{' '}
          {Number(get(data, 'balance', '')).toLocaleString()} сўм
        </Typography>
      </Box>
    ) : (
      <Stack width="100%">
        <Skeleton
          sx={{ backgroundColor: '#f1f1f1' }}
          width="60%"
          height="50px"
        />
        <Skeleton
          sx={{ backgroundColor: '#f1f1f1' }}
          width="30%"
          height="40px"
        />
        <Skeleton
          sx={{ backgroundColor: '#f1f1f1' }}
          width="25%"
          height="30px"
        />
      </Stack>
    )}
  </FlexBox>
);

export default UserCard;

const FlexBox = styled.div<{ isMobile?: boolean }>`
  display: flex;
  padding: 24px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.06);
  border-radius: 14px !important;
  align-items: ${(props) => (!props.isMobile ? 'center' : 'flex-start')};
  background: #fff;
  margin: ${(props) => (!props.isMobile ? 0 : '0 1rem')};
`;
const ImageBox = styled.div<{ isMobile?: boolean }>`
  background: #f1f1f1;
  border-radius: 50%;
  max-width: ${(props) => (!props.isMobile ? '160px' : '100px')};
  min-width: ${(props) => (!props.isMobile ? '160px' : '100px')};
  height: ${(props) => (!props.isMobile ? '160px' : '100px')};
  overflow: hidden;
`;
