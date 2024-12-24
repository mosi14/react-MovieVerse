import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="absolute w-full flex justify-between items-center p-5 z-50">
      <Link to="/">
        <h1 className="uppercase text-red-600 font-nsans-Bold cursor-pointer text-5xl">
          Netflix
        </h1>
      </Link>
      <div>
        <Link to="/login">
          <button className=" text-white px-4 py-2  cursor-pointer capitalize">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer capitalize">
            sign up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
