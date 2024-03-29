import { CssBaseline } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { ThemeProvider } from "@mui/system";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";
import Layout from "../components/Layout";
import "../styles/styles.css";
import { AudioPlayerProvider } from "react-use-audio-player";

/**
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
let theme = createTheme({
  palette: {
    primary: {
      main: "#E5A174", // Tan Crayola
    },
    secondary: {
      main: "#2B8D63", // Sea Green
    },
    error: {
      main: "#AE0549", // Amaranth Purple
    },
    warning: {
      main: "#FDB0CF", // Nadeshiko Pink
    },
    info: {
      main: "#D2C6E6", // Languid Lavender
    },
    divider: "#1C132B", // ikiko
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
theme = responsiveFontSizes(theme);

/**
 * @function MyApp
 * @fileoverview Entry point of the application
 */
function MyApp({ Component, pageProps: { ...pageProps } }: AppPropsWithLayout) {
  return (
    <React.StrictMode>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AudioPlayerProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AudioPlayerProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default MyApp;
