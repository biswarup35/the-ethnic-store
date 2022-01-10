import * as React from "react";
const fetch = require("node-fetch");
import { ParsedUrlQuery } from "querystring";
import { GetStaticProps, GetStaticPaths } from "next";
import Product from "../components/views/product";
import Products from "../components/views/products";
import { Container, Divider, Typography } from "@mui/material";

export const ProductContext = React.createContext({});

interface Param extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${process.env.SITE_URL}/products`);
  const data = await response.json();
  const paths = data.map((item: any) => ({
    params: { slug: item.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<any> => {
  const { slug } = params as Param;
  const response = await fetch(`${process.env.SITE_URL}/products/${slug}`);
  const product = await response.json();
  const { for: shopFor } = product;
  const shopForResponse = await fetch(
    `${process.env.SITE_URL}/products?shopFor=${shopFor}`
  );
  const moreProducts = await shopForResponse.json();
  const products = moreProducts.filter((item: any) => item.id !== slug);
  return {
    props: { product, products },
  };
};

interface ProductPageProps {}

const ProductPage: React.FunctionComponent<ProductPageProps> = (props) => {
  const { product, products } = props as any;
  return (
    <React.Fragment>
      <ProductContext.Provider value={product}>
        <Product data={product} />
      </ProductContext.Provider>
      <Container sx={{ my: 2 }} maxWidth="lg">
        <Divider sx={{ my: 2 }} />
        <Typography
          sx={{ textTransform: "uppercase", fontWeight: 500 }}
          color="GrayText"
          variant="h5"
          component="div"
        >
          You may also like
        </Typography>
        <Products data={products} hideFilter />
      </Container>
    </React.Fragment>
  );
};

export default ProductPage;
