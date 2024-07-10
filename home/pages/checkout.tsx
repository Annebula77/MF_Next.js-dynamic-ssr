import React, { lazy, Suspense } from 'react';
import { loadRemote } from '@module-federation/runtime';
import { NextPage, NextPageContext } from 'next';

type RemoteComponentType = React.ComponentType<any> & {
  getInitialProps?: (ctx: NextPageContext) => Promise<any>;
};

interface RemoteModule {
  default: RemoteComponentType;
}

const CheckoutPage = lazy<RemoteComponentType>(() =>
  loadRemote('checkout/checkout').then((mod) => {
    const typedMod = mod as RemoteModule;
    return { default: typedMod.default };
  })
);

interface CheckoutProps {
  // add props if there are any
}

const Checkout: NextPage<CheckoutProps> = (props) => {
  return (
    <Suspense fallback="loading">
      <CheckoutPage {...props} />
    </Suspense>
  );
};

Checkout.getInitialProps = async (ctx: NextPageContext) => {
  const res = await loadRemote('checkout/checkout') as any;
  return res.default.getInitialProps ? await res.default.getInitialProps(ctx) : {};
};

export default Checkout;
