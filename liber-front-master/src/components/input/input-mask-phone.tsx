import { Typography } from '@mui/material';
import React from 'react';
import Input from 'react-phone-number-input/input';

// eslint-disable-next-line arrow-body-style
const InputMaskPhone = (props: any) => {
  return (
    <>
      <Typography variant="body2">{props.label}</Typography>
      <Input
        country="UZ"
        international
        withCountryCallingCode
        {...props.field}
        onChange={(value) => console.log(value)}
      />
    </>
  );
};

export default InputMaskPhone;
