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
import { CheckoutItems } from "../Views";
import discount from "../utils/discount";
import { Product } from "../components/product/product";
import { getProducts } from "./api/products";
import { cartState } from "../App";
import { useSnapshot } from "valtio";

export const getStaticProps: GetStaticProps = async () => {
  const data: Product[] = getProducts();
  return {
    props: { data },
  };
};

const Checkout: NextPage = ({ data }: any) => {
  const { items, removeItem, update } = useSnapshot(cartState);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const test = items.map((item) => ({
      price: discount(item.price * item.quantity)(item.discount),
    }));
    const total = test.reduce((acc, curr) => acc + curr.price, 0);
    setTotal(total);
  }, [items]);

  if (items.length > 0) {
    return (
      <React.Fragment>
        <Container sx={{ my: 2 }} maxWidth="lg">
          <Stack direction="column" gap={2}>
            {items.map((item, index) => (
              <CheckoutItems
                key={item.itemId}
                index={index}
                id={item.id}
                image={item.image}
                title={item.title}
                brand={item.brand}
                price={item.price}
                size={item.size}
                discount={item.discount}
                onRemove={() => removeItem(item.itemId)}
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
            <Stack alignItems="center">
              <Typography variant="body2" component="span">
                Total:
                <Typography sx={{ mx: 1 }} variant="h6" component="span">
                  &#8377; {` ${total.toFixed(2)}`}
                </Typography>
              </Typography>
              <Typography variant="body2">
                (after discount, incl. VAT)
              </Typography>
            </Stack>
          </Box>
        </Container>
      </React.Fragment>
    );
  } else {
    return <h1>No products!</h1>;
  }
};

export default Checkout;
