import Link from "next/link";
import * as React from "react";
import { Box, Button } from "@mui/material";
interface DesktopProps {}

const Desktop: React.FunctionComponent<DesktopProps> = () => {
  return (
    <Box>
      <Link href="/shop/women" passHref>
        <Button>Women</Button>
      </Link>

      <Link href="/shop/men" passHref>
        <Button>Men</Button>
      </Link>

      <Link href="/shop/kids" passHref>
        <Button>Kids</Button>
      </Link>
    </Box>
  );
};

export default Desktop;
