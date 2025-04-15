import { Input } from 'components/input';
import { COLORS } from 'config/styles-config';
import styled from 'styled-components';

export const SearchFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const CustomInput = styled(Input)`
  padding-right: 0 !important;
  border: 1px solid #e1e1e1 !important;
  border-color: #e1e1e1 !important;
  border-radius: ${(props) =>
    props.isnotmobile ? '0 14px 14px 0' : '14px'} !important;
  width: 30rem;
  @media screen and (max-width: 1150px) {
    width: 100%;
  }
  &&&& > .MuiInputBase-input {
    padding: 13px 12px;
    background-color: ${COLORS.inputBackground} !important;
  }
  &&&& > .MuiOutlinedInput-notchedOutline {
    border-color: #e1e1e1 !important;
  }
`;
