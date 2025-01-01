import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  fetchMovieDetails,
  fetchMovieCasts,
  fetchMovieVideos,
  createImageUrl,
} from "../services/movieServices";

export default function Details() {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [movieCasts, setMovieCasts] = useState({ cast: [], crew: [] });
  const [movieVideos, setMovieVideos] = useState([]);

  useEffect(() => {
    const url_MD = fetchMovieDetails(id);
    const url_MC = fetchMovieCasts(id);
    const url_MV = fetchMovieVideos(id);
    axios
      .get(url_MD)
      .then((res) => {
        setMovieDetail(res.data);
      })
      .catch((err) => console.error(err));

    axios
      .get(url_MC)
      .then((res) => {
        setMovieCasts(res.data);
      })
      .catch((err) => console.error(err));

    axios
      .get(url_MV)
      .then((res) => {
        setMovieVideos(res.data.results);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!movieDetail) {
    return <p>fetching movie details...</p>;
  }
  const teaserVideo = movieVideos?.find((video) => video.type === "Teaser");

  const {
    title,
    release_date,
    poster_path,
    backdrop_path,
    overview,
    genres,
    runtime,
    status,
    production_countries,
    spoken_languages,
    budget,
    vote_average,
    vote_count,
  } = movieDetail;

  const { cast, crew } = movieCasts;

  return (
    <>
      <div>
        <div className="flex flex-col items-stretch">
          <img
            className="block h-screen w-full object-cover"
            src={createImageUrl(poster_path, "w500")}
            alt={title}
          />
          <div className="bg-black/60 fixed top-0 left-0 w-full h-screen" />
          <div className="absolute top-[20%] p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-nsans-Bold">{title}</h1>
            
            {/* Genres */}
            <div className="flex flex-wrap my-4 text-sm">
              <p className="capitalize text-gray-300">
                {genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="font-semibold p-2 border rounded-full ml-2 mb-2 "
                  >
                    {genre.name}
                  </span>
                ))}
              </p>
            </div>

            {/* Details rate view duration  */}
            <div className="flex flex-wrap my-2 text-xs gap-2 ">
              <p className=" font-nsans-light text-gray-400 text-sm pr-2 border-r">
                Rating: {vote_average} +
              </p>
              <p className=" font-nsans-light text-gray-400 text-sm  pr-2 border-r">
                View: {vote_count}
              </p>
              <p className=" font-nsans-light text-gray-400 text-sm ">
                Duration: {runtime} minutes
              </p>
            </div>

            {/* Overview  */}
            <div className="my-4">
              <h5 className="mb-2 font-nsans-medium ">Overview</h5>
              <p className="text-gray-400 text-sm md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%]">
                {overview}
              </p>
            </div>

            {/* Details  status release_date budget*/}
            <div className="flex flex-col my-2 text-xs gap-2 ">
              <div className="flex flex-wrap  text-xs gap-2 ">
                <p className=" font-nsans-light text-gray-400 text-sm pr-2 border-r">
                  Status: {status}
                </p>
                <p className=" font-nsans-light text-gray-400 text-sm  pr-2 border-r">
                  Release Date: {release_date.slice(0, 4)}
                </p>
                <p className=" font-nsans-light text-gray-400 text-sm ">
                  Budget: {budget}
                </p>
              </div>
              {/* Crew  */}
              <p className=" font-nsans-light text-gray-400 text-sm pr-2 ">
                Director:{" "}
                {crew
                  .filter((member) => member.job === "Director")
                  .map((director) => director.name)
                  .join(", ")}
              </p>
              <p className=" font-nsans-light text-gray-400 text-sm pr-2 ">
                Writer:{" "}
                {crew
                  .filter(
                    (member) =>
                      member.job === "Writer" || member.job === "Screenplay"
                  )
                  .map((writer) => writer.name)
                  .join(", ")}
              </p>
            </div>

            {/* Casts */}
            <div>
              <p className=" font-nsans-light text-gray-400 text-sm pr-2 ">
                Casts:
              </p>
              <div className="flex gap-2">
                {Array.isArray(cast) &&
                  cast?.slice(0, 5).map((c) => (
                    <div className="flex flex-col items-center mt-5" key={c.id}>
                      <img
                        src={createImageUrl(c.profile_path, "w200")}
                        alt={c.name}
                        className="w-20 h-20 object-cover rounded-full"
                      />
                      <span className="font-nsans-light text-xs  mb-2 ">
                        {c.name}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Video */}
            <div>
              <p className=" font-nsans-bold text-gray-400 text-md pr-2 ">
                Video:
              </p>
              <div className="">
                {teaserVideo ? (
                  <iframe
                    key={teaserVideo.key}
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${teaserVideo.key}`}
                    title={teaserVideo.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
