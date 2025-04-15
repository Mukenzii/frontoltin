import React, { useContext } from 'react';
import styled from 'styled-components';
import { CircularProgress, IconButton, Paper } from '@mui/material';
import Image from 'next/image';
import { Input } from 'components/input';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { Button } from 'components/button';
import { useSetting } from 'services/mutate/setting';
import { useTranslation } from 'next-i18next';
import { get } from 'lodash';
import { UserDetails } from 'types/user.types';
import AvatarPng from 'assets/png/user-photo.png';
import ChangerContext from 'context/is-changed';
import { Title } from './styles/tabs-title.style';
import { Flex } from './styles/sub.style';

const Settings = ({ data, guid }: { data?: UserDetails; guid?: string }) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useSetting(guid as string);
  const { handleSubmit, register, control, watch } = useForm();
  const { isChanged, setIsChanged } = useContext(ChangerContext);

  const handleSetting = (values: any) => {
    const formData = new FormData();
    formData.append('profile_picture', get(values, 'profile_picture[0]'));
    formData.append(
      'first_name',
      get(values, 'first_name') || get(data, 'first_name')
    );
    mutate(formData, {
      onSuccess: () => {
        setIsChanged(!isChanged);
        toast.success('Success');
      },
    });
  };
  return (
    <Paper sx={{ padding: '32px' }}>
      <Title>{t('settings')}</Title>
      <form onSubmit={handleSubmit(handleSetting)}>
        <input
          type="file"
          id="upload"
          accept="image/*"
          style={{ display: 'none' }}
          {...register('profile_picture')}
        />
        <label htmlFor="upload">
          <Flex justify="flex-start" direction="row">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              sx={{
                borderRadius: '50%',
                backgroundColor: '#f1f1f1',
                overflow: 'hidden',
                padding: 0,
              }}
            >
              <Image
                src={
                  watch('profile_picture') !== undefined &&
                  watch('profile_picture').length > 0
                    ? URL.createObjectURL(watch('profile_picture')[0])
                    : get(data, 'profile_picture') || AvatarPng
                }
                alt=""
                width="70px"
                height="70px"
                objectFit="cover"
              />
            </IconButton>
            <UploadText>{t('upload-photo')}</UploadText>
          </Flex>
        </label>
        <Controller
          control={control}
          name="first_name"
          render={({ field }) => (
            <Input
              fullWidth
              sx={{ margin: '45px 0 65px 0 ' }}
              label={t('your-name')}
              placeholder={t('your-name')}
              defaultValue={get(data, 'first_name')}
              {...field}
            />
          )}
        />

        <Button variant="contained" size="large" fullWidth type="submit">
          {isLoading ? (
            <CircularProgress
              sx={{
                color: 'white',
              }}
              size={18}
            />
          ) : (
            t('save')
          )}
        </Button>
      </form>
    </Paper>
  );
};

export default Settings;

const UploadText = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
  margin-left: 20px;
  color: #3f51b5;
`;
