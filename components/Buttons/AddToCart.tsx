import { Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { FC } from "react";

interface ICartButton {
  onCart?: () => void;
}

const CartButton: FC<ICartButton> = ({ onCart }) => {
  return (
    <Button
      variant="contained"
      onClick={onCart}
      endIcon={<AddShoppingCartIcon />}
    >
      Add to cart
    </Button>
  );
};

export default CartButton;
