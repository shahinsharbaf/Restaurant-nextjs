"use client";

import Link from "next/link";
import React from "react";
import AuthModal from "./AuthModal";
import { AuthenticationContext } from "../context/AuthContext";
import useAuth from "../hooks/useAuth";

function NavBar() {
  const { signout } = useAuth();
  const handelClick = () => {
    signout();
  };
  const { data, loading } = React.useContext(AuthenticationContext);
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      {loading ? null : (
        <div>
          {data ? (
            <button
              onClick={handelClick}
              className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
            >
              Sign out
            </button>
          ) : (
            <div className="flex">
              <AuthModal isSiginin={true} />
              <AuthModal isSiginin={false} />
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
