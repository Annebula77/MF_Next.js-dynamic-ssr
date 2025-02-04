import { AppProps } from 'next/app';
import Nav from '../components/nav';
import { init, loadRemote } from '@module-federation/runtime';
import React from 'react';
import withData from '../hoc/withData';

const remotes = (isServer: boolean) => {
  const location = isServer ? 'ssr' : 'chunks';
  return [
    {
      name: 'shop',
      entry: `http://localhost:3002/_next/static/${location}/remoteEntry.js`,
    },
    {
      name: 'checkout',
      entry: `http://localhost:3000/_next/static/${location}/remoteEntry.js`,
    },
  ];
};

if (typeof window === 'undefined') {
  init({
    name: 'home',
    remotes: remotes(true),
    // @ts-ignore
    force: true,
  });
} else {
  init({
    name: 'home',
    remotes: remotes(false),
    // @ts-ignore
    force: true,
  });
}


type AppOwnProps = { example: string };

const MyApp: React.FC<AppProps & AppOwnProps> = ({ Component, pageProps, example }) => {
  return (
    <>
      <Nav />
      <p>Data: {example}</p>
      <Component {...pageProps} />
      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }

        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }

        .title,
        .description {
          text-align: center;
        }

        .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }

        .card {
          padding: 18px 18px 24px;
          width: 220px;
          text-align: left;
          text-decoration: none;
          color: #434343;
          border: 1px solid #9b9b9b;
        }

        .card:hover {
          border-color: #067df7;
        }

        .card h3 {
          margin: 0;
          color: #067df7;
          font-size: 18px;
        }

        .card p {
          margin: 0;
          padding: 12px 0 0;
          font-size: 13px;
          color: #333;
        }
      `}</style>
    </>
  );
};

export default withData(MyApp);
