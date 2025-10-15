import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context";
import axios from "axios";

export const SignInButton = () => {

  const { user, setUser } = useUserContext();

  // -------------------[HANDLERS]--------------------

  const handleSignOut = () => {
    axios.get('/auth/google/logout')
      .then(()=>{
        setUser({username: null, loggedIn: false})
      })
      .catch((err)=>{
        console.error(err)
      })
  };

  // --------------------[RENDER]---------------------

  return (
    <>
      {user.loggedIn ? (
        <li>
          <Link onClick={handleSignOut} to="/" >
            Sign Out
          </Link>
        </li>
      ) : (
        <li>
          <a href="/auth/google/">
            Sign-In
          </a>
        </li>
      )}
    </>
  );
};
