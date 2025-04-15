import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { COLORS } from 'config/styles-config';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'next-i18next';

const CompleteDetails = ({ data, locale }: any) => {
  const { t } = useTranslation();
  const booksMoreDetails = [
    { name: t('book-name'), value: get(data, 'title') },
    { name: 'ISBN:', value: get(data, 'isbn') },
    { name: `${t('author')}:`, value: get(data, 'author') },
    { name: t('language'), value: get(data, 'language') },
    {
      name: t('published-date'),
      value: get(data, 'published_date'),
    },
    {
      name: t('page-count'),
      value: `${get(data, 'hardcover')} бет`,
    },
    { name: `${t('publisher')}:`, value: get(data, 'publisher') },
    { name: t('rukn'), value: get(data, 'category.title') },
  ];
  return (
    <TableContainer
      sx={{ borderRadius: '0.5rem', border: `0.5px solid ${COLORS.lightBg}` }}
    >
      <Table
        sx={{
          border: `0.5px solid ${COLORS.lightBg}`,

          td: {
            borderBottom: `0.5px solid ${COLORS.lightBg}`,
          },
        }}
      >
        <TableHead />
        <TableBody>
          {booksMoreDetails.map((item: { name: string; value: string }) => (
            <TableRow key={item.name}>
              <TableCell>
                <Typography variant="subtitle1">{item.name}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body1" color={COLORS.textMain}>
                  {item.value}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompleteDetails;
