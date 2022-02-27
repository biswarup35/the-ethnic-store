import { proxy } from "valtio";
import { without } from "underscore";

/**
 * Todo: Add cart items to the local storage
 */

interface ICartItem {
  id: string;
  itemId: string;
  quantity: number;
  size: string;
  title: string;
  image: string;
  brand: string;
  discount: number;
  price: number;
}

interface ICart {
  items: ICartItem[];
  addItem(item: ICartItem): void;
  removeItem(itemId: string): void;
  update: boolean;
  toggleUpdate(): void;
  quantityIncrement(index: number): void;
  quantityDecrement(index: number): void;
  getQuantity(index: number): number;
  reset(): void;
  cartValue: number;
  setCartValue(value: number): void;
}

const cartState: ICart = proxy<ICart>({
  items: [],
  addItem: (item) => {
    cartState.items.push(item);
  },
  removeItem: (itemId) => {
    cartState.items = cartState.items.filter((item) => item.itemId !== itemId);
  },
  quantityIncrement: (index) => {
    cartState.items[index].quantity++;
  },
  quantityDecrement: (index) => {
    cartState.items[index].quantity--;
  },
  getQuantity: (index) => {
    return cartState.items[index]?.quantity;
  },
  update: false,
  toggleUpdate: () => {
    cartState.update = !cartState.update;
  },
  reset: () => {
    cartState.items = [];
  },
  cartValue: 0,
  setCartValue: (value) => {
    cartState.cartValue = value;
  },
});

export default cartState;
