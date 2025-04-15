/* eslint-disable eqeqeq */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import Main from 'layouts/main';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import OrdersRoute from 'routes/orders';

const Orders: NextPage = () => {
  return (
    <Main>
      <Head>
        <title>Orders</title>
      </Head>
      <OrdersRoute />
    </Main>
  );
};

export default Orders;
