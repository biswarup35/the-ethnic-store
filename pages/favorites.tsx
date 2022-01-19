import * as React from "react";
import type { GetStaticProps, NextPage } from "next";
import Products from "../components/views/products";
import { Container, Divider, Typography } from "@mui/material";
import { useActor } from "@xstate/react";
import { Product } from "../components/product/product";
import { getProducts } from "./api/products";
import { GlobalContext } from "../components/AppContext/GlobalContext";

export const getStaticProps: GetStaticProps = async () => {
  const data: Product[] = getProducts();
  return {
    props: { data },
  };
};

const Favorites: NextPage = ({ data }: any) => {
  const { favService }: any = React.useContext(GlobalContext);
  const [state]: any = useActor(favService);
  const { favorites: favoriteList } = state.context;

  let [favorites, setFavorites] = React.useState();
  React.useEffect(() => {
    let favData = data.filter((item: Product) =>
      favoriteList.includes(item.id)
    );
    setFavorites(favData);
  }, [data, favoriteList]);

  return (
    <React.Fragment>
      <Container sx={{ my: 2 }} maxWidth="lg">
        <Typography
          sx={{ textTransform: "uppercase", fontWeight: 500 }}
          color="GrayText"
          variant="h5"
          component="div"
        >
          Your favorites
        </Typography>
        <Divider sx={{ my: 2 }} />
        {favorites && <Products data={favorites} hideFilter />}
      </Container>
    </React.Fragment>
  );
};

export default Favorites;
