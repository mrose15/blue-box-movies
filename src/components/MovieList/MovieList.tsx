import { gql } from "@apollo/client";
import { Movie, MoviesData, MovieListProps } from "../../types/movies";
import client from "../../lib/apollo-client";
import Pagination from "../Pagination/Pagination";

const GET_MOVIES = gql`
  query GetMovies($page: Int!, $perPage: Int!) {
    movies(pagination: { page: $page, perPage: $perPage }) {
      nodes {
        id
        title
        summary
      }
      pagination {
        page
        perPage
        totalPages
      }
    }
  }
`;

async function getMovies(
  page: number = 1,
  perPage: number = 10
): Promise<MoviesData> {
  try {
    const { data } = await client.query<{ movies: MoviesData }>({
      query: GET_MOVIES,
      variables: { page, perPage },
    });
    console.log("API Response:", data);
    return data.movies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    if ((error as { networkError: Error }).networkError) {
      const networkError: Error = (error as { networkError: Error })
        .networkError;
      const statusCode: Error = (error as { statusCode: Error }).statusCode;
      console.error("Network error:", networkError);
      console.error("Status:", statusCode);
      console.error("Result:", (networkError as any).result);
    }
    if ((error as any).graphQLErrors) {
      console.error("GraphQL errors:", (error as any).graphQLErrors);
    }
    return { nodes: [], pagination: { page: 1, perPage: 10, totalPages: 1 } };
  }
}

export default async function MovieList({ page, perPage }: MovieListProps) {
  const { nodes: movies, pagination } = await getMovies(page, perPage);

  return (
    <>
      {movies.map((movie: Movie) => (
        <div
          key={movie.id}
          className="mb-4 p-4 border border-gray-900 rounded-lg"
        >
          <h2>{movie.title}</h2>
          <p>{movie.summary}</p>
        </div>
      ))}
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
      />
    </>
  );
}
