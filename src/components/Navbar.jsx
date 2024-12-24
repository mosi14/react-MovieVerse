import React from "react";
import { Link , useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {  
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return (
    <div className="absolute w-full flex justify-between items-center p-5 z-50">
      <Link to="/">
        <h1 className="uppercase text-red-600 font-nsans-Bold cursor-pointer text-5xl">
          Netflix
        </h1>
      </Link>

      {currentUser?.email ? (
        <div>
          <Link to="/profile">
            <button className=" pr-4 capitalize">Profile</button>
          </Link>
          <button
            onClick={handleLogOut}
            className="bg-red-600  px-6 py-2 rounded cursor-pointer capitalize"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className=" pr-4 capitalize">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-red-600  px-4 py-2 rounded cursor-pointer capitalize">
              sign up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
