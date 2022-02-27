import { proxy } from "valtio";

const key = "favorites";

const setItems = (): string[] => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem(key) === null) {
      return [];
    }
    return JSON.parse(localStorage.getItem(key) ?? "[]");
  } else {
    return [];
  }
};

interface IFavorite {
  items: string[];
  add: (item: string) => void;
  remove: (item: string) => void;
  isFavorite: (item: string) => boolean;
}

export const favoriteList: IFavorite = proxy<IFavorite>({
  items: setItems(),
  add: (item: string) => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem(key) === null) {
        favoriteList.items.push(item);
        localStorage.setItem(key, JSON.stringify(favoriteList.items));
      }
      let items = JSON.parse(localStorage.getItem(key) || "[]");
      if (!items.includes(item)) {
        items.push(item);
        localStorage.setItem(key, JSON.stringify(items));
        favoriteList.items = setItems();
      }
    } else {
      return;
    }
  },
  remove: (item: string) => {
    if (typeof window !== "undefined") {
      let items = JSON.parse(localStorage.getItem(key) || "[]");
      items = items.filter((i: string) => i !== item);
      localStorage.setItem(key, JSON.stringify(items));
      favoriteList.items = setItems();
    } else {
      return;
    }
  },
  isFavorite: (item) => {
    return favoriteList?.items?.includes(item) ?? false;
  },
});

export default favoriteList;
