import * as React from "react";
const fetch = require("node-fetch");
import Products from "../../components/views/products";
interface ShopForProps {}

/**
 * TODO Data Handing for Filter and Sorting through rasing Events
 *
 */

export const getStaticPaths = async () => {
  const posts = [{ for: "men" }, { for: "women" }, { for: "kids" }];
  const paths = posts.map((post: any) => ({
    params: { shopFor: post.for },
  }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: any) => {
  const { shopFor } = params;
  const response = await fetch(
    `${process.env.SITE_URL}/products?shopFor=${shopFor}`
  );
  const data = await response.json();
  return {
    props: { data },
  };
};

const ShopFor: React.FunctionComponent<ShopForProps> = ({ data }: any) => {
  return <Products data={data} />;
};

export default ShopFor;
