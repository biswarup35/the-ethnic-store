import Link from "next/link";
import { Drawer, List, ListItem, ListItemButton } from "@mui/material";
import * as React from "react";
interface MobileProps {
  open: boolean;
  onClose: () => void;
}

const Mobile: React.FunctionComponent<MobileProps> = ({ open, onClose }) => {
  return (
    <Drawer open={open} onClose={onClose}>
      <List sx={{ width: 240 }}>
        <Link href="/shop/women" passHref>
          <ListItem button>Women</ListItem>
        </Link>
        <Link href="/shop/men" passHref>
          <ListItem button>Men</ListItem>
        </Link>
        <Link href="/shop/kids" passHref>
          <ListItem button>Kids</ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

export default Mobile;
