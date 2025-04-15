/* eslint-disable max-lines */
import { Box, Grid, Stack, Typography } from '@mui/material';
import { CustomAccordion } from 'components/accordion';
import { Button } from 'components/button';
import WithCustomScrollBar from 'components/custom-scroll-bar';
import React from 'react';
import { SearchField } from 'layouts/header/components/search-field';
import Router, { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { get } from 'lodash';
import { getAllData } from 'services/api/get';
import Slider from 'rc-slider';
import { useYears } from 'services/api/use-years';
import { useMinMaxPrice } from 'services/api/use-min-max-price';
import Select from 'react-dropdown-select';
import { bookTypesList } from 'config/static-data';
import { useTranslation } from 'next-i18next';
import { CheckboxesGroup } from '../components/checkbox-group';
import FilterHeader from '../components/filter-header/filter-header';
import { FilterWrapper } from './filter-layout.styles';
import FilterDialog from './mobile-filter';
import 'rc-slider/assets/index.css';

const priceStyle = {
  fontSize: 14,
  fontWeight: 500,
  backgroundColor: '#eef4ff',
  padding: 5,
  borderRadius: 3,
  marginTop: 4,
};

const FilterLayout: React.FC<{
  isnotmobile?: boolean;
  children: React.ReactNode;
}> = ({ children, isnotmobile }) => {
  const { t } = useTranslation();
  const minMaxPrice = useMinMaxPrice();
  const [open, setOpen] = React.useState(false);
  const { locale } = useRouter();
  const router = useRouter();
  const useyears = useYears();
  const { data, isSuccess } = useQuery('categories', () =>
    getAllData('/category/list/')
  );
  const handleChange = (value: any) => {
    router.replace({
      query: { ...router.query, published_date: value[0]?.published_date },
    });
  };
  const priceDefault = [
    minMaxPrice?.data?.min_price?.price__min,
    minMaxPrice?.data?.max_price?.price__max,
  ];
  const [prices, setPrices] = React.useState<number[]>(priceDefault);

  const handleClearFilter = () => {
    Router.push('/filter');
  };

  // setting min_max prices to context store and state
  const handleSortByPrice = (value: number[] | number) => {
    setPrices(value as number[]);
    router.replace({
      query: {
        ...router.query,
        min_price: get(value, '0'),
        max_price: get(value, '1'),
      },
    });
  };
  const modifiedYears = useyears?.data?.results.filter(
    (y: { published_date: string }) => y.published_date !== null
  );
  return (
    <Grid container columnSpacing={2}>
      {!isnotmobile ? (
        <FilterDialog {...{ open, setOpen }}>
          <Grid item xs={3}>
            <Stack gap="1rem">
              <FilterWrapper>
                <Typography fontWeight={600} variant="subtitle1">
                  Рукнлар
                </Typography>
                <WithCustomScrollBar>
                  <Box sx={{ maxHeight: '320px' }}>
                    <CheckboxesGroup
                      {...{ isSuccess, locale }}
                      checkBoxData={get(data, 'data.results')}
                      type="category"
                    />
                  </Box>
                </WithCustomScrollBar>
              </FilterWrapper>
              <CustomAccordion
                summary={
                  <Typography variant="subtitle1" fontWeight={600}>
                    Йил бўйича
                  </Typography>
                }
                details={
                  <Select
                    options={modifiedYears}
                    onChange={(value) => handleChange(value)}
                    labelField="published_date"
                    valueField="published_date"
                    values={[]}
                    searchable
                    dropdownHeight="300px"
                    placeholder="Танланг"
                    color="#3748A6"
                    style={{
                      borderRadius: '12px',
                      height: '50px',
                      paddingLeft: 10,
                    }}
                  />
                }
              />
              <CustomAccordion
                summary={
                  <Typography variant="subtitle1" fontWeight={600}>
                    Китоб турлари
                  </Typography>
                }
                details={
                  <CheckboxesGroup
                    {...{ isSuccess, locale }}
                    checkBoxData={bookTypesList}
                    type="book_type"
                  />
                }
              />
              <CustomAccordion
                summary={
                  <Typography variant="subtitle1" fontWeight={600}>
                    Нархлари
                  </Typography>
                }
                details={
                  minMaxPrice?.isSuccess && (
                    <Box sx={{ mb: 4 }}>
                      <Slider
                        range
                        allowCross={false}
                        step={1000}
                        defaultValue={priceDefault}
                        min={priceDefault[0]}
                        max={priceDefault[1]}
                        marks={{
                          [prices[0] || priceDefault[0]]: (
                            <div style={priceStyle}>
                              {prices[0] || priceDefault[0]}
                            </div>
                          ),
                          [prices[1] || priceDefault[1]]: (
                            <div style={priceStyle}>
                              {prices[1] || priceDefault[1]}
                            </div>
                          ),
                        }}
                        onChange={handleSortByPrice}
                        railStyle={{
                          backgroundColor: 'rgb(183,189,227)',
                          height: 4,
                        }}
                        trackStyle={{
                          backgroundColor: 'rgb(63, 81, 181)',
                          height: 4,
                        }}
                        handleStyle={{
                          borderColor: 'rgb(63, 81, 181)',
                          height: 20,
                          width: 20,
                          marginLeft: 0,
                          marginTop: -8,
                          opacity: 1,
                          backgroundColor: 'rgb(63, 81, 181)',
                        }}
                      />
                    </Box>
                  )
                }
              />
              <Button
                variant="contained"
                size="large"
                onClick={handleClearFilter}
              >
                Тозалаш
              </Button>
            </Stack>
          </Grid>
        </FilterDialog>
      ) : (
        <Grid item xs={3}>
          <Stack gap="1rem">
            <FilterWrapper>
              <Typography fontWeight={600} variant="subtitle1">
                {t('ruknlar')}
              </Typography>
              <WithCustomScrollBar>
                <Box sx={{ maxHeight: '320px' }}>
                  <CheckboxesGroup
                    {...{ isSuccess, locale }}
                    checkBoxData={get(data, 'data.results')}
                    type="category"
                  />
                </Box>
              </WithCustomScrollBar>
            </FilterWrapper>
            <CustomAccordion
              summary={
                <Typography variant="subtitle1" fontWeight={600}>
                  {t('filter-by-years')}
                </Typography>
              }
              details={
                <Select
                  options={modifiedYears}
                  onChange={(value) => handleChange(value)}
                  labelField="published_date"
                  valueField="published_date"
                  values={[]}
                  searchable
                  dropdownHeight="300px"
                  placeholder={t('choose')}
                  color="#3748A6"
                  style={{
                    borderRadius: '12px',
                    height: '50px',
                    paddingLeft: 10,
                  }}
                />
              }
            />
            <CustomAccordion
              summary={
                <Typography variant="subtitle1" fontWeight={600}>
                  {t('book-types')}
                </Typography>
              }
              details={
                <CheckboxesGroup
                  {...{ isSuccess, locale }}
                  checkBoxData={bookTypesList}
                  type="book_type"
                />
              }
            />
            {/* <CustomAccordion
              summary={
                <Typography variant="subtitle1" fontWeight={600}>
                  Нархлари
                </Typography>
              }
              details={
                minMaxPrice?.isSuccess && (
                  <Box sx={{ mb: 4 }}>
                    <Slider
                      range
                      allowCross={false}
                      step={1000}
                      defaultValue={priceDefault}
                      min={priceDefault[0]}
                      max={priceDefault[1]}
                      marks={{
                        [prices[0] || priceDefault[0]]: (
                          <div style={priceStyle}>
                            {prices[0] || priceDefault[0]}
                          </div>
                        ),
                        [prices[1] || priceDefault[1]]: (
                          <div style={priceStyle}>
                            {prices[1] || priceDefault[1]}
                          </div>
                        ),
                      }}
                      onChange={handleSortByPrice}
                      railStyle={{
                        backgroundColor: 'rgb(183,189,227)',
                        height: 4,
                      }}
                      trackStyle={{
                        backgroundColor: 'rgb(63, 81, 181)',
                        height: 4,
                      }}
                      handleStyle={{
                        borderColor: 'rgb(63, 81, 181)',
                        height: 20,
                        width: 20,
                        marginLeft: 0,
                        marginTop: -8,
                        opacity: 1,
                        backgroundColor: 'rgb(63, 81, 181)',
                      }}
                    />
                  </Box>
                )
              }
            /> */}
            <Button
              variant="contained"
              size="large"
              onClick={handleClearFilter}
            >
              {t('clear')}
            </Button>
          </Stack>
        </Grid>
      )}

      <Grid item xs={9}>
        <Stack sx={{ rowGap: '1rem' }}>
          {!isnotmobile ? (
            <Stack gap="0.5rem">
              <SearchField {...{ isnotmobile }} />
              <FilterHeader
                {...{ setOpen, isnotmobile }}
                categoryTitle={t('books')}
              />
            </Stack>
          ) : (
            <FilterHeader
              {...{ setOpen, isnotmobile }}
              categoryTitle={t('books')}
            />
          )}
          {children}
        </Stack>
      </Grid>
    </Grid>
  );
};
export default FilterLayout;
