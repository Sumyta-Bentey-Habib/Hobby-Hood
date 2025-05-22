import React from "react";
import card1 from "../assets/card-images/coding.jpg";
import card2 from "../assets/card-images/cooking.jpg";
import card3 from "../assets/card-images/gradening.jpg";
import card4 from "../assets/card-images/drawing.jpg";
import card5 from "../assets/card-images/crafting.jpeg";
import card6 from "../assets/card-images/photo.jpg";
const Card = () => {
  return (
    <div className="mb-10">
      <h1 className="text-center p-4 text-2xl">Make this year full of new experience</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5">
        <div className="card bg-base-100 w-96 shadow-sm">
          <figure className="px-10 pt-10">
            <img
              src={card1}
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Skill Development</h2>
            <p>
             Pursuing hobbies can help you learn new skills or improve existing ones. Whether it's painting, coding, or cooking, hobbies make you more capable and creative.
            </p>
           
          </div>
        </div>

        <div className="card bg-base-100 w-96 shadow-sm">
          <figure className="px-10 pt-10">
            <img
              src={card2}
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Stress Relief</h2>
            <p>
              Hobbies help reduce stress by giving your mind a break from daily pressures. They offer a fun and relaxing way to unwind and refresh your mental state.
            </p>
            
          </div>
        </div>

        <div className="card bg-base-100 w-96 shadow-sm">
          <figure className="px-10 pt-10">
            <img
              src={card3}
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Boosts Mental Health</h2>
            <p>
              Engaging in enjoyable activities increases happiness and lowers the risk of depression and anxiety. Hobbies give a sense of purpose and achievement.
            </p>
            
          </div>
        </div>

        <div className="card bg-base-100 w-96 shadow-sm">
          <figure className="px-10 pt-10">
            <img
              src={card4}
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Time Management</h2>
            <p>
              Balancing hobbies with daily tasks teaches better time management. It encourages you to organize your day more effectively to make time for your passions.
            </p>
           
          </div>
        </div>

        <div className="card bg-base-100 w-96 shadow-sm">
          <figure className="px-10 pt-10">
            <img
              src={card5}
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Improves Social Life</h2>
            <p>
              Group hobbies like sports, music, or clubs help you meet new people and build friendships. They enhance communication and teamwork skills.
            </p>
            
          </div>
        </div>

        <div className="card bg-base-100 w-96 shadow-sm">
          <figure className="px-10 pt-10">
            <img
              src={card6}
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Break from Routine</h2>
            <p>
              Hobbies provide a refreshing escape from the monotony of daily life. They add excitement and variety, making everyday living more enjoyable and fulfilling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
