import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

// Create an http link
const httpLink = createHttpLink({
  uri: "https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/graphql",
});

// Create a function to set the auth context
const authLink = setContext((_, { headers }) => {
  // Get the token from the environment variables
  const token = process.env.NEXT_PUBLIC_BBMOVIES_API_TOKEN;

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// Create the Apollo client instance
const client = new ApolloClient({
  //link: authLink.concat(httpLink),
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
