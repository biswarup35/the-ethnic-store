import { union, uniq, without } from "underscore";
interface Cart {
  list: string[];
}
const key = `cart`;
const addToCart = (id: string) => {
  const products: Cart = {
    list: [id],
  };
  if (window) {
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, JSON.stringify(products));
    }
    const { list }: Cart = JSON.parse(localStorage.getItem(key) ?? "");
    const newList: string[] = union(list, [id]);
    products.list.push(...newList);
    localStorage.setItem(key, JSON.stringify(products));
  }
};

const cartItems = (): string[] | undefined => {
  if (localStorage.getItem(key) === null) {
    return;
  }
  const { list }: Cart = JSON.parse(localStorage.getItem(key) ?? "");
  return list;
};

const removeFromCart = (id: string) => {
  if (window) {
    const { list }: Cart = JSON.parse(localStorage.getItem(key) ?? "");
    const newList: string[] = uniq(list);
    const updatedList = without(newList, id);
    const prodcuts: Cart = {
      list: updatedList,
    };
    localStorage.setItem(key, JSON.stringify(prodcuts));
  }
};

const inTheCart = (id: string): string | undefined => {
  if (localStorage.getItem(key) === null) {
    return;
  }
  let item: number | undefined = undefined;
  const { list }: Cart = JSON.parse(localStorage.getItem(key) ?? "");
  item = list.indexOf(id);

  if (list[item] === id) {
    return list[item];
  } else {
    return `not in the cart`;
  }
};

export { addToCart, removeFromCart, cartItems, inTheCart };
