import { ApolloProvider } from "@apollo/client";
import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import { getApolloClient } from "../lib/apollo";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const client = getApolloClient();

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default appWithTranslation(MyApp);
