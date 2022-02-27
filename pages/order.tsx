import * as React from "react";
import { useRouter } from "next/router";
import { withPageAuthRequired, UserContext } from "@auth0/nextjs-auth0";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { cartState, orderState } from "../App";
import { useSnapshot } from "valtio";

export const getServerSideProps = withPageAuthRequired();

const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

const Order = ({ user }: UserContext) => {
  const { items, cartValue } = useSnapshot(cartState);
  const { addOrder } = useSnapshot(orderState);
  const router = useRouter();
  const handlePayment = React.useCallback(async () => {
    const res = await initializeRazorpay();
    if (!res) {
      console.log("Razorpay SDK Failed to load");
      return;
    }
    // Send Data to Backend for verification
    const data = await fetch("/api/razorpay", {
      method: "POST",
      body: JSON.stringify({
        amount: cartValue,
        currency: "INR",
      }),
    }).then((t) => t.json());
    if (data.status === "success") {
      const options = {
        key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        name: "The Ethnic Store",
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        description: "Thankyou for your payment",
        image: "https://manuarora.in/logo.png",
        handler: function () {
          // store the order details on localStorage
          addOrder({
            userName: user?.name ?? "",
            orderId: data.id as string,
            amount: data.amount as number,
            currency: data.currency as string,
            items,
          });
          router.push(`/thankyou?orderId=${data.id}`);
        },
        prefill: {
          name: "The Ethnic Store",
          email: "theethnicstore@gmail.com",
          contact: "7001585904",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    }
  }, [addOrder, items, router, user, cartValue]);
  return (
    <>
      <Container sx={{ my: 2 }} maxWidth="sm">
        <Typography textAlign="center">Hello, {user?.given_name}</Typography>
        <Typography textAlign="center">Enter your delivery address</Typography>

        <Stack sx={{ my: 2 }} gap={2}>
          <TextField label="City" type="text" size="small" fullWidth />
          <Stack direction="row" gap={2}>
            <TextField label="State" size="small" fullWidth />
            <TextField label="Pin" type="number" size="small" fullWidth />
          </Stack>
          <TextField label="Land mark" size="small" fullWidth />
          <TextField label="Phone number" type="tel" size="small" fullWidth />
        </Stack>
        <Button fullWidth onClick={handlePayment}>
          Confirm
        </Button>
      </Container>
    </>
  );
};

export default Order;
