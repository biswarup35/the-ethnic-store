import * as React from "react";
import { withPageAuthRequired, UserContext } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired();

const Order = ({ user }: UserContext) => {
  return <h1>Place your order</h1>;
};

export default Order;
