import * as React from "react";
import { Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { ProductContext } from "../../pages/[slug]";
import { addToCart, inTheCart, removeFromCart } from "../../utils/cart";
interface CartButtonProps {}

const CartButton: React.FunctionComponent<CartButtonProps> = () => {
  const { id }: any = React.useContext(ProductContext);
  const [inCart, setInCart] = React.useState<boolean>();

  const toggleCart = (inCart: boolean | undefined) => {
    if (inCart) {
      void removeFromCart(id);
      setInCart(false);
    }
    if (!inCart) {
      void addToCart(id);
      setInCart(true);
    }
  };
  React.useEffect(() => {
    setInCart(inTheCart(id) === id);
  }, [id]);

  return (
    <Button
      onClick={toggleCart.bind(null, inCart)}
      size="large"
      variant={inCart ? "outlined" : "contained"}
      endIcon={inCart ? <RemoveShoppingCartIcon /> : <AddShoppingCartIcon />}
    >
      {inCart ? "Remove" : "Add to cart"}
    </Button>
  );
};

export default CartButton;
