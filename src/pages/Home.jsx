import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import Slider from "../components/slider/Slider";
import Card from "../components/Card";
import Faq from "../components/Faq";
import HobbyCard from "../components/HobbyCard";
import Loader from "../components/Loader";
import { Typewriter } from "react-simple-typewriter";
const Home = () => {
  useEffect(()=>{
    document.title="Hobby Hood"
  },[]);
  const [hobbies, setHobbies] = useState([]);
  const [themeClass, setThemeClass] = useState("bg-white text-gray-900");

  useEffect(() => {
    const fetchHobbies = async () => {
      const res = await fetch(
        "https://hobby-hood-server-site.vercel.app/all-groups",
        {
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );
      const data = await res.json();
      setHobbies(data);
    };

    fetchHobbies();

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
    <div className={`${themeClass}`}>
      <Hero />
      <div className="m-10">
        <h1 className="mb-6 text-4xl font-bold text-center md:text-5xl mt-20">
                <Typewriter
                  words={["Explore All Groups","Create your own group"]}
                  loop
                  cursor
                  cursorStyle="|"
                  typeSpeed={100}
                  deleteSpeed={20}
                  delaySpeed={1000}
                />
              </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {hobbies && hobbies.length > 0 ? (
            hobbies.slice(0, 3).map((hobby) => (
              <HobbyCard hobby={hobby} key={hobby._id} />
            ))
          ) : (
            <p>
              <Loader></Loader>
            </p>
          )}
        </div>
        <div className="flex justify-center mt-8">
          <a href="/all-groups">
            <button className="px-6 py-3 text-white bg-indigo-600 rounded-full hover:bg-indigo-700">
              View All Groups
            </button>
          </a>
        </div>
      </div>
      <Slider />
      <Card />
      <Faq />
    </div>
  );
};

export default Home;
