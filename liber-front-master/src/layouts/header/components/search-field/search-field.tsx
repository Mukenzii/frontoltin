import { Button } from '@mui/material';
import SearchIcon from 'components/icons/search.icon';
import { Paths } from 'config/site-paths';
import { COLORS } from 'config/styles-config';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Categories } from '../categories';
import { CustomInput, SearchFieldWrapper } from './search-field.styles';

interface IsearchField {
  isLabel?: boolean;
  isnotmobile?: boolean;
}
interface IFormInputs {
  searchValue?: string;
  value?: string;
}
const SearchField: React.FC<IsearchField> = ({ isLabel, isnotmobile }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const handleSearchFieldClick = () => {
    if (router.pathname === '/filter') return;
    router.push(Paths.FILTER);
  };

  const { handleSubmit, control } = useForm<IFormInputs>({
    defaultValues: {
      searchValue: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = (value: any) => {
    router.replace({
      query: {
        ...router.query,
        search_value: value.searchValue,
      },
    });
  };
  return (
    <SearchFieldWrapper>
      {isnotmobile && <Categories {...{ isLabel }} />}
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Controller
          name="searchValue"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <CustomInput
              onClick={handleSearchFieldClick}
              placeholder={t('search')}
              sx={{ width: '100%', borderColor: '#e1e1e1 !important' }}
              {...field}
              {...{ isnotmobile }}
              endAdornment={
                <Button
                  type="submit"
                  sx={{
                    borderLeft: `1px solid ${COLORS.border}`,
                    padding: '0 1.25rem',
                    display: 'flex',
                    cursor: 'pointer',
                    height: '3rem',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '0 14px 14px 0',
                    backgroundColor: `${COLORS.lightBg} !important`,
                    '&:hover': {
                      backgroundColor: `${COLORS.lightBg} !important`,
                    },
                  }}
                >
                  <SearchIcon />
                </Button>
              }
            />
          )}
        />
      </form>
    </SearchFieldWrapper>
  );
};

export default SearchField;
