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
      {user.loggedIn && user.username !== undefined ? (
        <li>
          <Link onClick={handleSignOut} to="/" >
            <h4>Sign Out</h4>
          </Link>
        </li>
      ) : (
        <li>
          <a href="/auth/google/">
            <h4>Sign In</h4>
          </a>
        </li>
      )}
    </>
  );
};
