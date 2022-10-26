import { Grid } from "@mui/material";
import Notebook from "../assets/Notebook.jpg";
import Footer from "./Footer";
import Navbar from "./Navbar";

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
    <Grid
      container
      sx={{ background: `url(${Notebook.src})`, backgroundRepeat: "repeat-y" }}
    >
      <Navbar />
      {children}
      <Footer />
    </Grid>
  );
};

export default Layout;
