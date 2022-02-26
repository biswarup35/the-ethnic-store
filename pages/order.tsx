import * as React from "react";
import { withPageAuthRequired, UserContext } from "@auth0/nextjs-auth0";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export const getServerSideProps = withPageAuthRequired();

const Order = ({ user }: UserContext) => {
  const [open, setOpen] = React.useState(false);
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
        <Button
          fullWidth
          onClick={() => {
            setOpen(true);
          }}
        >
          Confirm
        </Button>
      </Container>
      <Dialog open={open}>
        <DialogTitle>Thank you!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Thank you, {user?.name} your order has been placed!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Order;
