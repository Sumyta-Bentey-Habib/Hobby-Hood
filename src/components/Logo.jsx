import React from 'react';
import logoimage from "../assets/logo/logo.png";

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <img
        src={logoimage}
        alt="Hobby Hood Logo"
        className="w-auto h-8"
        loading="lazy"
      />
      <h1 className="text-xl font-bold select-none">
        Hobby Hood
      </h1>
    </div>
  );
};

export default Logo;
