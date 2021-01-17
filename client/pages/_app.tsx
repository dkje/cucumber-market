import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";

const app = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default app;
