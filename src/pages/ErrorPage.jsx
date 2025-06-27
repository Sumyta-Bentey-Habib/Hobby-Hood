import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/lottie/404page.json";

const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    document.title="Error";
  },[]);

  const [themeClass, setThemeClass] = useState({
    container: "bg-gray-50 text-gray-900",
    textPrimary: "text-gray-900",
    textSecondary: "text-gray-600",
  });

  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      if (theme === "dark") {
        setThemeClass({
          container: "bg-gray-900 text-gray-100",
          textPrimary: "text-gray-100",
          textSecondary: "text-gray-400",
        });
      } else {
        setThemeClass({
          container: "bg-gray-50 text-gray-900",
          textPrimary: "text-gray-900",
          textSecondary: "text-gray-600",
        });
      }
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-4 ${themeClass.container}`}
    >
      {/* Lottie animation */}
      <div className="mb-6 w-80 h-80 md:w-96 md:h-96">
        <Lottie animationData={animationData} loop={true} />
      </div>

      <h1
        className={`text-3xl md:text-4xl font-semibold mb-2 ${themeClass.textPrimary}`}
      >
        Oops! Page not found.
      </h1>
      <p className={`mb-8 max-w-md text-center ${themeClass.textSecondary}`}>
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 text-white transition bg-indigo-600 rounded-md hover:bg-indigo-700"
      >
        Go to Home
      </button>
    </div>
  );
};

export default ErrorPage;
