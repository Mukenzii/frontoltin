import { ButtonProps as MuiButtonProps } from '@mui/material/Button';

export interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
  disabled?: boolean;
  curved?: boolean;
  ismobile?: boolean;
  align?: string;
}
