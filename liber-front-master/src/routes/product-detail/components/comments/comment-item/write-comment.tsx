import { Stack, Typography } from '@mui/material';
import { Button } from 'components/button';
import { useForm, Controller } from 'react-hook-form';
import ReactLoading from 'react-loading';
import CustomRating from 'components/custom-rating';
import { Input } from 'components/input';
import React from 'react';
import { CardWrapper } from 'routes/product-detail/layout/card-wrapper';
import { useComment } from 'services/mutate/comment';
import Router, { useRouter } from 'next/router';
import { get } from 'lodash';

const WriteComment = ({
  refetch,
  isVerified,
}: {
  refetch: any;
  isVerified: boolean;
}) => {
  const { query } = useRouter();
  const [rate, setRate] = React.useState(5);
  const guid = get(query, 'guid');
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: { comment: '' },
  });
  const { mutate, isLoading } = useComment();
  const hanleSendComment = ({ comment }: { comment: string }) => {
    mutate(
      { title: comment, book: guid, point: rate },
      {
        onSuccess: () => {
          reset();
          refetch();
        },
      }
    );
  };
  return (
    <form
      onSubmit={handleSubmit(hanleSendComment)}
      style={{ position: 'relative' }}
    >
      {!isVerified && (
        <Stack
          sx={{
            position: 'absolute',
            backgroundColor: '#0f0f0f45',
            width: '100%',
            height: '332px',
            zIndex: '99',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '12px',
          }}
        >
          <Typography variant="body1" fontSize="20px">
            Изох колдириш учун аввал руйхатдан утинг!
          </Typography>
          <Button sx={{ mt: 5 }} onClick={() => Router.push('/sign-up')}>
            Руйхатдан утиш
          </Button>
        </Stack>
      )}

      <div style={{ opacity: isVerified ? 1 : 0.2 }}>
        <CardWrapper>
          <Stack gap="2rem">
            <Typography variant="h5" fontWeight={700}>
              Фикрингиз
            </Typography>
            <CustomRating {...{ rate, setRate }} />
            <Controller
              control={control}
              name="comment"
              render={({ field }) => (
                <Input multiline placeholder="Изох" fullWidth {...field} />
              )}
            />
            <Button
              sx={{
                width: '180px',
                height: '50px',
                padding: '1rem!important',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              disabled={watch('comment')?.length === 0}
              variant="contained"
              size="large"
              type="submit"
            >
              {isLoading ? (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore:next-line
                <ReactLoading
                  type="bubbles"
                  color="#fff"
                  height={50}
                  width={50}
                />
              ) : (
                'Юбориш'
              )}
            </Button>
          </Stack>
        </CardWrapper>
      </div>
    </form>
  );
};

export default WriteComment;
