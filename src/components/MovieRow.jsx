import { useEffect, useState } from "react";
import axios from "axios";
import MovieItems from "./MovieItems";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

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

  const slider = (offset) => {
    const slider = document.getElementById("slider" + title);
    slider.scrollLeft += offset;
  };

  return (
    <>
      <h1 className="font-nsans-Bold md:text-xl p-4 capitalize">{title}</h1>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={() => slider(-500)}
          size={40}
          className="absolute left-2 text-3xl opacity-80 z-10 hidden text-gray-700 cursor-pointer group-hover:block rounded-full bg-white"
        />
        <div
          id={`slider${title}`}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {moviesList.map((movie) => (
            <MovieItems key={movie.id} movie={movie} />
          ))}
        </div>
        <MdChevronRight
          onClick={() => slider(500)}
          size={40}
          className="absolute right-2 text-3xl opacity-80 z-10 hidden text-gray-700 cursor-pointer group-hover:block rounded-full bg-white"
        />
      </div>
    </>
  );
}

export default MovieRow;
