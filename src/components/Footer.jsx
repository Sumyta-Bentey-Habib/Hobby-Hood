import React, { useEffect, useState } from "react";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Logo from "../components/Logo";

const Footer = () => {

  const [themeClasses, setThemeClasses] = useState({
    footerBg: "bg-white",
    textPrimary: "text-gray-700",
    textSecondary: "text-gray-500",
    linkHover: "hover:text-indigo-600",
    inputBg: "bg-white",
    inputBorder: "border-gray-300",
    inputText: "text-gray-900",
    btnBg: "bg-indigo-600 hover:bg-indigo-700",
    btnText: "text-white",
    borderColor: "border-gray-200",
  });

  useEffect(() => {
    const updateThemeClasses = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      if (theme === "dark") {
        setThemeClasses({
          footerBg: "bg-gray-900",
          textPrimary: "text-gray-300",
          textSecondary: "text-gray-400",
          linkHover: "hover:text-indigo-400",
          inputBg: "bg-gray-800",
          inputBorder: "border-gray-600",
          inputText: "text-gray-100",
          btnBg: "bg-indigo-500 hover:bg-indigo-600",
          btnText: "text-white",
          borderColor: "border-gray-700",
        });
      } else {
        setThemeClasses({
          footerBg: "bg-white",
          textPrimary: "text-gray-700",
          textSecondary: "text-gray-500",
          linkHover: "hover:text-indigo-600",
          inputBg: "bg-white",
          inputBorder: "border-gray-300",
          inputText: "text-gray-900",
          btnBg: "bg-indigo-600 hover:bg-indigo-700",
          btnText: "text-white",
          borderColor: "border-gray-200",
        });
      }
    };

    updateThemeClasses();

    const observer = new MutationObserver(updateThemeClasses);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <footer className={`${themeClasses.footerBg} ${themeClasses.textPrimary} py-10 px-6 border-t ${themeClasses.borderColor}`}>
      <div className="flex flex-col justify-between gap-10 mx-auto max-w-7xl md:flex-row">

        {/* Logo & Social */}
        <div className="flex flex-col items-center justify-between w-full gap-4 p-6 text-center text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl md:w-1/4">
          <h2 className="text-xl font-bold">
          <Logo></Logo>
            </h2>
          <p className="text-sm">
            Connecting millions of hobbyists across the globe. Whether it's art, coding, gardening, or gaming — Hobby Hub is your creative playground. Have a question? We're here to help!
          </p>
          <div className="flex gap-4 mt-2 text-xl">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-gray-300">
              <FaTwitter className="cursor-pointer" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gray-300">
              <FaInstagram className="cursor-pointer" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-gray-300">
              <FaLinkedin className="cursor-pointer" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-gray-300">
              <FaYoutube className="cursor-pointer" />
            </a>
          </div>
        </div>

        {/* Contact */}
        <div className="w-full md:w-1/4">
          <h3 className="mb-3 text-lg font-semibold">Get In Touch</h3>
          <ul className="space-y-2 text-sm">
            <li>support@hobbyhub.com</li>
            <li>+8801221235678</li>
            <li>42, Creativity Lane, Khulna, Bangladesh</li>
          </ul>
        </div>

        {/* Links */}
        <div className="flex flex-wrap w-full gap-8 md:w-1/4">
          <div>
            <h3 className="mb-3 text-lg font-semibold">Quick Links</h3>
            <ul className="flex flex-col space-y-2 text-sm">
              <NavLink to='/' className={({ isActive }) => isActive ? `font-semibold ${themeClasses.linkHover}` : undefined}>Home</NavLink>
              <NavLink to='/all-groups' className={({ isActive }) => isActive ? `font-semibold ${themeClasses.linkHover}` : undefined}>Explore</NavLink>
            </ul>
          </div>
          <div>
            <h3 className="invisible mb-3 text-lg font-semibold md:visible">&nbsp;</h3>
            <ul className="space-y-2 text-sm">
                <NavLink to='/about' className={({ isActive }) => isActive ? `font-semibold ${themeClasses.linkHover}` : undefined}>About Us</NavLink>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="w-full md:w-1/4">
          <h3 className="mb-3 text-lg font-semibold">Join Our Newsletter</h3>
          <input
            type="email"
            placeholder="Enter your email.."
            className={`${themeClasses.inputBg} ${themeClasses.inputBorder} border rounded-full outline-none w-full px-4 py-2 mb-3 ${themeClasses.inputText}`}
          />
          <button
            className={`${themeClasses.btnBg} ${themeClasses.btnText} font-semibold py-2 px-6 rounded-full flex items-center justify-center gap-2 transition w-full`}
          >
            Subscribe →
          </button>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={`text-center text-sm mt-10 ${themeClasses.textSecondary}`}>
        © {new Date().getFullYear()} Hobby Hub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
