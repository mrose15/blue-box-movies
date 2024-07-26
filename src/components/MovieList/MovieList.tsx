"use client";

import { gql, useQuery } from "@apollo/client";
import { Movie } from "../../types/movies";

const GET_MOVIES = gql`
  query GetMovies {
    movies {
      nodes {
        id
        title
        summary
      }
    }
  }
`;

export default function MovieList() {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <p>Loading...</p>;
  if (error) {
    // TODO: remove before production
    console.error("GraphQL Error:", error);
    console.error("Network Error:", error.networkError);
    if (error.graphQLErrors) {
      error.graphQLErrors.forEach((graphQLError) =>
        console.error("GraphQL Error:", graphQLError)
      );
    }
    return <p>Error: {error.message}</p>;
  }

  const movies = data?.movies?.nodes || [];

  return (
    <>
      {movies.map((movie) => (
        <div key={movie.id} className="p-4 border border-gray-200 rounded-lg">
          <h2>{movie.title}</h2>
          <p>{movie.summary}</p>
        </div>
      ))}
    </>
  );
}
