import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Typewriter } from 'react-simple-typewriter';
import 'swiper/css';
import 'swiper/css/pagination';
import './slider.css';
import slider1 from '../../assets/slider-image/slide1.jpg';
import slider2 from '../../assets/slider-image/slide2.jpg';

import slider4 from '../../assets/slider-image/slide4.jpg';
import slider5 from '../../assets/slider-image/slide5.jpg';

const Slider = () => {
  const [themeClasses, setThemeClasses] = useState({
    heading: "text-black",
    paragraph: "text-gray-700",
    background: "bg-white",
  });

  useEffect(() => {
    const updateThemeClasses = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      if (theme === "dark") {
        setThemeClasses({
          heading: "text-white",
          paragraph: "text-gray-300",
          background: "bg-gray-900",
        });
      } else {
        setThemeClasses({
          heading: "text-black",
          paragraph: "text-gray-700",
          background: "bg-white",
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
    <div className={`${themeClasses.background} min-h-screen flex flex-col items-center justify-center px-4`}>
      <h1 className={`text-center font-bold text-5xl  ${themeClasses.heading}`}>
        <Typewriter
          words={['Fun and Social Angle']}
          loop={true}
          cursor
          cursorStyle="|"
          typeSpeed={80}
          deleteSpeed={50}
          delaySpeed={2000}
        />
      </h1>

      <p className={`text-center mt-4 max-w-2xl ${themeClasses.paragraph}`}>
        Hobbies aren't just about solo enjoyment — they often bring people together. 
        Joining a book club or a sports team can turn a personal interest into a shared experience, 
        helping build connections and friendships.
      </p>

      <div className="w-full max-w-6xl pt-16 mx-auto">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {[slider1, slider2,  slider4, slider5].map((slide, index) => (
            <SwiperSlide key={index}>
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-[250px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
