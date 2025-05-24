import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Typewriter } from 'react-simple-typewriter';
import 'swiper/css';
import 'swiper/css/pagination';
import './slider.css';
import slider1 from '../../assets/slider-image/slide1.jpg';
import slider2 from '../../assets/slider-image/slide2.jpg';
import slider3 from '../../assets/slider-image/slide3.jpg';
import slider4 from '../../assets/slider-image/slide4.jpg';
import slider5 from '../../assets/slider-image/slide5.jpg';

const Slider = () => {
 

  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-4'>
      <h1 className='text-center font-bold text-5xl text-black pt-10'>
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

      <p className='text-center mt-4 max-w-2xl'>
        Hobbies aren't just about  solo enjoyment — they often bring people together. 
        Joining a book club or a sports team can turn a personal interest into a shared experience, 
        helping build connections and friendships.
      </p>


      <div className="pt-16 w-full max-w-6xl mx-auto">
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
          {[slider1, slider2, slider3, slider4, slider5].map((slide, index) => (
            <SwiperSlide key={index}>
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-[250px] object-cover rounded-xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
