import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as ApolloClientProvider,
} from '@apollo/client';
import React from 'react';

const client = new ApolloClient({
  uri: process.env.REACT_APP_APOLLO_URI,
  cache: new InMemoryCache(),
});
const ApolloProvider = ({ children }) => {
  return <ApolloClientProvider client={client}>{children}</ApolloClientProvider>;
};

export default ApolloProvider;
