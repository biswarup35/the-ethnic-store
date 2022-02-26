import { proxy } from "valtio";
const state = proxy({
  quantity: 1,
  setQuantity: (quantity: number) => (state.quantity = quantity),
  increment: () => state.quantity++,
  decrement: () => state.quantity--,
  size: "",
  setSize: (size: string) => (state.size = size),
});

export default state;
