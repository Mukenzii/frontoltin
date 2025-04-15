import { Box } from '@mui/material';
import axios from 'axios';
import { COLORS } from 'config/styles-config';
import { get } from 'lodash';
import React from 'react';
import AsyncSelect from 'react-select/async';
import { Label } from 'routes/profile/tabs/styles/sub.style';

interface IAsyncSelect {
  label?: string;
  placeholder?: string;
  optionLabel: string;
  optionValue: string;
  loadUrl: string;
  onchange: (item: any) => void;
}

const SelectAsync = (props: IAsyncSelect) => {
  const loadOptions = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/${props?.loadUrl}`
    );
    return res?.data?.results;
  };
  const customStyle = {
    control: (provided, { isFocused }) => ({
      ...provided,
      position: 'relative',
      cursor: 'pointer',
      borderColor: COLORS.border,
      padding: '9px 10px',
      boxShadow: `none`,
      fontSize: '16px',
      lineHeight: '150%',
      borderRadius: '14px',
      color: '#000',
      '&:hover': {
        borderColor: COLORS.border,
      },

      '@media (max-width: 768px)': {
        padding: '2px',
        fontSize: '14px',
      },
    }),
    menuPortal: (base) => ({ ...base, zIndex: 99999999 }),
    container: (provided) => ({
      ...provided,
      minWidth: '150px',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
    }),
    option: (provided, { isSelected }) => ({
      ...provided,
      fontSize: '16px',
      color: COLORS.textMain,
      transition: 'all 0.3s linear',
      backgroundColor: COLORS.white,
      '&:hover': {
        backgroundColor: COLORS.primary,
        color: COLORS.white,
      },

      '@media (max-width: 768px)': {
        fontSize: '14px',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: '16px',
      fontFamily: 'Roboto',
      whiteSpace: 'nowrap',
      // color: `${disabled ? "rgba(23, 31, 38, 0.4)" : "rgba(0, 0, 0, 0.3)"}`,
      overflow: 'hidden',
      fontWeight: 400,
      textOverflow: 'ellipsis',

      '@media (max-width: 768px)': {
        fontSize: '14px',
      },
    }),
    menu: (base) => ({
      ...base,
      zIndex: '5',
      fontFamily: 'Roboto',
    }),
  };

  return (
    <Box sx={{ mb: 3 }}>
      {props.label && <Label>{props?.label}</Label>}
      <Box sx={{ mt: 1 }}>
        <AsyncSelect
          styles={customStyle}
          cacheOptions
          loadOptions={loadOptions}
          getOptionLabel={(option) => get(option, props?.optionLabel)}
          getOptionValue={(option) => get(option, props?.optionValue)}
          defaultOptions
          onChange={props.onchange}
          placeholder={props.placeholder}
          isSearchable={false}
        />
      </Box>
    </Box>
  );
};
export default SelectAsync;
