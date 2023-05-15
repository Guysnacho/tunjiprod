import { Box, Grid } from "@mui/material";
import Logo from "../assets/Logo_clear.png";

import Image from "next/image";

/**
 * @fileoverview Navigation bar of the website
 * @function Navbar
 * @remarks Setting type for pages with a layout
 * TODO - Add an actual navbar under the logo, pointing to projects, music, and art sections
 */

const Navbar = () => {
  return (
    <Grid item xs={12} sx={{ py: 3 }}>
      <Box
        sx={{
          maxWidth: { xs: "65vw", sm: "45vw", md: "30vw", lg: "25vw" },
          mx: "auto",
        }}
      >
        <Image src={Logo} alt="logo" width={300} />
      </Box>
    </Grid>
  );
};
export default Navbar;
