import { Box, Button, Theme, Typography, useMediaQuery } from "@mui/material";
import truncatText from "../../utils/truncateText";
import * as React from "react";
import Image from "next/image";
import Price from "../products/price";

interface ItemCheckoutProps {
  image: string;
  title: string;
  brand: string;
  price: number;
  discount: number;
}

const ItemCheckout: React.FunctionComponent<ItemCheckoutProps> = ({
  image,
  title,
  brand,
  price,
  discount,
}) => {
  const smUP = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  return (
    <Box
      display="inline-flex"
      flexDirection={smUP ? "row" : "column"}
      gap={2}
      alignItems={smUP ? "center" : ""}
      justifyContent="space-between"
    >
      <Box display="inline-flex" gap={2}>
        <Image src={image} alt={title} height={93.5} width={71} />

        <Box>
          <Typography variant="h6">{brand}</Typography>
          <Typography>{truncatText(title, 30)}</Typography>
        </Box>
      </Box>
      <Button fullWidth={smUP ? false : true} variant="outlined">
        Remove
      </Button>
      <Box>
        <Price price={price} discount={discount} />
      </Box>
    </Box>
  );
};

export default ItemCheckout;
