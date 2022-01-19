import { Toolbar, Typography } from "@mui/material";
import * as React from "react";
interface FooterProps {}

const Footer: React.FunctionComponent<FooterProps> = () => {
  return (
    <footer style={{ backgroundColor: "hotpink" }} id="footer">
      <Toolbar sx={{ justifyContent: "center" }} variant="dense">
        <Typography textAlign="center">
          The Ethnic Store ©{new Date().getFullYear()}
        </Typography>
      </Toolbar>
    </footer>
  );
};

export default Footer;
