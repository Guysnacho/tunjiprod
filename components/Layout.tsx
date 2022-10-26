import Footer from "./Footer";
import Head from "next/head";
import Navbar from "./Navbar";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";

/**
 * @type {LayoutProps} - Pages that will be wrapped by the Navbar and Footer
 * @remarks The purpose of having layouts in this case is that React doesn't
 * need to rebuild the reuised components when switching pages
 */
type LayoutProps = {
  children: React.ReactNode;
};

/**
 *
 * @param children - ReactNode
 * @returns A page with a Navbar and Footer
 */
const Layout = ({ children }: LayoutProps) => {
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "teal" }}>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <Navbar />
      <Container component="main">
        {children}
      </Container>
      <Footer />
    </Container>
  );
};

export default Layout;
