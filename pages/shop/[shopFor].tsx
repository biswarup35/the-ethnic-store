import * as React from "react";
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
  const data = params;
  return {
    props: { data },
  };
};

const ShopFor: React.FunctionComponent<ShopForProps> = ({
  data: { shopFor },
}: any) => {
  console.log(shopFor);

  return <Products />;
};

export default ShopFor;
