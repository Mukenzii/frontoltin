import React, { useEffect, useState, useContext } from 'react';
// eslint-disable-next-line
import { useTimer } from 'react-timer-hook/dist';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import NewUserDetailsContext from 'context/auth';
import { Button } from '@mui/material';
import { useReSendOtp } from '../../services/mutate/verify';

const style = {
  fontSize: '16px',
  fontWeight: 500,
  color: '#242424',
  marginTop: 20,
};

const CoutDown = ({ expiryTimestamp }: { expiryTimestamp: Date }) => {
  const [isReSend, setIsReSend] = useState(false);
  const { query } = useRouter();
  const { mutate } = useReSendOtp();
  const [activeSendCodeButton, setActiveSendCodeButton] = useState(false);
  const { seconds, minutes, restart } = useTimer({
    autoStart: true,
    expiryTimestamp,
    onExpire: () => {
      setActiveSendCodeButton(true);
      const time = new Date();
      time.setSeconds(time.getSeconds() + 60);
      restart(time);
    },
  });

  useEffect(() => {
    if (isReSend) {
      setActiveSendCodeButton(false);
      mutate(
        { username: get(query, 'username') },
        {
          onSuccess: () => {
            setIsReSend(false);
          },
        }
      );
    }
  }, [isReSend]);

  const handleResend = () => {
    setIsReSend(true);
    const time = new Date();
    time.setSeconds(time.getSeconds() + 60);
    restart(time);
  };

  const formatTime = (time: unknown) => String(time).padStart(2, '0');

  return (
    <>
      <div style={style}>
        <span>{formatTime(minutes)}</span>:<span>{formatTime(seconds)}</span>
      </div>
      {activeSendCodeButton && (
        <Button
          variant="text"
          sx={{
            color: '#20AFFF',
            fontSize: '14px',
            fontWeight: 500,
            marginTop: '10px',
          }}
          onClick={handleResend}
        >
          Қайта юбориш
        </Button>
      )}
    </>
  );
};
export default CoutDown;
