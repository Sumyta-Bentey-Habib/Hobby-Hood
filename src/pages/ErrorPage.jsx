import React from "react";
import { useNavigate } from "react-router-dom";
import errorGif from "../assets/404page/404.gif";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <img
        src={errorGif}
        alt="404 Not Found"
        className="  object-contain"
      />
      <h1 className="text-3xl md:text-4xl font-semibold mb-2">Oops! Page not found.</h1>
      <p className="text-gray-600 mb-8 max-w-md text-center">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
      >
        Go to Home
      </button>
    </div>
  );
};

export default ErrorPage;
