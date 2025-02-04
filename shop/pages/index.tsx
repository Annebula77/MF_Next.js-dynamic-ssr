import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { NextPage, NextPageContext } from 'next';


interface ShopProps {
  testing: number;
}


interface ProductLink {
  href: string;
  label: string;
  key: string;
}

const productLinks: ProductLink[] = [
  { href: '/p/1', label: 'Product 1', key: '' },
  { href: '/p/2', label: 'Product 2', key: '' },
  { href: '/p/3', label: 'Product 3', key: '' },
].map(link => {
  link.key = `product-link-${link.href}-${link.label}`;
  return link;
});

const Shop: NextPage<ShopProps> = (props) => (
  <div>
    <Head>
      <title>Shop</title>
      <link rel="icon" href="/nextjs-dynamic-ssr/shop/public/favicon.ico" />
    </Head>

    <div className="hero">
      <h1>Shop Page</h1>
      <h3 className="title">This is a federated page owned by localhost:3002</h3>
      <ul>
        {productLinks.map(({ key, href, label }) => (
          <li key={key}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
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
        font-size: 20px;
      }
      .title,
      .description {
        text-align: center;
      }
    `}</style>
  </div>
);

Shop.getInitialProps = async (_ctx: NextPageContext) => {
  console.log('loading slow api');
  return { testing: 1234 };
};

export default Shop;
