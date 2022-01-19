import { useInterpret } from "@xstate/react";
import * as React from "react";
import { favoriteMachine } from "../../utils/machine/favorite.machine";
import { cartMachine } from "../../utils/machine/cart.machine";
export const GlobalContext = React.createContext({});

export const GlobalContextProvider = (props: any) => {
  const favService = useInterpret(favoriteMachine);
  const cartService = useInterpret(cartMachine);

  return (
    <GlobalContext.Provider value={{ favService, cartService }} {...props} />
  );
};
