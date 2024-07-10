import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import React from 'react';
import { revalidate, FlushedChunks, flushChunks } from '@module-federation/nextjs-mf/utils';

interface MyDocumentProps extends DocumentInitialProps {
  chunks: any;
}

class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<MyDocumentProps> {
    if (process.env.NODE_ENV === 'development' && ctx.req && !ctx.req.url?.includes('_next')) {
      await revalidate().then((shouldReload: boolean) => {
        if (shouldReload && ctx.res) {
          ctx.res.writeHead(302, { Location: ctx.req?.url });
          ctx.res.end();
        }
      });
    } else {
      ctx.res?.on('finish', () => {
        revalidate();
      });
    }

    const initialProps = await Document.getInitialProps(ctx);
    const chunks = await flushChunks();

    return {
      ...initialProps,
      chunks,
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="robots" content="noindex" />
          <FlushedChunks chunks={this.props.chunks} />
        </Head>
        <body className="bg-background-grey">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
