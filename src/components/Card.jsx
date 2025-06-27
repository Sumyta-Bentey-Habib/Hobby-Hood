import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

// Images
import card1 from "../assets/card-images/coding.jpg";
import card2 from "../assets/card-images/cooking.jpg";
import card3 from "../assets/card-images/gradening.jpg";
import card4 from "../assets/card-images/drawing.jpg";
import card5 from "../assets/card-images/crafting.jpeg";
import card6 from "../assets/card-images/photo.jpg";

const cardData = [
  {
    image: card1,
    title: "Skill Development",
    description:
      "Pursuing hobbies can help you learn new skills or improve existing ones. Whether it's painting, coding, or cooking, hobbies make you more capable and creative.",
  },
  {
    image: card2,
    title: "Stress Relief",
    description:
      "Hobbies help reduce stress by giving your mind a break from daily pressures. They offer a fun and relaxing way to unwind and refresh your mental state.",
  },
  {
    image: card3,
    title: "Boosts Mental Health",
    description:
      "Engaging in enjoyable activities increases happiness and lowers the risk of depression and anxiety. Hobbies give a sense of purpose and achievement.",
  },
  {
    image: card4,
    title: "Time Management",
    description:
      "Balancing hobbies with daily tasks teaches better time management. It encourages you to organize your day more effectively to make time for your passions.",
  },
  {
    image: card5,
    title: "Improves Social Life",
    description:
      "Group hobbies like sports, music, or clubs help you meet new people and build friendships. They enhance communication and teamwork skills.",
  },
  {
    image: card6,
    title: "Break from Routine",
    description:
      "Hobbies provide a refreshing escape from the monotony of daily life. They add excitement and variety, making everyday living more enjoyable and fulfilling.",
  },
];

const CardItem = ({ image, title, description, themeClass }) => (
  <div
    className={`shadow-sm card rounded-xl overflow-hidden text-base-content ${themeClass} transition-colors duration-300`}
  >
    <figure className="px-10 pt-10">
      <img src={image} alt={title} className="object-cover w-full h-48 rounded-xl" />
    </figure>
    <div className="items-center p-6 text-center card-body">
      <h2 className="text-xl font-semibold card-title">{title}</h2>
      <p className="mt-2">{description}</p>
    </div>
  </div>
);

const Card = () => {
  const [themeClass, setThemeClass] = useState("bg-white text-gray-800");

  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      if (theme === "dark") {
        setThemeClass("bg-gray-800 text-gray-100");
      } else {
        setThemeClass("bg-white text-gray-800");
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
    <div className={`py-10 px-4 min-h-screen transition-colors duration-300 ${themeClass}`}>
      <h1 className="mb-6 text-4xl font-bold text-center md:text-5xl">
        <Typewriter
          words={["Why we should choose a hobby?","Make this year full of new experience", "Live your life"]}
          loop
          cursor
          cursorStyle="|"
          typeSpeed={100}
          deleteSpeed={20}
          delaySpeed={1000}
        />
      </h1>
      <div className="grid grid-cols-1 gap-6 m-5 md:grid-cols-2 lg:grid-cols-3">
        {cardData.map((item, index) => (
          <CardItem
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
            themeClass={themeClass} // pass for background and text color
          />
        ))}
      </div>
    </div>
  );
};

export default Card;
