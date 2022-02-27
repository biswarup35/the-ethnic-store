import { proxy } from "valtio";

const key = "orders";

// interface ICartItem {
//   id: string;
//   itemId: string;
//   quantity: number;
//   size: string;
//   title: string;
//   image: string;
//   brand: string;
//   discount: number;
//   price: number;
// }

// interface IOrder {
//   items: ICartItem[];
//   orderId: string;
//   amount: number;
//   currency: string;
// }

// interface IOrders {
//   orders: IOrder[];
//   addOrder: (order: IOrder) => void;
// }

const setOrders = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem(key) === null) {
      return [];
    }
    return JSON.parse(localStorage.getItem(key) ?? "[]");
  } else {
    return [];
  }
};

const orderState = proxy({
  orders: [] as {}[],
  addOrder: (order: any) => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem(key) === null) {
        orderState.orders.push(order);
        localStorage.setItem(key, JSON.stringify(orderState.orders));
      }
      let orders = JSON.parse(localStorage.getItem(key) || "[]");
      if (!orders.includes(order)) {
        orders.push(order);
        localStorage.setItem(key, JSON.stringify(orders));
        orderState.orders = setOrders();
      }
    } else {
      return;
    }
  },
  findOrder: (orderId: string | undefined) => {
    if (typeof window !== "undefined") {
      let orders = JSON.parse(localStorage.getItem(key) || "[]");
      return orders.find(
        (order: { orderId: string }) => order.orderId === orderId
      );
    } else {
      return;
    }
  },
});

export default orderState;
