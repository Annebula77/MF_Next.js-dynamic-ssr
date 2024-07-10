import React from 'react';
import { NextPage, NextPageContext } from 'next';

const withData = (PageComponent: NextPage<any>) => {
  const WithDataComponent: NextPage<any> = (props) => <PageComponent {...props} />;

  WithDataComponent.getInitialProps = async (ctx: NextPageContext) => {
    let pageProps = {};

    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }

    return { ...pageProps, example: 'data' };
  };

  return WithDataComponent;
};

export default withData;
