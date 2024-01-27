import Layout from '@/components/layout/layout';
import Theme from '@ui/styles/Theme';

import '@/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <Theme>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Theme>
  );
}
