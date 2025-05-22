import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Swal from "sweetalert2";

const NavBar = () => {
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/all-groups">All Groups</NavLink>
          </li>
          <li>
            <NavLink to="/my-groups">My Groups</NavLink>
          </li>
           <li>
            <NavLink to="/create-group">Create Group</NavLink>
          </li>
          </ul>
        </div>
        <a className="btn-ghost text-xl">Hobby Hood</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/all-groups">All Groups</NavLink>
          </li>
          <li>
            <NavLink to="/my-groups">My Groups</NavLink>
          </li>
           <li>
            <NavLink to="/create-group">Create Group</NavLink>
          </li>
        </ul>
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
      </div>
    </div>
  );
};

export default NavBar;
