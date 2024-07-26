"use client";

import { gql, useQuery } from "@apollo/client";
import { Movie } from "../../types/movies";

const GET_MOVIES = gql`
  query GetMovies {
    movies {
      id
      title
      summary
    }
  }
`;

export default function MovieList() {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const movies: Movie[] = data?.movies || [];

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
