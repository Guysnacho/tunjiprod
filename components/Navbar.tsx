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
    <Grid item xs={12} sx={{ px: "auto", py: 3 }}>
      <Box
        sx={{
          px: "auto",
          width: { xs: "65vw", sm: "45vw", md: "30vw", lg: "25vw" },
          mx: "auto",
        }}
      >
        <Image src={Logo} />
      </Box>
    </Grid>
  );
};
export default Navbar;
