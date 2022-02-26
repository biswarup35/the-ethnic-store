import * as React from "react";
import type { NextPage } from "next";
import { Product } from "../components/product/product";
import { getProducts } from "./api/products";
import { Container } from "@mui/material";
import { Products } from "../Views";

export const getStaticProps = () => {
  const products: Product[] = getProducts();
  return {
    props: { products },
  };
};

const Home: NextPage = ({ products }: any) => {
  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Products data={products} hideFilter />
      </Container>
    </React.Fragment>
  );
};

export default Home;
