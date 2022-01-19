import { uniq, without, union } from "underscore";
interface Favorite {
  list: string[];
}

const key = `favorites`;

const makeFavorite = (id: string) => {
  const product: Favorite = {
    list: [id],
  };
  if (window) {
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, JSON.stringify(product));
    }
    const { list }: Favorite = JSON.parse(localStorage.getItem(key) ?? "");

    const newList: string[] = union(list, [id]);
    product.list.push(...newList);
    localStorage.setItem(key, JSON.stringify(product));
  } else return;
};

const unFavorite = (id: string) => {
  if (window) {
    const { list }: Favorite = JSON.parse(localStorage.getItem(key) ?? "");
    const newList: string[] = uniq(list);
    const updatedList = without(newList, id);
    const product: Favorite = {
      list: updatedList,
    };
    localStorage.setItem(key, JSON.stringify(product));
  }
};
const isFavorite = (id: string): string | undefined => {
  if (localStorage.getItem(key) === null) {
    return;
  }
  let item: number | undefined = undefined;
  const { list }: Favorite = JSON.parse(localStorage.getItem(key) ?? "");
  item = list?.indexOf(id);
  if (list[item] === id) {
    return list[item];
  } else {
    return `not found`;
  }
};

const getFavorites = (): string[] => {
  if (localStorage.getItem(key) === null) {
    return [];
  }
  const { list }: Favorite = JSON.parse(localStorage.getItem(key) ?? "");

  return list;
};
export { makeFavorite, unFavorite, isFavorite, getFavorites };
