import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const ApiContext = React.createContext();

export const ApiProvider = ({ children }) => {
  const client = new ApolloClient({
    uri: process.env.REACT_APP_HASURA_URI,
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApiContext;
