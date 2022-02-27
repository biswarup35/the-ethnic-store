import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import * as React from "react";
import { useRouter } from "next/router";
import { orderState, cartState } from "../App";
import { useSnapshot } from "valtio";

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

const ThankYou = () => {
  const { query, push } = useRouter();
  const [open, setOpen] = React.useState(false);
  const { orderId } = query as {
    orderId: string;
  };
  const { findOrder } = useSnapshot(orderState);
  const order = findOrder(orderId);
  const { reset } = useSnapshot(cartState);

  React.useEffect(() => {
    if (orderId) {
      setOpen(true);
      reset();
    }

    if (!orderId) {
      push("/");
    }
  }, [orderId, push, reset]);

  return (
    <React.Fragment>
      <Dialog open={open}>
        <DialogTitle>Thank you!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Thank you, {order.userName} your order has been placed!
            </Typography>
            <Typography>Order ID: {order.orderId}</Typography>
            <Typography>Amount: {(order.amount / 100).toFixed(2)}</Typography>
            <Box component="p">
              <Typography>Items:</Typography>
              {order?.items?.map((item: any) => (
                <Stack
                  key={item.id}
                  direction="row"
                  flexWrap="wrap"
                  spacing={2}
                >
                  <Typography>{item.title}</Typography>
                  <Typography>{` x ${item.quantity}`}</Typography>
                  <Typography>{`size ${item.size}`}</Typography>
                </Stack>
              ))}
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              push("/orders");
            }}
            variant="outlined"
          >
            View Orders
          </Button>
          <Button
            onClick={() => {
              push("/");
            }}
            variant="contained"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ThankYou;
