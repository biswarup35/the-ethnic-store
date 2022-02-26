import { Container } from "@mui/material";
import * as React from "react";
import { Product } from "../../components/product/product";
import { Products } from "../../Views";
import { getProductsFor } from "../api/products";
interface ShopForProps {}

export const getStaticPaths = async () => {
  const posts = [{ for: "men" }, { for: "women" }, { for: "kids" }];
  const paths = posts.map((post: any) => ({
    params: { shopFor: post.for },
  }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: any) => {
  const { shopFor } = params;
  const products: Product[] = getProductsFor(shopFor);
  return {
    props: { products },
  };
};

const ShopFor: React.FunctionComponent<ShopForProps> = ({ products }: any) => {
  return (
    <Container maxWidth="lg">
      <Products data={products} hideFilter />
    </Container>
  );
};

export default ShopFor;
