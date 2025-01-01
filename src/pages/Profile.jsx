import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import {
  doc,
  arrayUnion,
  onSnapshot,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";
import { createImageUrl } from "../services/movieServices";

export default function () {
  const [movies, setMovies] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      onSnapshot(doc(db, "users", currentUser.email), (doc) => {
        if (doc.data()) setMovies(doc.data().favShows);
      });
    }
  }, [currentUser?.email]);

  if (!currentUser) {
    return (
      <>
        <p>fetching shows ...</p>
      </>
    );
  }

  const slider = (offset) => {
    const slider = document.getElementById("slider");
    slider.scrollLeft += offset;
  };

  const handleUnlikeShow = async (movie) => {
    const userDoc = doc(db, "users", currentUser.email);
    await updateDoc(userDoc, { favShows: arrayRemove(movie) });
  };

  return (
    <>
      <div>
        <div>
          <img
            className="block h-[500px] w-full object-cover"
            src="https://assets.nflxext.com/ffe/siteui/vlv3/150c4b42-11f6-4576-a00f-c631308b1e43/web/IT-en-20241216-TRIFECTA-perspective_43a96b81-45be-417e-9e18-0ee5ea9e38d7_small.jpg"
            alt={movies[0]?.title}
          />
          <div className="bg-black/60 fixed top-0 left-0 w-full h-[500px]" />
          <div className="absolute top-[20%] p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-nsans-Bold">My shows</h1>
            <p className="font-nsans-light text-gray-400 text-lg ">
              {currentUser.email}
            </p>
          </div>
        </div>

        <h1 className="font-nsans-Bold md:text-xl p-4 capitalize">
          Favourites
        </h1>
        <div className="relative flex items-center group">
          <MdChevronLeft
            onClick={() => slider(-500)}
            size={40}
            className="absolute left-2 text-3xl opacity-80 z-10 hidden text-gray-700 cursor-pointer group-hover:block rounded-full bg-white"
          />
          <div
            id={`slider`}
             className="w-full h-full overflow-x-hiden overflow-hidden whitespace-nowrap scroll-smooth scrollbar-hide"
          >
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2"
              >
                <img
                  src={createImageUrl(
                    movie.backdrop_path ?? movie.poster_path,
                    "w500"
                  )}
                  alt={movie.title}
                  className="w-full h-40 block object-cover object-top"
                />
                <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
                  <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-Bold">
                  <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                  </p>
                  <p>
                    <AiOutlineClose
                      size={30}
                      onClick={() => handleUnlikeShow(movie)}
                      className="absolute right-2 top-2"
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
          <MdChevronRight
            onClick={() => slider(500)}
            size={40}
            className="absolute right-2 text-3xl opacity-80 z-10 hidden text-gray-700 cursor-pointer group-hover:block rounded-full bg-white"
          />
        </div>
      </div>
    </>
  );
}
