import "../styles/globals.css";
import * as React from "react";
import Head from "next/head";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <title>The Enthic Store</title>
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp;
