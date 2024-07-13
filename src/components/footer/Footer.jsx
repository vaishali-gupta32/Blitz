import { Link } from "react-router-dom";
import {
  faYoutube,
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer className="bg-[#6A5889]">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <img src="\b2.png" alt="Brand Logo" className="h-8 lg:h-10 ml-1 lg:ml-0 mb-4" />

            <div className="flex flex-wrap py-2 ">
      <a
        href="#"
        target="_blank"
        className="transition-colors bg-transparent block text-center text-[white] py-2 px-2 text-base hover:text-blue-600 ease-linear hover:ease-in rounded-t-md"
        rel="noreferrer"
      >
        <FontAwesomeIcon className="w-7 h-7 md:w-8 md:h-8" icon={faFacebook} size="2x" />
      </a>
      <a
        href="#"
        target="_blank"
        className="transition-colors  bg-transparent block text-center text-white py-2 px-2 text-base  hover:text-pink-600 ease-linear hover:ease-in"
        rel="noreferrer"
      >
        <FontAwesomeIcon className="w-7 h-7 md:w-8 md:h-8" icon={faInstagram} size="2x" />
      </a>
      <a
        href="#"
        target="_blank"
        className="transition-colors  bg-transparent block text-center text-white py-2 px-2 text-base  hover:text-blue-700 ease-linear hover:ease-in"
        rel="noreferrer"
      >
        <FontAwesomeIcon className="w-7 h-7 md:w-8 md:h-8" icon={faLinkedin} size="2x" />
      </a>
      <a
        href="#"
        target="_blank"
        className="transition-colors  bg-transparent block text-center text-white py-2 px-2 text-base  hover:text-red-600 ease-linear hover:ease-in rounded-b-md"
        rel="noreferrer"
      >
        <FontAwesomeIcon className="w-7 h-7 md:w-8 md:h-8" icon={faYoutube} size="2x" />
      </a>
      </div>
          </div>
          {/* Support */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Support</h3>
            <ul className="text-white">
              <li><Link to="/help-center" className="hover:text-black">Help Center</Link></li>
              <li><Link to="/contact-us" className="hover:text-black">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-black">Shipping</Link></li>
              <li><Link to="/returns" className="hover:text-black">Returns</Link></li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Legal</h3>
            <ul className="text-white">
              <li><Link to="/privacy-policy" className="hover:text-black">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-black">Terms of Service</Link></li>
              <li><Link to="/disclaimer" className="hover:text-black">Disclaimer</Link></li>
            </ul>
          </div>
          {/* Social */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">We are Blitz</h3>
            <p className="text-left text-white text-lg leading-relaxed">
                        Blitz is the new socio-fashion platform. It connects you with the fashion influencers and allows you to become one. Buy now, what's trending now!
                    </p>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="mt-6 border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-white font-semibold">©2024 Blitz. All rights reserved.</p>
        <p className="text-white mt-2 md:mt-0 font-semibold">Made by InnovateHers</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
