import endpoints from "../services/movieServices"
import Hero from "../components/Hero";
import MovieRow from "../components/MovieRow";


export default function Home() {

  return (
    <>
      <Hero />
      <MovieRow title="upcoming" url={endpoints.upcoming} />
      <MovieRow title="trending" url={endpoints.trending} />
      <MovieRow title="top rated" url={endpoints.topRated} />
      <MovieRow title="comedy" url={endpoints.comedy} />
      <MovieRow title="popular" url={endpoints.popular} />
    </>
  );
}
