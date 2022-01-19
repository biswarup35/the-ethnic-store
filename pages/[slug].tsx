import * as React from "react";
const fetch = require("node-fetch");
import { ParsedUrlQuery } from "querystring";
import { GetStaticProps, GetStaticPaths } from "next";
import Product from "../components/views/product";
import Products from "../components/views/products";
import { Container, Divider, Typography } from "@mui/material";
import { getProducts, getProductsFor } from "./api/products";
import { Product as ProductType } from "../components/product/product";
import { getProduct } from "./api/products/[slug]";

export const ProductContext = React.createContext({});

interface Param extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products: ProductType[] = getProducts();
  const paths = products.map((item) => ({
    params: { slug: item.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as Param;
  const product: ProductType = getProduct(slug);
  const { for: shopFor } = product;
  const moreProducts: ProductType[] = getProductsFor(shopFor);
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
