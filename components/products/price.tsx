import { Box, Typography } from "@mui/material";
import * as React from "react";
import discountCal from "../../utils/discount";
interface PriceProps {
  price: number;
  discount?: number;
}

const Price: React.FunctionComponent<PriceProps> = ({
  price,
  discount = 0,
}) => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" component="span">
        <sup>&#8377;</sup> {discountCal(price)(discount)}
      </Typography>
      <Typography
        sx={{ ml: 1, textDecoration: "line-through", fontStyle: "italic" }}
        component="span"
        color="textSecondary"
      >
        &#8377;{price}
      </Typography>
      <Typography sx={{ ml: 1 }} color="red" component="span">
        ({discount ?? 0}% OFF)
      </Typography>
    </Box>
  );
};

export default Price;
