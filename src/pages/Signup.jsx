import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [remembeLogin, setRememberLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, signUp } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate("/");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <div className=" w-full h-full">
        <img
          className="object-cover w-full h-full sm:blcok absolute"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/150c4b42-11f6-4576-a00f-c631308b1e43/web/IT-en-20241216-TRIFECTA-perspective_43a96b81-45be-417e-9e18-0ee5ea9e38d7_small.jpg"
          alt="signup"
        />
      </div>
      <div className="fixed w-full h-screen bg-black/70 top-0 left-0" />

      <div className="fixed w-full px-4 py-24 z-20">
        <div className="max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-lg">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-nsans-Bold">Sign Up</h1>

            <form
              className="w-full flex flex-col py-4"
              onSubmit={handleFormSubmit}
            >
              <input
                className="p-3 my-2 bg-gray-700 rounded"
                type="email"
                placeholder="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="p-3 my-2 bg-gray-700 rounded"
                type="password"
                placeholder="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="py-3 my-6 bg-red-600 rounded font-nsans-Bold">
                Sign Up
              </button>

              <div className="flex justify-between items-center text-gray-600">
                <p>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={remembeLogin}
                    onChange={(e) => setRememberLogin((rem) => !rem)}
                  />
                  Remember me
                </p>
                <p>Need help?</p>
              </div>
              <p className="my-4">
                <span className="text-gray-600 mr-2">
                  Already subscribed to Netflix?
                </span>
                <Link to="/login">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
