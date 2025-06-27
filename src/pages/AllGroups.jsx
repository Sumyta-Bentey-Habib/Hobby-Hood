import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import HobbyCard from "../components/HobbyCard";

const AllGroups = () => {
  useEffect(()=>{
    document.title="All Groups || Hobby Hood";
  },[]);
  const initialHobbies = useLoaderData();
  const [hobbies, setHobbies] = useState(initialHobbies);

 
  const [themeClass, setThemeClass] = useState("bg-white text-gray-900");

  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      if (theme === "dark") {
        setThemeClass("bg-gray-900 text-gray-100");
      } else {
        setThemeClass("bg-white text-gray-900");
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
    <div className={`${themeClass} min-h-screen`}>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 gap-6 m-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {hobbies.map((hobby) => (
            <HobbyCard
              hobby={hobby}
              key={hobby._id}
              hobbies={hobbies}
              setHobbies={setHobbies}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllGroups;
