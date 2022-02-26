import { Box, Typography } from "@mui/material";
import * as React from "react";
import discountCal from "../../utils/discount";
interface PriceProps {
  price: number;
  discount?: number;
  align?: "left" | "center" | "right";
  quantity?: number;
}

const Price: React.FunctionComponent<PriceProps> = ({
  price,
  discount = 0,
  align,
  quantity,
}) => {
  let priceTotal: number = 0;
  if (quantity) {
    priceTotal = discountCal(price)(discount) * quantity;
  }
  return (
    <Box sx={{ textAlign: align ?? "center" }}>
      {quantity && (
        <Typography
          sx={{ mx: 1 }}
          variant="h6"
          component="span"
          color={quantity ? "GrayText" : "black"}
        >{`${quantity} x`}</Typography>
      )}
      <Typography
        variant="h6"
        color={quantity ? "GrayText" : "black"}
        component="span"
      >
        <sup>&#8377;</sup> {discountCal(price)(discount)}
      </Typography>
      <Typography
        sx={{ ml: 1, textDecoration: "line-through", fontStyle: "italic" }}
        component="span"
        color="textSecondary"
      >
        &#8377;{price}
      </Typography>
      {quantity && (
        <Typography sx={{ mx: 1 }} color="green" component="span">
          ({discount ?? 0}% OFF)
        </Typography>
      )}
      {!quantity && (
        <Typography sx={{ ml: 1 }} color="red" component="span">
          ({discount ?? 0}% OFF)
        </Typography>
      )}
      {quantity && (
        <Typography sx={{ ml: 1 }} variant="h6" component="span">
          {`= ${quantity && priceTotal.toFixed(2)}`}{" "}
        </Typography>
      )}
    </Box>
  );
};

export default Price;
