import React from 'react';
import { IconButton, IconButtonProps, InputLabel, styled } from '@mui/material';

import OutlinedInput from '@mui/material/OutlinedInput';
import { COLORS } from 'config/styles-config';
import EyeDisabled from '../icons/eye-disabled.icon';
import EyeEnabled from '../icons/eye-enabled.icon';

export const StyledInput = styled(OutlinedInput)`
  padding-left: 12px;
  padding-right: 10px;
  line-height: 0.75px;
  border: 2px solid #1C1014;
  background-color: #fff;
  label + & {
    margin-top: ${(props) => props.theme.spacing(3)};
  }
  label & {
    font-size: 14px;
    font-weight: 600;
  }

  & .MuiInputBase-input {
    border-radius: 16px;
    font-weight: 400;
    padding: 16px 12px 14px 12px;
    position: relative;
    background-color: #fff;
    transition: ${(props) =>
      props.theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ])};

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0 1000px #fff inset;
    }

    &::placeholder {
      color: ${COLORS.darkGray};
      letter-spacing: 0.5px;
      font-weight: 400;
    }

    &[type='password'] {
      color: ${COLORS.darkGray};
    }
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: #ecf1f4;
    transition: border-color 0.2s linear;
  }

  && .MuiOutlinedInput-notchedOutline {
    border-width: 0;
  }
`;

export const StyledLabel = styled(InputLabel)`
  font-weight: 500;
  color: ${COLORS.textMain};

  &.Mui-focused {
    color: ${COLORS.textMain};
  }

  &.Mui-error {
    color: ${(props) => props.theme.palette.error.main};
  }
`;

export const ToggleIcon = styled(
  ({ showPassword, ...props }: IconButtonProps & { showPassword: boolean }) => (
    <IconButton className="toggle-btn" {...props}>
      {showPassword ? <EyeDisabled /> : <EyeEnabled />}
    </IconButton>
  )
)`
  svg {
    width: 20px;
    height: 20px;
  }
  color: ${COLORS.darkGray};
`;
