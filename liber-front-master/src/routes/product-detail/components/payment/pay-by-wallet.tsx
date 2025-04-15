import React, { EventHandler, useEffect } from 'react';
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Fade,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { get } from 'lodash';
import { loadState } from 'utils/storage';
// eslint-disable-next-line import/named
import { useBuyOnlineBook } from 'services/mutate/order-book';
import { useUser } from 'services/api/user';
import SuccessIcon from 'components/icons/success.icon';
import WalletCoinIcon from 'components/icons/wallet-coin.icon';
import { COLORS } from '../../../../config/styles-config';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  minHeight: '200px',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid #e1e1e1',
  borderRadius: '14px',
  boxShadow: 24,
  p: 6,
};
interface IModalProps {
  openPaymentModal: boolean;
  setOpenPaymentModal: (openPaymentModal: boolean) => void;
  isOrderSuccess: boolean;
  setIsOrderSuccess: (isOrderSuccess: boolean) => void;
}

const PayByWallet = (props: IModalProps) => {
  const user = loadState('user');
  const userDetails = useUser(user?.guid);
  const [error, setError] = React.useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { mutate, isLoading } = useBuyOnlineBook();
  const walletAmount = Math.floor(get(userDetails, 'data.balance'));

  const handleChangeSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const values = {
      book: get(props, 'data.guid'),
      book_type: get(props, 'bookDetail.guid'),
      payment_type: 'online',
    };
    mutate(values, {
      onSuccess: () => {
        props.setIsOrderSuccess(true);
      },
      onError: (err) => {
        setError(get(err, 'response.data.errors.message'));
      },
    });
  };
  useEffect(() => {
    if (props.isOrderSuccess) {
      setTimeout(() => {
        props.setOpenPaymentModal(false);
      }, 2000);
    }
  }, [props.isOrderSuccess]);
  useEffect(() => {
    if (get(error, 'length') > 0) {
      setError('');
    }
  }, [props.openPaymentModal]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.openPaymentModal}
      onClose={() => props.setOpenPaymentModal(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.openPaymentModal}>
        {!props.isOrderSuccess ? (
          <form onSubmit={handleChangeSubmit}>
            <Box
              sx={{
                ...style,
                width: isMobile ? '90%' : 400,
                px: isMobile ? 1.4 : 6,
              }}
            >
              <Typography variant="h5" textAlign="center" sx={{ mb: 4 }}>
                Буюртмани расмийлаштириш
              </Typography>
              <Stack
                direction="row"
                sx={{ justifyContent: 'space-between', my: 2 }}
              >
                <Typography variant="body1" color={COLORS.darkGray}>
                  Китоб номи:
                </Typography>
                <Typography variant="subtitle1">
                  {get(props, 'data.title')}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                sx={{ justifyContent: 'space-between', my: 1.5 }}
              >
                <Typography variant="body1" color={COLORS.darkGray}>
                  Муаллиф:
                </Typography>
                <Typography variant="subtitle1">
                  {get(props, 'data.author')}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                sx={{ justifyContent: 'space-between', my: 1.5 }}
              >
                <Typography variant="body1" color={COLORS.darkGray}>
                  Жанр:
                </Typography>
                <Typography variant="subtitle1">
                  {get(props, 'data.category.title')}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ my: 1.5 }}
              >
                <Typography variant="body1" color={COLORS.darkGray}>
                  Нархи:
                </Typography>
                <Typography variant="subtitle1" color={COLORS.primary}>
                  {Number(get(props, 'bookDetail.price')).toLocaleString()} сўм
                </Typography>
              </Stack>
              <Typography variant="subtitle1">Ҳисобингизда:</Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  backgroundColor: COLORS.primary,
                  borderRadius: '14px',
                  height: '40px',
                  p: 2,
                  position: 'relative',
                  overflow: 'hidden',
                  mt: 2,
                }}
              >
                <div>
                  <Typography color={COLORS.white} variant="h6">
                    {walletAmount.toLocaleString()} сўм
                  </Typography>
                </div>
                <Box sx={{ position: 'absolute', bottom: -30, right: -10 }}>
                  <WalletCoinIcon />
                </Box>
              </Stack>
              {error && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}
              <Button
                fullWidth
                sx={{ fontWeight: 300, py: 2, mt: 3 }}
                type="submit"
                disabled={isLoading || get(error, 'length') > 0}
              >
                {isLoading ? <CircularProgress size={16} /> : 'Харид килиш'}
              </Button>
              <Button
                fullWidth
                variant="outlined"
                sx={{ fontWeight: 300, mt: 2, py: 1.7 }}
                type="button"
                onClick={() => props.setOpenPaymentModal(false)}
              >
                Бекор килиш
              </Button>
            </Box>
          </form>
        ) : (
          <Box
            sx={{
              ...style,
              width: isMobile ? '90%' : 400,
              px: isMobile ? 1.4 : 6,
              textAlign: 'center',
            }}
          >
            <SuccessIcon />
            <Typography variant="h5" marginTop={2}>
              Сотиб олинди !
            </Typography>
          </Box>
        )}
      </Fade>
    </Modal>
  );
};

export default PayByWallet;
