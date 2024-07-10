import { useRouter } from 'next/router';
import { NextPage, NextPageContext } from 'next';

interface PDPProps {
  slug?: string | string[];
}

const PDP: NextPage<PDPProps> = ({ slug }) => {
  const router = useRouter();
  const querySlug = router.query.slug;
  return <h1>PDP!!! slug: {slug ?? querySlug}</h1>;
};

PDP.getInitialProps = async (ctx: NextPageContext): Promise<PDPProps> => {
  const { slug } = ctx.query;
  return { slug };
};

export default PDP;
