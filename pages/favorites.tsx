import * as React from "react";
import type { GetStaticProps, NextPage } from "next";
import { Products } from "../Views";
import { Container, Divider, Typography } from "@mui/material";
import { Product } from "../components/product/product";
import { getProducts } from "./api/products";
import { favoriteState } from "../App";
import { useSnapshot } from "valtio";

export const getStaticProps: GetStaticProps = async () => {
  const data: Product[] = getProducts();
  return {
    props: { data },
  };
};

const Favorites: NextPage = ({ data }: any) => {
  const { items } = useSnapshot(favoriteState);
  const [products, setProducts] = React.useState();

  React.useEffect(() => {
    if (items) {
      const products = data.filter((product: any) =>
        items?.includes(product.id)
      );
      setProducts(products);
    }
  }, [data, items]);
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
        {products && <Products data={products} hideFilter />}
      </Container>
    </React.Fragment>
  );
};

export default Favorites;
