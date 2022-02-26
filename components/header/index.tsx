import Link from "next/link";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  Theme,
  IconButton,
  Box,
  Container,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Button,
} from "@mui/material";
import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Desktop from "./desktop";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Mobile from "./mobile";
import { useUser } from "@auth0/nextjs-auth0";
import { cartState } from "../../App";
import { useSnapshot } from "valtio";

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = (): JSX.Element => {
  const { items } = useSnapshot(cartState);
  const { user } = useUser();

  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );
  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

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
                  <Link href={"/"} passHref>
                    <Button sx={{ textTransform: "none" }}>
                      The Ethnic Store
                    </Button>
                  </Link>
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
                  <IconButton onClick={handleMenuClick}>
                    <Avatar sx={{ height: 28, width: 28 }}>
                      {user?.picture && (
                        <Image
                          src={user.picture}
                          alt={user.nickname ?? "user"}
                          height={28}
                          width={28}
                        />
                      )}
                    </Avatar>
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
                  <Badge badgeContent={items.length} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Link>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <Toolbar variant="dense" />
      <Mobile open={open} onClose={toggleDrawer} />
      <Menu open={openMenu} anchorEl={anchorEl} onClose={handleClose}>
        {user && <MenuItem>Profile</MenuItem>}
        {!user && (
          <Link href="/api/auth/login" passHref>
            <MenuItem>{!user && "Login"}</MenuItem>
          </Link>
        )}
        {user && (
          <Link href={"/api/auth/logout"} passHref>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Link>
        )}
      </Menu>
    </React.Fragment>
  );
};

export default Header;
