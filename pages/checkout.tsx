import Link from "next/link";
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
import { GlobalContext } from "../components/AppContext/GlobalContext";
import { useActor } from "@xstate/react";
import discount from "../utils/discount";
import { Product } from "../components/product/product";
import { getProducts } from "./api/products";

export const getStaticProps: GetStaticProps = async () => {
  const data: Product[] = getProducts();
  return {
    props: { data },
  };
};

const Checkout: NextPage = ({ data }: any) => {
  const { cartService }: any = React.useContext(GlobalContext);
  const [state]: any = useActor(cartService);
  const { items: cartItems } = state.context;
  const [items, setItems] = React.useState<Product[]>([]);
  const [price, setPrice] = React.useState<number>();

  React.useEffect(() => {
    const items = data.filter((item: Product) => cartItems?.includes(item.id));
    setItems(items);
    const priceArr: number[] = items.map((item: Product) =>
      discount(item.price)(item.discount)
    );
    setPrice(priceArr?.reduce((prev, curr) => prev + curr, 0));
  }, [data, cartItems]);
  if (items) {
    return (
      <React.Fragment>
        <Container sx={{ my: 2 }} maxWidth="md">
          <Stack direction="column" gap={2}>
            {items.map((item) => (
              <ItemCheckout
                key={item.id}
                id={item.id}
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
            <Link href={"/order"} passHref>
              <Button variant="contained">Place order</Button>
            </Link>
            <Typography>Total price: {price}</Typography>
          </Box>
        </Container>
      </React.Fragment>
    );
  } else {
    return <h1>No products!</h1>;
  }
};

export default Checkout;
