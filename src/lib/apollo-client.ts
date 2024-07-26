import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Create an http link
const httpLink = createHttpLink({
  uri: "https://0kadddxyh3.execute-api.us-east-1.amazonaws.com",
});

// Create a function to set the auth context
const authLink = setContext((_, { headers }) => {
  // Get the token from the environment variables
  const token = process.env.BLUE_BOX_MOVIES_API_TOKEN;

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Create the Apollo client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
