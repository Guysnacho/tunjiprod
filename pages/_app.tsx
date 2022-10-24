import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";
import Layout from "../components/Layout";
import { NextPage } from "next";

/**
 * Entry point of the application
 * @function MyApp
 * @remarks Setting type for pages with a layout
 * @remarks Type for properties of a page with a layout
 * Setup for layout use in this app
 * @remarks Setting type for pages with a layout
 * @type
 */
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <>
      <React.StrictMode>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </React.StrictMode>
    </>
  );
}

export default MyApp;
