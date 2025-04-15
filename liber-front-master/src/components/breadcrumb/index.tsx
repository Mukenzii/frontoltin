import React from 'react';
import { useTranslation } from 'next-i18next';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';

const PageBreadcrumb = ({ pageData }: { pageData: any }) => {
  const { t } = useTranslation();
  const lastItem = pageData.length - 1;
  const multiBreadcrumbs = pageData?.map((item: any, index: number) =>
    index !== lastItem ? (
      <Link
        underline="hover"
        key={item?.title}
        fontSize="16px"
        href={item?.link}
      >
        {item?.title}
      </Link>
    ) : (
      <Typography
        key={item?.title}
        color="text.primary"
        fontSize="16px"
        sx={{ color: '#9A9A9A' }}
      >
        {item?.title}
      </Typography>
    )
  );
  const finalBreadcrumb = [
    <Link underline="hover" key="1" fontSize="16px" color="#3F51B5" href="/">
      {t('homepage')}
    </Link>,
    ...multiBreadcrumbs,
  ];
  return (
    <Stack
      spacing={2}
      sx={{
        paddingY: 1,
        marginBottom: 2,
        background: '#fff',
        borderBottom: '1px solid #f3f3f3',
      }}
    >
      <Container maxWidth="lg">
        <Breadcrumbs
          separator="/"
          sx={{ color: '#3F51B5' }}
          aria-label="breadcrumb"
        >
          {finalBreadcrumb}
        </Breadcrumbs>
      </Container>
    </Stack>
  );
};
export default PageBreadcrumb;
