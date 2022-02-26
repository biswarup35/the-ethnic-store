import { proxy } from "valtio";

interface ICart {
  id: string;
  quantity: number;
  size: string;
  setId(id: string): void;
  setQuantity(quantity: number): void;
  setSize(size: string): void;
}

export const cart = proxy<ICart>({
  id: "",
  quantity: 0,
  size: "",
  setId: (id: string) => {
    cart.id = id;
  },
  setQuantity: (quantity: number) => {
    cart.quantity = quantity;
  },
  setSize: (size: string) => {
    cart.size = size;
  },
});
