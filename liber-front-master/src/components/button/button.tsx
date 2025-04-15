import React from 'react';
import { StyledButton, StyledProgress } from './button.styles';
import { ButtonProps } from './button.types';

const Button: React.FC<ButtonProps> = ({
  loading = false,
  disabled = false,
  type = 'submit',
  align,
  ...props
}) => (
  <StyledButton
    type={type}
    loading={loading}
    disabled={disabled}
    align={align}
    {...props}
  >
    {props.children}
    {loading ? (
      <StyledProgress className="Mui-Button-loader" size="1.2em" />
    ) : null}
  </StyledButton>
);

export default Button;
