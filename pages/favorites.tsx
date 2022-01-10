import * as React from "react";
const fetch = require("node-fetch");
import type { GetStaticProps, NextPage } from "next";
import { getFavorites } from "../utils/favorites";

import Products from "../components/views/products";
import { Container, Divider, Typography } from "@mui/material";

export const getStaticProps: GetStaticProps = async () => {
  let data = {};
  try {
    let response = await fetch(`${process.env.SITE_URL}/products`);
    data = await response.json();
  } catch (error) {
    console.log(error);
  }
  return {
    props: { data },
  };
};

const Favorites: NextPage = ({ data }: any) => {
  let [favorites, setFavorites] = React.useState();
  React.useEffect(() => {
    const list = getFavorites();

    let favData = data.filter((item: any) => list.includes(item.id));
    console.log(favData);
    setFavorites(favData);
  }, [data]);

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
