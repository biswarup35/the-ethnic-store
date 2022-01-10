import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  Theme,
  IconButton,
  Box,
  Container,
} from "@mui/material";
import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Desktop from "./desktop";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import Mobile from "./mobile";

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = (): JSX.Element => {
  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen((value) => !value);
  };

  return (
    <React.Fragment>
      <AppBar color="default" elevation={0}>
        <Toolbar variant="dense">
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            maxWidth="xl"
          >
            <Box>
              {!smUp && (
                <IconButton onClick={toggleDrawer}>
                  <MenuIcon />
                </IconButton>
              )}
              {smUp && (
                <React.Fragment>
                  <Typography>The Ethnic Store</Typography>
                </React.Fragment>
              )}
            </Box>
            <Box>
              {smUp && (
                <React.Fragment>
                  <Desktop />
                </React.Fragment>
              )}
            </Box>
            <Box>
              {smUp && (
                <React.Fragment>
                  <IconButton>
                    <PersonIcon />
                  </IconButton>
                  <Link href="/favorites" passHref>
                    <IconButton>
                      <FavoriteIcon />
                    </IconButton>
                  </Link>
                </React.Fragment>
              )}
              <Link href={"/checkout"} passHref>
                <IconButton>
                  <ShoppingCartIcon />
                </IconButton>
              </Link>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <Toolbar variant="dense" />
      <Mobile open={open} onClose={toggleDrawer} />
    </React.Fragment>
  );
};

export default Header;
