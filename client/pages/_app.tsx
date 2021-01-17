import "bootstrap/dist/css/bootstrap.css";
import type { AppContext, AppProps } from "next/app";
import { buildClient } from "../api/build-client";
import Header from "../components/header";

export interface InitialProps {
  currentUser: null | {
    id: string;
    email: string;
  };
}

const AppComponent = ({
  Component,
  pageProps,
  currentUser,
}: AppProps & InitialProps) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async ({ ctx, Component }: AppContext) => {
  const client = buildClient(ctx);
  const { data } = await client.get("/api/users/currentuser");
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  console.log("pageProps:::", pageProps);
  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
