import styled, { css, keyframes } from 'styled-components';
import MuiButton from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import { ButtonProps } from './button.types';

const rotate = keyframes` 
  from {
    transform: rotate(0deg);
  } to {
  transform: rotate(-360deg);
    }
`;

const calcResponsiveSize = (px: number, fontSize = 16) =>
  `${(px / fontSize).toString()}em`;

export const StyledProgress = styled(CircularProgress)`
  position: absolute;
  animation: ${rotate} 2s linear;
  animation-iteration-count: infinite;
  color: #fff;
  width: ${calcResponsiveSize(20)};
  height: ${calcResponsiveSize(20)};
  .MuiButton-outlined & {
    color: ${(props) => props?.theme?.palette?.primary?.dark};
  }
`;

const sizesStyles = css`
  &.MuiButton-sizeSmall {
    padding: ${calcResponsiveSize(5)} 1.5em;
    font-size: 1rem;
    color: #1C1400;
    background-color: #FFC310;
    &:hover {
      background-color: #FFC310;
    }
  }
  &.MuiButton-sizeMedium {
    padding: ${calcResponsiveSize(12)} 1.5em;
    color: #1C3400;
    background-color: #FFC310;
    &:hover {
      background-color: #FFC310;
    }
  }
  &.MuiButton-sizeLarge {
    padding: ${calcResponsiveSize(18)} 1.5em;
    color: #1C1400;
    border-color: #FFC310;
    &:hover {
      background-color: #FFC310;
    }
  }
  &.MuiButton-outlinedSizeLarge {
    padding: ${calcResponsiveSize(7)} 1.5em;
    background-color: #FFC310;

  }
  &.MuiButton-outlinedSizeSmall {
    padding: ${calcResponsiveSize(4)} 1.5em;
    background-color: #FFF;
    border-color: #FFC310;
    &:hover {
      background-color: #FFC310;
    }



  }
  &.MuiButton-outlinedSizeMedium {
    padding: ${calcResponsiveSize(7)} 1.5em;
  }
`;

const loadingStyles = css`
  && {
    color: transparent;
    pointer-events: none;
  }
`;

export const StyledButton = styled(MuiButton).withConfig({
  shouldForwardProp: (prop) => !['loading', 'buttonType'].includes(prop),
})<ButtonProps>`
  position: relative;
  border-radius: ${(props) => (props.curved ? '1em' : '0.5em')};
  outline: none;
  text-align: ${(props) => (props.align ? props.align : 'center')};
  font-weight: 400;
  border-width: ${calcResponsiveSize(2)};
  padding: ${(props) => (props.align ? '0!important' : 'auto')};
  font-size: ${(props) => (props.align ? '1.2rem!important' : 'auto')};
  &:hover {
    border-width: ${calcResponsiveSize(2)};
  }
  ${sizesStyles};
  .MuiButton-startIcon,
  .MuiButton-endIcon {
    width: ${calcResponsiveSize(18)};
  }

  .MuiButton-startIcon {
    margin-right: 11px;
  }
  .MuiButton-endIcon {
    margin-left: 11px;
  }

  &.MuiButton-outlined {
    color: ${(props) => props?.theme?.palette?.primary?.dark};
    border-color: ${(props) => props?.theme?.palette?.primary?.dark};
  }

  ${(props) => (props.loading ? loadingStyles : null)};

  @media (max-width: 576px) {
    font-size: 0.875rem;
  }
`;
