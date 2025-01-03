import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import endpoints, { createImageUrl } from "../services/movieServices";

function Hero() {
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(endpoints.popular)
      .then((res) => {
        const movies = res.data.results;
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setMovie(randomMovie);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!movie) {
    return <p>fetching movie...</p>;
  }

  const turncate = (str, length) => {
    if (!str) return "";
    return str.length > length ? str.slice(0, length) + "..." : str;
  };

  const handlePlayMovie = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const { id, title, backdrop_path, release_date, overview } = movie;
  return (
    <>
      <div className="w-full h-[550px] lg:h-[850px]">
        <div className="w-full h-full">
          <div className="absolute w-full h-[550px] lg:h-[850px] bg-gradient-to-r from-black" />
          <img
            src={createImageUrl(backdrop_path, "original")}
            alt={title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute w-full top-[40%] lg:top-[50%] p-4 md:p-8">
            <h1 className="text-3xl md:text-6xl font-nsans-Bold">{title}</h1>
            <div className="mt-8 mb-4">
              <button
                className="capitalize border bg-gray-300 text-black py-2 px-5"
                onClick={() => handlePlayMovie(id)}
              >
                play
              </button>
              <button
                className="apitalize border border-gray-300 py-2 px-5 ml-4"
                onClick={() => handlePlayMovie(id)}
              >
                watch later
              </button>
            </div>
            <p className="text-gray-300 text-sm">{release_date}</p>
            <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
              {turncate(overview, 165)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
