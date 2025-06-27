 import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Swal from "sweetalert2";
import Logo from "./Logo";



const NavBar = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

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
            Swal.fire("Logged out!", "You have been successfully logged out.", "success");
          })
          .catch((error) => {
            Swal.fire("Error!", error.message, "error");
          });
      }
    });
  };

  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/all-groups">All Groups</NavLink></li>
      <li><NavLink to="/about">About Us</NavLink></li>
      
      {user && (
        <>
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>
          <li><NavLink to="/my-groups">My Groups</NavLink></li>
          <li><NavLink to="/create-group">Create Group</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 shadow-sm navbar bg-base-100 text-base-content ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {links}
          </ul>
        </div>
        <span className="text-xl font-bold btn-ghost">
          <Logo></Logo>
          
        </span>
      </div>

      <div className="hidden navbar-center lg:flex">
        <ul className="px-1 menu menu-horizontal">
          {links}
        </ul>
      </div>

      <div className="flex items-center gap-4 navbar-end">
        {user ? (
          <>
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt={user.displayName || "User Avatar"}
                title={user.displayName || "User"}
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            )}
            <button onClick={handleLogout} className="btn btn-sm">Log out</button>
          </>
        ) : (
          <>
          <NavLink to="/login" className="btn btn-sm">Log in</NavLink>
          <NavLink to="/register" className="btn btn-sm">Register</NavLink>
          </>
          
        )}

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          aria-label="Toggle Theme"
        >
          {theme === "light" ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor"
              viewBox="0 0 20 20">
              <path d="M10 3.25a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0v-1A.75.75 0 0110 3.25zm4.47
                2.03a.75.75 0 011.06 1.06l-.71.7a.75.75 0 01-1.06-1.06l.71-.7zM16.75
                10a.75.75 0 01-.75.75h-1a.75.75 0 010-1.5h1a.75.75 0
                01.75.75zm-2.53 4.72a.75.75 0 10-1.06 1.06l.7.71a.75.75 0
                101.06-1.06l-.7-.71zM10 15.75a.75.75 0
                01.75.75v1a.75.75 0 01-1.5 0v-1a.75.75 0
                01.75-.75zm-4.72-1.53a.75.75 0 10-1.06
                1.06l.71.7a.75.75 0 001.06-1.06l-.7-.7zM4.25
                10a.75.75 0 01.75.75h-1a.75.75 0 010-1.5h1a.75.75 0
                01-.75.75zm2.53-4.72a.75.75 0 10-1.06-1.06l-.71.7a.75.75 0
                001.06 1.06l.71-.7zM10 6a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor"
              viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 116.707
                2.707a8.003 8.003 0 0010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default NavBar;