import * as React from "react";
import type { GetStaticProps, NextPage } from "next";
import {
  Container,
  Divider,
  Stack,
  Box,
  Typography,
  Button,
} from "@mui/material";
import ItemCheckout from "../components/views/itemCheckout";
import { cartItems } from "../utils/cart";

export const getStaticProps: GetStaticProps = async () => {
  let data = {};
  try {
    let response = await fetch(`${process.env.SITE_URL}/products`);
    data = await response.json();
  } catch (error) {
    console.log(error);
  }
  return {
    props: { data },
  };
};

const Checkout: NextPage = ({ data }: any) => {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    const list = cartItems();
    const items = data.filter((item: any) => list?.includes(item.id));
    setItems(items);
  }, [data]);
  if (items) {
    return (
      <React.Fragment>
        <Container sx={{ my: 2 }} maxWidth="md">
          <Stack direction="column" gap={2}>
            {items.map((item: any) => (
              <ItemCheckout
                key={item.id}
                image={item.image}
                title={item.title}
                brand={item.brand}
                price={item.price}
                discount={item.discount}
              />
            ))}
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Button variant="contained">Place order</Button>
            <Typography>Total price:</Typography>
          </Box>
        </Container>
      </React.Fragment>
    );
  } else {
    return <h1>No products!</h1>;
  }
};

export default Checkout;
