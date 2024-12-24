import { useEffect, useState } from "react";
import axios from "axios";
import MovieItems from "./MovieItems";

function MovieRow({ title, url }) {
  const [moviesList, setMoviesList] = useState([]);
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setMoviesList(response.data.results);
      })
      .catch((err) => console.error(err));
  }, []); // fetch data here

  return (
    <>
      <h1 className="font-nsans-Bold md:text-xl p-4 capitalize">{title}</h1>
      <div className="relative flex items-center">
        <div
          id={`slider`}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scroll-bar-hide"
        >
          {moviesList.map((movie) => (
            <MovieItems key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MovieRow;
