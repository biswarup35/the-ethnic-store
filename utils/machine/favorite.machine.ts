import { without } from "underscore";
import { assign, createMachine } from "xstate";
import { getFavorites, makeFavorite, unFavorite } from "../favorites";

type MachineContext = {
  favorites: string[];
};

type MachiveEvent =
  | {
      type: "SET_FAV";
      favorites: string[];
    }
  | { type: "ADD_FAV"; id: string }
  | { type: "REMOVE_FAV"; id: string };

export const favoriteMachine = createMachine<MachineContext, MachiveEvent>({
  id: "favorite",
  initial: "loading",
  context: {
    favorites: [],
  },
  states: {
    loading: {
      invoke: {
        id: "loading",
        src: (_context, _event) => (callback, _onEvent) => {
          const favorites = getFavorites();
          callback({ type: "SET_FAV", favorites });
        },
      },
      on: {
        SET_FAV: {
          actions: assign({
            favorites: (_, { favorites }) => favorites,
          }),
        },
        ADD_FAV: {
          actions: assign({
            favorites: ({ favorites }, { id }) => {
              makeFavorite(id);
              return [...favorites, id];
            },
          }),
        },
        REMOVE_FAV: {
          actions: assign({
            favorites: ({ favorites }, { id }) => {
              unFavorite(id);
              return without(favorites, id);
            },
          }),
        },
      },
    },
  },
});
