import { GlobalContext } from "../AppContext/GlobalContext";
import * as React from "react";
import { Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { ProductContext } from "../../pages/[slug]";
import { inTheCart } from "../../utils/cart";
interface CartButtonProps {}

const CartButton: React.FunctionComponent<CartButtonProps> = () => {
  const { cartService }: any = React.useContext(GlobalContext);
  const { id }: any = React.useContext(ProductContext);
  const [inCart, setInCart] = React.useState<boolean>();

  const toggleCart = (inCart: boolean | undefined) => {
    if (inCart) {
      void cartService.send({
        type: "REMOVE_CART",
        id,
      });
      setInCart(false);
    }
    if (!inCart) {
      void cartService.send({
        type: "ADD_TO_CART",
        id,
      });
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
