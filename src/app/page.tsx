import MovieList from "../components/MovieList/MovieList";
import { MoviePageProps } from "../types/movies";
import { Suspense } from "react";

export default function Home({ searchParams }: MoviePageProps) {
  const page = Number(searchParams.page) || 1;
  const perPage = 10;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Blue Box Movies</h1>
      <Suspense fallback={<p>Loading movies...</p>}>
        <MovieList page={page} perPage={perPage} />
      </Suspense>
    </main>
  );
}
