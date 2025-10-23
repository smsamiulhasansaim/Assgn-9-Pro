import React from 'react';
import { 
  FaPuzzlePiece, 
  FaRobot, 
  FaPalette, 
  FaDragon,
  FaCar,
  FaGamepad,
  FaMusic,
  FaMicroscope
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="max-w-6xl mx-auto px-5 py-8 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-[#FF6B8B] to-[#6A5AF9] bg-clip-text text-transparent">
        Welcome to ToyTopia!
      </h1>
      <p className="text-xl text-gray-800 leading-relaxed max-w-3xl mx-auto mb-12">
        Discover a magical world of toys, games, and fun activities for children of all ages. 
        Explore our collection and find your next favorite toy!
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        <div className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-center">
          <FaPuzzlePiece className="text-5xl mb-4 text-[#FF6B8B] mx-auto" />
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Puzzle Games</h3>
          <p className="text-gray-600">Challenge your mind with our exciting puzzle collection</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-center">
          <FaRobot className="text-5xl mb-4 text-[#FF6B8B] mx-auto" />
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Robots</h3>
          <p className="text-gray-600">Interactive robots that teach coding and problem-solving</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-center">
          <FaPalette className="text-5xl mb-4 text-[#FF6B8B] mx-auto" />
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Art Supplies</h3>
          <p className="text-gray-600">Unleash creativity with our colorful art materials</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-center">
          <FaDragon className="text-5xl mb-4 text-[#FF6B8B] mx-auto" />
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Action Figures</h3>
          <p className="text-gray-600">Heroes and villains for epic adventure stories</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-center">
          <FaCar className="text-5xl mb-4 text-[#FF6B8B] mx-auto" />
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Remote Control Cars</h3>
          <p className="text-gray-600">High-speed RC cars for thrilling races and adventures</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-center">
          <FaGamepad className="text-5xl mb-4 text-[#FF6B8B] mx-auto" />
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Video Games</h3>
          <p className="text-gray-600">Latest and classic games for all gaming consoles</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-center">
          <FaMusic className="text-5xl mb-4 text-[#FF6B8B] mx-auto" />
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Musical Toys</h3>
          <p className="text-gray-600">Instruments and toys that create beautiful melodies</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-center">
          <FaMicroscope className="text-5xl mb-4 text-[#FF6B8B] mx-auto" />
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Science Kits</h3>
          <p className="text-gray-600">Explore the wonders of science with fun experiments</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-16">
        <div className="bg-linear-to-r from-[#667eea] to-[#764ba2] text-white p-8 rounded-xl text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">🎉 Special Summer Sale! 🎉</h2>
          <p className="text-lg mb-6">Get up to 50% off on selected toys | Free shipping on orders over ৳50</p>
          <NavLink to="/shop">
            <button className="bg-[#FF6B8B] text-white border-none px-8 py-3 text-lg rounded-full cursor-pointer transition-all duration-300 hover:bg-[#ff5278] hover:-translate-y-1 hover:shadow-lg">
              Shop Now
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Hero;