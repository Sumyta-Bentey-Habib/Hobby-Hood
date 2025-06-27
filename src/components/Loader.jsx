import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import loaderAnimation from "../assets/lottie/loading.json";

const Loader = () => {
  const [themeClass, setThemeClass] = useState({
    container: "bg-white",
  });

  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      if (theme === "dark") {
        setThemeClass({
          container: "bg-gray-900",
        });
      } else {
        setThemeClass({
          container: "bg-white",
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
      className={`flex items-center justify-center h-64 w-full ${themeClass.container}`}
    >
      <div className="w-24 h-24">
        <Lottie animationData={loaderAnimation} loop={true} />
      </div>
    </div>
  );
};

export default Loader;
