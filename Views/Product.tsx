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
import { FC, useEffect } from "react";
import { useSnapshot } from "valtio";
import { productState, cartState, favoriteState } from "../App";
import {
  AddToCart,
  AddToFavorite,
  Pricing,
  Markdown,
  SelectSize,
  Counter,
} from "../components";

import { uid } from "uid";

interface ProductProps {
  data: any;
}

const Product: FC<ProductProps> = ({
  data: {
    id,
    image,
    title,
    brand,
    rating,
    price,
    discount,
    description,
    size: sizes,
  },
}) => {
  const { quantity, setQuantity, increment, decrement, size, setSize } =
    useSnapshot(productState);
  const { addItem } = useSnapshot(cartState);
  const { add, isFavorite, remove, items } = useSnapshot(favoriteState);
  useEffect(() => {
    return () => {
      setQuantity(1);
    };
  }, [setQuantity, items]);

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
            <Pricing price={price} discount={discount} align="left" />
            <Typography sx={{ mt: 1 }} color="green">
              inclusive of all taxes
            </Typography>
          </Box>
          {/* Size Component */}
          <SelectSize
            items={sizes}
            onSelect={(size) => {
              setSize(size);
            }}
          />

          <Counter
            count={quantity}
            onIncrement={increment}
            onDecrement={decrement}
          />
          <Stack sx={{ my: 4 }} direction="row" gap={2}>
            <AddToCart
              onCart={() => {
                addItem({
                  itemId: uid(10),
                  id,
                  image,
                  title,
                  brand,
                  price,
                  discount,
                  quantity,
                  size,
                });
              }}
            />
            <AddToFavorite
              isFavorite={isFavorite(id)}
              onFavorite={() => {
                if (isFavorite(id)) {
                  remove(id);
                } else {
                  add(id);
                }
              }}
            />
          </Stack>
          <Markdown>{description}</Markdown>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Product;
