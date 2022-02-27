import { Container, List, ListItem, Stack, Typography } from "@mui/material";
import * as React from "react";
import { orderState } from "../App";
import { useSnapshot } from "valtio";
const Orders = () => {
  const { orders } = useSnapshot(orderState);
  const items = orders.filter((order: any) => order.userName).reverse();
  return (
    <Container sx={{ my: 2 }} maxWidth="md">
      <Typography textAlign="center" variant="h5" component="h1">
        Your orders
      </Typography>
      <List>
        {items.map((item: any) => (
          <ListItem divider key={item.orderId}>
            <Stack>
              <Typography variant="h6">{item.userName}</Typography>
              <Typography>{`Order ID: ${item.orderId}`}</Typography>
              <Typography>{`Order Amount: ${(item.amount / 100).toFixed(
                2
              )}`}</Typography>
              <Typography>{`Created at: ${new Date(
                item.createdAt
              ).toLocaleString()}`}</Typography>
            </Stack>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Orders;
