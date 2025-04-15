/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore:next-line
import InputMask from 'react-input-mask';
import { Input, InputProps } from 'components/input';

// Will work fine
const InputMaskPhone = ({
  value,
  field,
  error,
  helperText,
  onChange,
  forgotPassword,
}: any) =>
  forgotPassword ? (
    <InputMask
      // eslint-disable-next-line no-nonoctal-decimal-escape
      mask="+\9\9\8 99 999 99 99"
      value={value}
      alwaysShowMask
      // {...field}
      // {...{ helperText }}
      onChange={onChange}
    >
      {(inputProps: JSX.IntrinsicAttributes & InputProps) => (
        <Input
          label="Телефон рақам"
          labelsize={14}
          sx={{ mt: 3 }}
          fullWidth
          type="tel"
          error={error}
          {...{ helperText }}
        />
      )}
    </InputMask>
  ) : (
    <InputMask
      // eslint-disable-next-line no-nonoctal-decimal-escape
      mask="+\9\9\8 99 999 99 99"
      value={value}
      alwaysShowMask
      {...field}
      // {...{ helperText }}
      // onChange={onChange}
    >
      {(inputProps: JSX.IntrinsicAttributes & InputProps) => (
        <Input
          label="Телефон рақам"
          labelsize={14}
          // fontSize="16px"
          sx={{ mt: 3 }}
          fullWidth
          type="tel"
          error={error}
          {...{ helperText }}
        />
      )}
    </InputMask>
  );
export default InputMaskPhone;
