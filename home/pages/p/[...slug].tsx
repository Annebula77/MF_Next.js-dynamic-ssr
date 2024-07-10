import React, { lazy, Suspense, ComponentType, ReactNode } from 'react';
import { loadRemote } from '@module-federation/runtime';
import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';

// Type for a component with getInitialProps ??? ReactNode or func 
type RemoteComponentType = ComponentType<any> & {
  getInitialProps?: (ctx: NextPageContext) => Promise<any>;
};

// Type for the result of loadRemote
interface RemoteModule {
  default: RemoteComponentType;
}

const PdpPage = lazy<RemoteComponentType>(() =>
  loadRemote('shop/pdp').then((mod) => {
    const typedMod = mod as RemoteModule;
    return { default: typedMod.default };
  }),
);

interface PdpProps {
  //props to be added if necessary 
}

const Pdp: NextPage<PdpProps> = (props: PdpProps): ReactNode => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <Suspense fallback={'loading'}>
      <PdpPage {...props} />
      <h1>PDP!!! slug: {slug}</h1>
    </Suspense>
  );
};

Pdp.getInitialProps = async (ctx: NextPageContext) => {
  const res = await loadRemote('shop/pdp') as RemoteModule;

  if (res.default.getInitialProps) {
    return res.default.getInitialProps(ctx);
  }

  return {};
};

export default Pdp;
