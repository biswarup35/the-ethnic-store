import * as React from "react";
import {
  Box,
  Button,
  Theme,
  Typography,
  useMediaQuery,
  Stack,
} from "@mui/material";
import { truncateText } from "../utils";
import Image from "next/image";
import { Counter, Pricing } from "../components";
import { cartState } from "../App";
import { useSnapshot } from "valtio";

interface ItemProps {
  id: string;
  index: number;
  image: string;
  title: string;
  brand: string;
  price: number;
  discount: number;
  size: string;
  onRemove: () => void;
}

const CheckoutItems: React.FunctionComponent<ItemProps> = ({
  id,
  image,
  title,
  brand,
  price,
  discount,
  size,
  index,
  onRemove,
}) => {
  const smUP = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const {
    getQuantity,
    quantityIncrement,
    quantityDecrement,
    items,
    toggleUpdate,
  } = useSnapshot(cartState);
  const count = getQuantity(index);

  React.useEffect(() => {}, [items]);

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
          <Typography>{truncateText(title, 30)}</Typography>
          <Typography>{`Size: ${size}`}</Typography>
        </Box>
      </Box>
      <Counter
        hideTitle
        count={count}
        onIncrement={() => {
          quantityIncrement(index);
          toggleUpdate();
        }}
        onDecrement={() => {
          quantityDecrement(index);
          toggleUpdate();
        }}
      />
      <Button
        onClick={onRemove}
        fullWidth={smUP ? false : true}
        variant="outlined"
      >
        Remove
      </Button>
      <Box>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Pricing price={price} discount={discount} quantity={count} />
        </Stack>
      </Box>
    </Box>
  );
};

export default CheckoutItems;
