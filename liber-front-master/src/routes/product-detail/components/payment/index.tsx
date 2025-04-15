import * as React from 'react';
import {
  Modal,
  Typography,
  Fade,
  Button,
  Box,
  Backdrop,
  Stack,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import * as yup from 'yup';
import { COLORS } from 'config/styles-config';
import Router from 'next/router';
import { loadState } from 'utils/storage';
import { Input } from 'components/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { get } from 'lodash';
import { useUser } from 'services/api/user';
import { useForm, Controller } from 'react-hook-form';
import { useBuyPaperBook } from 'services/mutate/order-book';
import { toast } from 'react-toastify';
import InputMaskPhone from './input-mask';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid #e1e1e1',
  borderRadius: '14px',
  boxShadow: 24,
  p: 6,
};
interface IModalProps {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  bookPrice: number;
  data: any[];
}
const PaymentModal: React.FC<IModalProps> = (props) => {
  const theme = useTheme();
  const user = loadState('user');
  const userDetails = useUser(user?.guid);
  const isMobile = useMediaQuery(theme?.breakpoints.down('md'));
  const [paymentType, setPaymentType] = React.useState('cash');
  const [count, setCount] = React.useState(1);
  const validSchema = yup.object({
    phone_number: yup.string().required().max(19),
    username: yup.string().required(),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validSchema),
  });
  const { mutate, isLoading } = useBuyPaperBook();
  const handleSelectPaymentType = (event: React.SyntheticEvent) => {
    setPaymentType(get(event, 'target.name'));
  };
  const handleChangeSubmit = (values: any) => {
    const orderDetails = {
      book: get(props, 'data.guid'),
      book_type: get(props, 'data.types[1].guid'),
      payment_type: paymentType,
      phone_number: values?.phone_number
        .substr(7, values?.phone_number?.length)
        .replace(/\s/g, ''),
      full_name: values?.username,
      quantity: count,
    };
    mutate(orderDetails, {
      onSuccess: () => {
        toast.success('Буюртмангиз қабул қилинди!');
        props.setOpenModal(false);
      },
    });
  };
  const bookTotalPrice = count * props.bookPrice;
  const walletAmount = Math.floor(get(userDetails, 'data.balance'));
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.openModal}
      onClose={() => props.setOpenModal(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.openModal}>
        <form onSubmit={handleSubmit(handleChangeSubmit)}>
          <Box
            sx={{
              ...style,
              width: isMobile ? '90%' : 400,
              px: isMobile ? 1.4 : 6,
            }}
          >
            <Typography variant="h5">Буюртмани расмийлаштириш</Typography>
            <Stack
              direction="row"
              sx={{ mt: 4, justifyContent: 'space-between' }}
            >
              <Typography variant="subtitle1">Буюуртма сони:</Typography>
              <Stack
                direction="row"
                sx={{
                  alignItems: 'center',
                  columnGap: 2,
                  background: COLORS.lightBg,
                  borderRadius: '14px',
                  border: `1px solid ${COLORS.borderColor}`,
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: '14px 0 0 14px!important',
                    background: COLORS.white,
                    border: 'none',
                    '&:hover': {
                      border: 'none',
                    },
                  }}
                  onClick={() => setCount((prev) => Math.max(prev - 1, 1))}
                >
                  -
                </Button>
                {count}
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: '0 14px 14px 0!important',
                    background: COLORS.white,
                    border: 'none',
                    '&:hover': {
                      border: 'none',
                    },
                  }}
                  onClick={() => setCount((prev) => prev + 1)}
                >
                  +
                </Button>
              </Stack>
            </Stack>
            <Controller
              control={control}
              name="phone_number"
              render={({ field }) => (
                <InputMaskPhone
                  {...{ field }}
                  error={!!errors?.username?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="username"
              render={({ field }) => (
                <Input
                  {...field}
                  fullWidth
                  sx={{ mt: 3 }}
                  label="Исмингиз"
                  error={!!errors?.username?.message}
                />
              )}
            />
            <Typography
              variant="subtitle2"
              margin="24px 0 6px"
              fontWeight={500}
              fontSize="12px"
            >
              Тўлов тури
            </Typography>
            <Stack
              direction="row"
              sx={{
                p: 0.7,
                borderRadius: '14px',
                border: `1px solid ${COLORS.borderColor}`,
                mb: 5,
              }}
            >
              <Button
                variant={paymentType === 'cash' ? 'contained' : 'text'}
                fullWidth
                name="cash"
                sx={{ lineHeight: 2, fontWeight: 400, fontSize: '16px' }}
                onClick={handleSelectPaymentType}
              >
                Нақд
              </Button>
              <Button
                variant={paymentType === 'online' ? 'contained' : 'text'}
                fullWidth
                name="online"
                sx={{ lineHeight: 2, fontWeight: 400, fontSize: '16px' }}
                onClick={handleSelectPaymentType}
                disabled={!user}
              >
                Э-Хисоб
              </Button>
            </Stack>
            {paymentType === 'online' && (
              <Typography
                variant="subtitle1"
                color={bookTotalPrice <= walletAmount ? COLORS.darkGray : 'red'}
                sx={{ textAlign: 'center' }}
              >
                Хисобингизда: {walletAmount} сўм
              </Typography>
            )}

            <Typography
              variant="h5"
              color={COLORS.primary}
              sx={{ textAlign: 'center', mb: 4, mt: 2 }}
            >
              {bookTotalPrice.toLocaleString()} сўм
            </Typography>
            {bookTotalPrice > walletAmount && paymentType === 'online' ? (
              <Button
                fullWidth
                sx={{ fontWeight: 300, py: 2 }}
                type="button"
                onClick={() =>
                  Router.push(
                    `/profile/${get(userDetails, 'data.guid')}?activeTab=2`
                  )
                }
                disabled={isLoading}
              >
                Ҳисобни тўлдриш
              </Button>
            ) : (
              <Button
                fullWidth
                sx={{ fontWeight: 300, py: 2 }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={16} /> : 'Харид килиш'}
              </Button>
            )}
            <Button
              fullWidth
              variant="outlined"
              sx={{ fontWeight: 300, mt: 2, py: 1.7 }}
            >
              Бекор килиш
            </Button>
          </Box>
        </form>
      </Fade>
    </Modal>
  );
};
export default PaymentModal;
