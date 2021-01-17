import { NextPage } from "next";
import React from "react";
import { buildClient } from "../api/build-client";

interface LandingPageProps extends LandingPageInitialProps {}

interface LandingPageInitialProps {
  currentUser: null | {
    id: string;
    email: string;
  };
}

const LandingPage: NextPage<LandingPageProps> = ({ currentUser }) => {
  // console.log("I am in the components", currentUser);
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

LandingPage.getInitialProps = async (ctx) => {
  const { data } = await buildClient(ctx).get("/api/users/currentuser");
  return data;
};

export default LandingPage;
