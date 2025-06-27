import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const AboutPage = () => {

  useEffect(()=>{
    document.title="About || Hobby Hood";
    
  },[]);
  const [themeClass, setThemeClass] = useState("bg-white text-gray-800");
  const [buttonClass, setButtonClass] = useState(
    "bg-purple-600 hover:bg-purple-700 text-white"
  );

  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      if (theme === "dark") {
        setThemeClass("bg-gray-900 text-gray-100");
        setButtonClass("bg-purple-700 hover:bg-purple-800 text-white");
      } else {
        setThemeClass("bg-white text-gray-800");
        setButtonClass("bg-purple-600 hover:bg-purple-700 text-white");
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
      className={`${themeClass} min-h-screen px-4 py-12 sm:px-6 lg:px-20 transition-colors duration-300 flex flex-col items-center`}
    >
      <div className="w-full max-w-5xl">
        <h1 className="mb-6 text-4xl font-bold text-center">About Hobby Hood</h1>
        <p className="mb-6 text-lg leading-relaxed">
          Hobby Hood is a platform designed to help you discover, join, and create groups that match your passions and interests.
          We believe that hobbies play a vital role in personal development, stress relief, social connection, and overall happiness.
        </p>
        <p className="mb-6 text-lg leading-relaxed">
          Our mission is to create a supportive community where people can come together, share skills, and enjoy their hobbies in a friendly environment.
          Whether you're looking to learn something new, meet like-minded people, or just have fun, Hobby Hood is here to help.
        </p>
        <h2 className="mb-4 text-2xl font-semibold">Why Choose Hobby Hood?</h2>
        <ul className="mb-8 space-y-2 text-lg list-disc list-inside">
          <li>Easy group discovery and joining.</li>
          <li>Create and manage your own groups with ease.</li>
          <li>Responsive and accessible design.</li>
          <li>Dark and light theme support for comfortable viewing.</li>
          <li>Safe and supportive community.</li>
        </ul>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <NavLink
            to="/create-group"
            className={`${buttonClass} px-6 py-3 rounded-md font-semibold transition-colors duration-300 text-center`}
          >
            Create Group
          </NavLink>
          <NavLink
            to="/all-groups"
            className={`${buttonClass} px-6 py-3 rounded-md font-semibold transition-colors duration-300 text-center`}
          >
            All Groups
          </NavLink>
        </div>

        <p className="mt-8 text-sm text-center text-gray-500">
          &copy; {new Date().getFullYear()} Hobby Hood. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
