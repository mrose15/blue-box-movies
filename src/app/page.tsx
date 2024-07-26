import MovieList from "../components/MovieList/MovieList";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Blue Box Movies</h1>
      <Suspense fallback={<p>Loading movies...</p>}>
        <MovieList />
      </Suspense>
    </main>
  );
}
