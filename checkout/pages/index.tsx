import React, { lazy, Suspense } from 'react';
import Head from 'next/head';
import { NextPage, NextPageContext } from 'next';
import Shop from './shop';

const CC = lazy(() => import('../components/test'));

interface CheckoutProps {
  test: number;
}

const Checkout: NextPage<CheckoutProps> = (props: CheckoutProps) => (
  <div>
    <Head>
      <title>checkout</title>
      <link rel="icon" href="/nextjs-ssr/checkout/public/favicon.ico" />
    </Head>

    <div className="hero">
      <h1>checkout page</h1>
      <Suspense fallback={'loading'}>
        <CC />
      </Suspense>
      <h3 className="title">This is a federated page owned by localhost:3000</h3>
      <span>
        {' '}
        Data from federated <pre>getInitialProps</pre>
      </span>
      <br />
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
    <Shop />
  </div>
);

Checkout.getInitialProps = async (ctx: NextPageContext) => {
  return { test: 123 };
};

export default Checkout;
