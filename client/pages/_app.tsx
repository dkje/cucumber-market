import "bootstrap/dist/css/bootstrap.css";

interface appProps {
  Component: React.ComponentType;
  pageProps: any;
}

const app: React.FC<appProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default app;
