import {
  Container,
  Grid,
  Typography,
  Divider,
  Rating,
  Box,
  Stack,
} from "@mui/material";

import Image from "next/image";
import * as React from "react";
import Price from "../products/price";
import Markdown from "../markdown/makdown";
import FavoriteButton from "../product/favoriteButton";
import CartButton from "../product/cartButton";

interface ProductProps {
  data: any;
}

const Product: React.FunctionComponent<ProductProps> = ({
  data: { id, image, title, brand, rating, price, discount, description },
}) => {
  return (
    <Container sx={{ my: 4 }} maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item lg={4}>
          <Image src={image} alt={title} height={374} width={284} />
        </Grid>
        <Grid item lg={8}>
          <Typography variant="h4" component="div" gutterBottom>
            {brand}
          </Typography>
          <Typography variant="h5" color="GrayText" component="h1" gutterBottom>
            {title}
          </Typography>
          <Box sx={{ mb: 2, display: "inline-flex", alignItems: "center" }}>
            <Rating readOnly value={rating} precision={0.5} size="small" />
            <Typography sx={{ ml: 1 }}>{rating}</Typography>
          </Box>
          <Divider />
          <Box sx={{ my: 1 }}>
            <Price price={price} discount={discount} align="left" />
            <Typography sx={{ mt: 1 }} color="green">
              inclusive of all taxes
            </Typography>
          </Box>
          <Stack sx={{ my: 4 }} direction="row" gap={2}>
            <CartButton />
            <FavoriteButton />
          </Stack>
          <Markdown>{description}</Markdown>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Product;
