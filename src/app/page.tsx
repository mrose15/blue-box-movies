import MovieList from "../components/MovieList/MovieList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Blue Box Movies</h1>
      <MovieList />
    </main>
  );
}
