import * as React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { styled } from '@mui/material/styles';
import {
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
  TableCell,
  Alert,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { get } from 'lodash';
import { COLORS } from '../../../config/styles-config';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: COLORS.primary,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
// eslint-disable-next-line arrow-body-style
const SubscriptionList = ({ data, isSuccess }: any) => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  function createData(
    category: string,
    begin_date: string,
    end_date: string,
    price: string
  ) {
    return { category, begin_date, end_date, price };
  }
  const rows =
    isSuccess &&
    get(data, 'results', []).map((item: any) =>
      createData(
        get(item, 'category', ''),
        get(item, 'begin_date', ''),
        get(item, 'end_date', ''),
        Math.floor(Number(get(item, 'price', ''))).toLocaleString()
      )
    );

  return get(data, 'results.length') > 0 ? (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{t('subscriptions')}</StyledTableCell>
            <StyledTableCell align="right">
              {t('Бошланиш вақти')}
            </StyledTableCell>
            <StyledTableCell align="right">
              {t('Якунланиш вақти')}
            </StyledTableCell>
            <StyledTableCell align="right">
              {t('Обуна нарҳи')} (cўм)
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            // eslint-disable-next-line @next/next/link-passhref
            <Link
              key={get(row, 'guid')}
              href={`/filter?category=${get(row, 'category.guid')}`}
              passHref
            >
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  {get(row, `category.title_${locale}`) ||
                    get(row, `category.title`)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {get(row, 'begin_date')}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {get(row, 'end_date')}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {get(row, 'price')}
                </StyledTableCell>
              </StyledTableRow>
            </Link>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Alert severity="info" sx={{ background: '#fff6d4' }}>
      {t('alert-no-subscription')}
    </Alert>
  );
};
export default SubscriptionList;
