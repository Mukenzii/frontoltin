import Main from 'layouts/main';
import { GetServerSideProps } from 'next';
import React from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ProductDetailsPage from 'routes/product-detail';
import axios from 'axios';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import { SEO } from 'components/seo';

const ProductDetail = (props: any) => {
  const data = get(props, 'dehydratedState.queries[0].state.data');
  const { locale, asPath } = useRouter();
  console.log(data);
  return (
    <Main>
      <SEO
        title={get(data, 'title')}
        description={get(data, 'short_description').substr(50)}
        canonical={`https://liber.uz/${locale}${asPath}`}
        image={get(data, 'thumbnail')}
      />
      <ProductDetailsPage {...{ data, locale }} />
    </Main>
  );
};
const getSingleProduct = async (guid: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/book/${guid}/detail`
  );
  return data;
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const guid = context.params?.guid as any;
  const queryClient = new QueryClient();
  const lang = context?.locale;
  await queryClient.prefetchQuery(['books-details', { guid, lang }], () =>
    getSingleProduct(guid)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(context.locale as string, ['common'])),
    },
  };
};

export default ProductDetail;
