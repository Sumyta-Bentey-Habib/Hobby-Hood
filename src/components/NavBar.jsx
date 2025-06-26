import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { getAuth } from "firebase/auth";

const NavBar = () => {
  const [theme, setTheme]=useState("light");
  const auth = getAuth;
  
useEffect(()=>{
  const storedTheme=localStorage.getItem("theme")|| "light";
  setTheme(storedTheme);
  document.documentElement.setAttribute("data-theme",storedTheme);

},[auth]);

const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };




  const { user, logOut } = useAuth();
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire(
              "Logged out!",
              "You have been successfully logged out.",
              "success"
            );
          })
          .catch((error) => {
            Swal.fire("Error!", error.message, "error");
          });
      }
    });
  };
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-groups">All Groups</NavLink>
      </li>

      {user && (
        <>
        <li>
          <NavLink to="/dashboard">DashBoard</NavLink>
        </li>
          <li>
            <NavLink to="/my-groups">My Groups</NavLink>
          </li>
          <li>
            <NavLink to="/create-group">Create Group</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm rounded-3xl sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn-ghost text-xl">Hobby Hood</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end flex items-center gap-4">
        {user ? (
          <>
            {/* User Image with tooltip showing user.displayName */}
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                title={user.displayName || "User"}
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            )}

            <button onClick={handleLogout} className="btn">
              Log out
            </button>
          </>
        ) : (
          <NavLink to="/sign-in-sign-up" className="btn">
            Log in
          </NavLink>
        )}
        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost"
          style={{ color: "inherit" }} // ensures icon inherits text color and is visible
          aria-label="Toggle Theme"
        >
          {theme === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 3.25a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0v-1A.75.75 0 0110 3.25zm4.47 2.03a.75.75 0 011.06 1.06l-.71.7a.75.75 0 01-1.06-1.06l.71-.7zM16.75 10a.75.75 0 01-.75.75h-1a.75.75 0 010-1.5h1a.75.75 0 01.75.75zm-2.53 4.72a.75.75 0 10-1.06 1.06l.7.71a.75.75 0 101.06-1.06l-.7-.71zM10 15.75a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0v-1a.75.75 0 01.75-.75zm-4.72-1.53a.75.75 0 10-1.06 1.06l.71.7a.75.75 0 001.06-1.06l-.7-.7zM4.25 10a.75.75 0 01.75.75h-1a.75.75 0 010-1.5h1a.75.75 0 01-.75.75zm2.53-4.72a.75.75 0 10-1.06-1.06l-.71.7a.75.75 0 001.06 1.06l.71-.7zM10 6a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 116.707 2.707a8.003 8.003 0 0010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
