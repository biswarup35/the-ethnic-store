import * as React from "react";
import { withPageAuthRequired, UserContext } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired();

const User = ({ user }: UserContext) => {
  return <h1>Welcome {user?.name}</h1>;
};

export default User;
