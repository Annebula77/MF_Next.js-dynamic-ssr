import React, { lazy, Suspense } from 'react';
import { loadRemote } from '@module-federation/runtime';
import { NextPage, NextPageContext } from 'next';

type RemoteComponentType = React.ComponentType<any> & {
  getInitialProps?: (ctx: NextPageContext) => Promise<any>;
};

interface RemoteModule {
  default: RemoteComponentType;
}

const ShopPage = lazy<RemoteComponentType>(() =>
  loadRemote('shop/shop').then((mod) => {
    const typedMod = mod as RemoteModule;
    return { default: typedMod.default };
  })
);

interface ShopProps {
  // add props if needed
}

const Shop: NextPage<ShopProps> = (props) => {
  return (
    <Suspense fallback="loading">
      <ShopPage {...props} />
    </Suspense>
  );
};

Shop.getInitialProps = async (ctx: NextPageContext) => {
  const res = (await loadRemote('shop/shop')) as RemoteModule;

  if (res.default.getInitialProps) {
    return res.default.getInitialProps(ctx);
  }

  return {};
};

export default Shop;
