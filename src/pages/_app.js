import Head from 'next/head';

import Layout from '@/components/layout/layout';
import Theme from '@ui/styles/Theme';

import '@/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <Theme>
      <Layout>
        <Head>
          <title>NextEvents</title>
          <meta
            name="description"
            content="Next example application offering event listings."
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Theme>
  );
}
