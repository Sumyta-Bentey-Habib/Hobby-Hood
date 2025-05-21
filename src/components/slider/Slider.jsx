import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
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
    <div className='bg-indigo-300'>
      <h1 className='text-center text-bold text-5xl text-black p-10' >Fun and Social Angle</h1>
      <p className='text-center'>Hobbies aren't just about <br /> solo enjoyment — they often bring people together. Joining a book club or a sports team can turn <br />a personal interest into a shared experience, helping build connections and friendships.</p>
      <div className="pt-24 px-4 max-w-6xl mx-auto">
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
        <SwiperSlide>
          <img
            src={slider1}
            alt="Slide 1"
            className="w-full h-[250px] object-cover rounded-xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={slider2}
            alt="Slide 2"
            className="w-full h-[250px] object-cover rounded-xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={slider3}
            alt="Slide 3"
            className="w-full h-[250px] object-cover rounded-xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={slider4}
            alt="Slide 4"
            className="w-full h-[250px] object-cover rounded-xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={slider5}
            alt="Slide 5"
            className="w-full h-[250px] object-cover rounded-xl"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  
    </div>
     
  );
};

export default Slider;
