import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import Countdown from 'react-countdown';
import 'bootstrap/dist/css/bootstrap.min.css';

// Countdown renderer function
const renderer = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="bg-black bg-opacity-50 text-white py-2 px-4 text-center">
      <div className="text-lg mb-1">Contest starts in: <span role="img" aria-label="clock">🕒</span></div>
      <div className="text-xl font-bold">
        {days}D : {hours}h : {minutes}m : {seconds}s
      </div>
    </div>
  );
};

function HeroSection() {
  // Set the target date for the countdown
  const targetDate = new Date(Date.now() + 1000 * 60 * 60 * 38); // 1 day 14 hours from now

  return (
    <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[650px] py-2 bg-[#2E2646]">
      <Carousel>
        <Carousel.Item>
          <div className="relative">
            <Link to="/category/Mens">
              <img
                className="d-block w-full lg:h-[650px]"
                 src="/slider_image_1.png"
                alt="First slide"
              />
            </Link>
          </div>
        </Carousel.Item>
        <Carousel.Item>
        <div className="relative">
          <Link to="/category/Womens">
            <img
              className="d-block w-full lg:h-[650px]"
              src="/slider_image_2.png"
              alt="Second slide"
            />
          </Link>
            <div className="absolute bottom-20 md:bottom-40 lg:bottom-40 xl:bottom-40 left-1/2 transform -translate-x-1/2">
              <Countdown date={targetDate} renderer={renderer} />
            </div>
            </div>
        </Carousel.Item>
      
      </Carousel>
    </div>
  );
}

export default HeroSection;
