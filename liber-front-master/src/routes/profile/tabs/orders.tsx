import React from 'react';
import { useTranslation } from 'next-i18next';
import { get } from 'lodash';
import { useOrdersList } from '../../../services/api/use-orders';
import OrderCard from '../components/order-card';
import { Title } from './styles/tabs-title.style';

const OrdersTab = () => {
  const { data } = useOrdersList();
  const { t } = useTranslation();
  return (
    <>
      <Title>{t('my-orders')}</Title>
      {get(data, 'results', []).map((product: any) => (
        <OrderCard key={get(product, 'guid')} {...{ product }} />
      ))}
    </>
  );
};

export default OrdersTab;
