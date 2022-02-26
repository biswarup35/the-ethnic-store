import "../styles/globals.css";
import * as React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import Header from "../components/header";
import Footer from "../components/footer";
import theme from "../theme";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <title>The Ethnic Store</title>
      </Head>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <Header />
          <main id="main-content">
            <Component {...pageProps} />
          </main>
          <Footer />
        </ThemeProvider>
      </UserProvider>
    </React.Fragment>
  );
}

export default MyApp;
