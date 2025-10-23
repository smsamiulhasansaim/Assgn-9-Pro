import React, { useState } from 'react';
import { FaPaperPlane, FaEnvelope, FaGift } from 'react-icons/fa';
import './Newsletter.css';
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Subscribed with email: ${email}`);
    setIsSubscribed(true);
    setEmail('');
    
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-5">
      <div className="relative bg-linear-to-r from-[#FF6B8B] to-[#6A5AF9] text-white py-12 text-center rounded-2xl my-12 overflow-hidden shadow-xl">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-linear(circle,rgba(255,255,255,0.1)_1%,transparent_1%)] bg-size-[20px_20px] rotate-30 animate-float"></div>
        
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-4 text-white">Stay Updated!</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get the latest toy news and exclusive offers delivered to your inbox
          </p>
          
          {isSubscribed ? (
            <div className="bg-white/15 backdrop-blur-sm p-5 rounded-xl mb-8 border border-white/20 animate-fade-in">
              <FaGift className="text-3xl mb-3 text-green-500 mx-auto" />
              <p>Thank you for subscribing! Check your email for a special welcome gift.</p>
            </div>
          ) : (
            <form className="flex flex-col md:flex-row max-w-2xl mx-auto mb-8 gap-3 relative" onSubmit={handleSubmit}>
              <div className="relative flex-1">
                <FaEnvelope className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[#6A5AF9] z-10" />
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-5 py-4 border-none rounded-full text-base outline-none shadow-lg transition-all duration-300 focus:shadow-xl focus:-translate-y-0.5"
                />
              </div>
              <button 
                type="submit" 
                className="bg-gray-800 text-white border-none px-8 py-4 rounded-full cursor-pointer transition-all duration-300 text-base font-semibold flex items-center gap-2 shadow-lg hover:bg-gray-700 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <span>Subscribe</span>
                <FaPaperPlane className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          )}
          
          <div className="flex justify-center gap-6 mt-5 flex-wrap">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-full border border-white/10">
              <FaGift />
              <span>Exclusive Deals</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-full border border-white/10">
              <FaEnvelope />
              <span>Weekly Updates</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Newsletter;