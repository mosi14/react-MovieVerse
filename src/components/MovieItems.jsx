import { useState } from "react";
import { Link } from "react-router-dom";
import { createImageUrl } from "../services/movieServices";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { doc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

export default function MovieItems({ movie }) {
  const [like, setLike] = useState(false);
  const { currentUser } = useAuth();

  const markFavShow = async () => {
    const userEmail = currentUser?.email;

    if (userEmail) {
      const userDoc = doc(db, "users", userEmail);
      setLike(!like);
      await updateDoc(userDoc, {
        favShows: arrayUnion({...movie})
      });
    } else {
      alert("Please login to add to favourites");
    }
  };

 

  const { id, title, backdrop_path, poster_path } = movie;
  return (
    <div className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2" >
      <img
        src={createImageUrl(backdrop_path ?? poster_path, "w500")}
        alt={title}
        className="w-full h-40 block object-cover object-top"
      />
      <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
        <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-Bold">
          <Link to={`/movie/${id}`}>{title}</Link>
        </p>
        <p onClick={markFavShow} className="cursor-pointer">
          {like ? (
            <FaHeart
              size={20}
              className="absolute top-2 left-2 text-gray-300"
            />
          ) : (
            <FaRegHeart
              size={20}
              className="absolute top-2 left-2 text-gray-300"
            />
          )}
        </p>
      </div>
    </div>
  );
}
