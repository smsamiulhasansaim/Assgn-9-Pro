import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
          <div className="h-2 bg-linear-to-r from-pink-500 via-purple-500 to-cyan-400"></div>
          
          <div className="p-8 md:p-12 lg:p-16 text-center">
            <div className="flex justify-center items-center gap-4 mb-10">
              <div className="text-8xl md:text-9xl font-black text-pink-500 drop-shadow-lg animate-bounce">
                4
              </div>
              <div className="text-5xl md:text-6xl text-yellow-400 animate-spin">
                <FaExclamationTriangle className="drop-shadow-md" />
              </div>
              <div className="text-8xl md:text-9xl font-black text-pink-500 drop-shadow-lg animate-bounce [animation-delay:0.2s]">
                4
              </div>
            </div>
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
                Oops! Page Not Found
              </h1>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                The page you're looking for seems to have wandered off into the toy box! 
                Don't worry, even the best toys sometimes get lost.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link 
                to="/shop" 
                className="flex items-center gap-3 bg-yellow-400 text-gray-800 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <FaSearch className="text-lg" />
                <span>Explore Toys</span>
              </Link>
              
              <button 
                onClick={() => window.history.back()} 
                className="flex items-center gap-3 border-2 border-purple-600 text-purple-600 bg-transparent px-8 py-4 rounded-full font-semibold hover:bg-purple-600 hover:text-white transform hover:-translate-y-1 transition-all duration-300"
              >
                <FaArrowLeft className="text-lg" />
                <span>Go Back</span>
              </button>
            </div>
            <div className="relative h-24">

              <div className="absolute left-1/4 text-3xl opacity-70 animate-[float_6s_ease-in-out_infinite]">
                🚀
              </div>

              <div className="absolute left-1/3 text-3xl opacity-70 animate-[float_6s_ease-in-out_infinite_1s]">
                🧸
              </div>
              <div className="absolute left-1/2 text-3xl opacity-70 animate-[float_6s_ease-in-out_infinite_2s]">
                🎮
              </div>
              <div className="absolute left-2/3 text-3xl opacity-70 animate-[float_6s_ease-in-out_infinite_3s]">
                🦄
              </div>
              <div className="absolute left-3/4 text-3xl opacity-70 animate-[float_6s_ease-in-out_infinite_4s]">
                🚗
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;