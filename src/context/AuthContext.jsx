import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../services/firebase"; // Make sure to configure Firebase
import { setDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(db, "users", email), { favShows: [] });
  }

  function logIn(email, password) {
    signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ currentUser, signUp, logIn, logOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
