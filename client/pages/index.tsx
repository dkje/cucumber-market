import { NextPage, NextPageContext } from "next";
import React from "react";
import buildClient from "../api/build-client";
import { InitialProps } from "./_app";

interface LandingPageProps extends InitialProps {}

const LandingPage: NextPage<LandingPageProps> = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

LandingPage.getInitialProps = async (ctx: NextPageContext) => {
  const client = buildClient(ctx);
  const { data } = await client.get<InitialProps>("/api/users/currentuser");
  return data;
};

export default LandingPage;
