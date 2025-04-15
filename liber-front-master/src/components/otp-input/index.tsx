import React from 'react';
import OtpInput, { OtpInputProps } from 'react-otp-input';

const CustomOtpInput: React.FC<OtpInputProps> = (props) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore:next-line
  <OtpInput
    containerStyle={{ backgroundColor: '#F4F4F4', padding: '1rem 2rem' }}
    inputStyle={{
      border: 'none',
      outline: 'none',
      fontSize: '2rem',
      borderBottom: '1px solid #000',
      backgroundColor: '#F4F4F4',
      margin: '0.3rem',
    }}
    {...props}
  />
);

export default CustomOtpInput;
