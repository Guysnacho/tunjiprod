import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/system";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";
import Layout from "../components/Layout";

/**
 * @function MyApp
 * @fileoverview Entry point of the application
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

/**
 * Project Theme
 * @remark Theme generator courtesy of bareynol
 * @link https://bareynol.github.io/mui-theme-creator/#Typography 
 * @remark Premade components courtesy of MUI
 * @link https://mui.com/
 */
const theme = createTheme({
  palette: {
    primary: {
      main: "#068c62",
    },
    secondary: {
      main: "#8c7158",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#edb3d6",
    },
    divider: "#73053E",
  },
  typography: {
    fontFamily: "Poppins",
    h1: {
      fontFamily: "Nixie One",
      fontWeight: 650,
    },
    h2: {
      fontFamily: "Nixie One",
      fontWeight: 650,
    },
    h3: {
      fontFamily: "Nixie One",
      fontWeight: 650,
    },
    h4: {
      fontFamily: "Nixie One",
      fontWeight: 650,
    },
    h5: {
      fontFamily: "Nixie One",
      fontWeight: 650,
    },
    h6: {
      fontFamily: "Nixie One",
      fontWeight: 650,
    },
    body2: {
      fontFamily: "Poppins",
    },
  },
});

/**
 * @function MyApp
 * @fileoverview Entry point of the application
 */
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default MyApp;
