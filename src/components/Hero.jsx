import React from "react";
import hero from "../assets/images/hero.jpg";
import { FaLongArrowAltRight } from "react-icons/fa";
import { NavLink } from "react-router";
const Hero = () => {
  return (
    <div
      className="hero min-h-screen "
      style={{
        backgroundImage: `url(${hero})`,
        opacity: 25,
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hobby Hood</h1>
          <p className="mb-5">
            Hobbies are an essential part of life that bring joy, relaxation, and a sense of fulfillment. Whether it's painting, reading, gardening, or playing music, hobbies allow us to express ourselves and explore our passions outside of work or study.
          </p>
          <NavLink to='/all-groups'
          className="btn btn-primary">Let's Explore <FaLongArrowAltRight />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Hero;
