import { lazy, Suspense } from 'react';
import { loadRemote } from '@module-federation/runtime';
import { NextPage, NextPageContext } from 'next';

type RemoteComponentType = React.ComponentType<any> & {
  getInitialProps?: (ctx: NextPageContext) => Promise<any>;
};

interface RemoteModule {
  default: RemoteComponentType;
}

const HomePage = lazy<RemoteComponentType>(() =>
  loadRemote('home/home').then((mod) => {
    const typedMod = mod as RemoteModule;
    return { default: typedMod.default };
  })
);

interface HomeProps {
  //add necessary props;
}

const Home: NextPage<HomeProps> = (props: HomeProps) => {
  return (
    <Suspense fallback={'loading'}>
      <HomePage {...props} />
    </Suspense>
  );
};

Home.getInitialProps = async (ctx: NextPageContext) => {
  const res = await loadRemote('home/home') as any;
  return res.default.getInitialProps ? await res.default.getInitialProps(ctx) : {};
};

export default Home;
