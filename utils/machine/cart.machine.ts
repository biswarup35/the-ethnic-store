import { uniq, without } from "underscore";
import { createMachine, assign } from "xstate";
import { cartItems, addToCart, removeFromCart, resetCart } from "../cart";

type CartContext = {
  items: string[];
};

type CartEvent =
  | { type: "SET_CART"; items: string[] }
  | { type: "ADD_TO_CART"; id: string }
  | { type: "REMOVE_CART"; id: string }
  | { type: "RESET_CART" };

export const cartMachine = createMachine<CartContext, CartEvent>({
  id: "cart",
  initial: "idel",
  context: {
    items: [],
  },
  states: {
    idel: {
      invoke: {
        id: "idel",
        src: (_context, _event) => (callback, _onEvent) => {
          const items = cartItems();
          callback({ type: "SET_CART", items });
        },
      },
      on: {
        SET_CART: {
          actions: assign({
            items: (_, { items }) => uniq(items),
          }),
        },
        ADD_TO_CART: {
          actions: assign({
            items: ({ items }, { id }) => {
              addToCart(id);
              return [...items, id];
            },
          }),
        },
        REMOVE_CART: {
          actions: assign({
            items: ({ items }, { id }) => {
              removeFromCart(id);
              return without(items, id);
            },
          }),
        },
        RESET_CART: {
          actions: assign({
            items: ({}) => {
              resetCart();
              return [];
            },
          }),
        },
      },
    },
    add: {
      on: {},
    },
    remove: {
      on: {},
    },
  },
});
