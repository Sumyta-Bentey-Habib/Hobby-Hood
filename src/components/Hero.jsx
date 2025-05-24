import React from "react";
import hero from "../assets/images/hero.jpg";
import { FaLongArrowAltRight } from "react-icons/fa";
import { NavLink } from "react-router-dom"; 
import { Fade, Slide, Zoom } from "react-awesome-reveal";

const Hero = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay "></div>

      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <Fade direction="down" cascade triggerOnce>
            <h1 className="mb-5 text-5xl font-extrabold text-white drop-shadow-lg">
              Hobby Hood
            </h1>
          </Fade>

          <Zoom triggerOnce>
            <p className="mb-6 text-gray-200 text-lg leading-relaxed">
              Hobbies are a vibrant expression of who we are. Whether it’s
              painting, gardening, music, or making — they help us relax, grow,
              and connect with others who share the same spark.
            </p>
          </Zoom>

          <Slide direction="up" triggerOnce>
            <NavLink to="/all-groups" className="btn btn-primary flex items-center gap-2">
              Let's Explore <FaLongArrowAltRight />
            </NavLink>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default Hero;
