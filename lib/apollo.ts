import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const isServer = typeof window === "undefined";
// @ts-ignore
const windowApolloState = !isServer && window.__NEXT_DATA__.apolloState;

let CLIENT: ApolloClient<any>;

export function getApolloClient(forceNew?: boolean) {
  if (!CLIENT || forceNew) {
    CLIENT = new ApolloClient({
      ssrMode: isServer,
      uri: "http://localhost:4000",
      cache: new InMemoryCache().restore(windowApolloState || {}),
    });
  }

  return CLIENT;
}
