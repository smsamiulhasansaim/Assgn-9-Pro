import React from 'react'; 
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaPinterestP,
  FaYoutube,
  FaRegEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
  FaArrowUp,
  FaHome,
  FaShoppingBag,
  FaStar,
  FaTags,
  FaHeadset,
  FaShippingFast,
  FaExchangeAlt,
  FaQuestionCircle,
  FaRuler,
  FaInfoCircle,
  FaBriefcase,
  FaBlog,
  FaNewspaper,
  FaUserFriends
} from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-linear-to-r from-[#FF6B8B] via-[#6A5AF9] to-[#C084FC] text-white mt-auto relative w-full">
      <div className="relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-linear-to-r before:from-[#FFD166] before:via-[#4ECDC4] before:to-[#C084FC]">
        <div className="max-w-6xl mx-auto px-5 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
            <div className="lg:col-span-2">
              <h3 className="text-3xl font-extrabold mb-4">
                <span className="bg-linear-to-r from-white to-[#FFD166] bg-clip-text text-transparent drop-shadow">
                  ToyTopia
                </span>
              </h3>
              <p className="text-lg leading-relaxed mb-6 opacity-90">
                Where imagination comes to life! We provide the finest toys and games 
                for children of all ages, fostering creativity, learning, and endless fun.
              </p>
              <div className="flex gap-4 justify-start">
                <a href="#" className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-full text-white no-underline transition-all duration-300 hover:bg-[#FFD166] hover:text-gray-800 hover:-translate-y-1 hover:shadow-lg" aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="#" className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-full text-white no-underline transition-all duration-300 hover:bg-[#FFD166] hover:text-gray-800 hover:-translate-y-1 hover:shadow-lg" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="#" className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-full text-white no-underline transition-all duration-300 hover:bg-[#FFD166] hover:text-gray-800 hover:-translate-y-1 hover:shadow-lg" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-full text-white no-underline transition-all duration-300 hover:bg-[#FFD166] hover:text-gray-800 hover:-translate-y-1 hover:shadow-lg" aria-label="Pinterest">
                  <FaPinterestP />
                </a>
                <a href="#" className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-full text-white no-underline transition-all duration-300 hover:bg-[#FFD166] hover:text-gray-800 hover:-translate-y-1 hover:shadow-lg" aria-label="YouTube">
                  <FaYoutube />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-5 text-[#FFD166] relative pb-3 flex items-center gap-3">
                <FaHome className="text-[#4ECDC4]" />
                Quick Links
                <span className="absolute bottom-0 left-0 w-10 h-1 bg-[#4ECDC4] rounded"></span>
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="/" className="flex items-center gap-3 text-white no-underline transition-all duration-300 opacity-90 py-1 hover:text-[#FFD166] hover:opacity-100 hover:translate-x-2">
                    <FaHome className="text-[#4ECDC4] transition-all duration-300 hover:text-[#FFD166] hover:scale-110" />
                    Home
                  </a>
                </li>
                <li>
                  <a href="/shop" className="flex items-center gap-3 text-white no-underline transition-all duration-300 opacity-90 py-1 hover:text-[#FFD166] hover:opacity-100 hover:translate-x-2">
                    <FaShoppingBag className="text-[#4ECDC4] transition-all duration-300 hover:text-[#FFD166] hover:scale-110" />
                    Shop All Toys
                  </a>
                </li>
                <li>
                  <a href="/new-arrivals" className="flex items-center gap-3 text-white no-underline transition-all duration-300 opacity-90 py-1 hover:text-[#FFD166] hover:opacity-100 hover:translate-x-2">
                    <FaStar className="text-[#4ECDC4] transition-all duration-300 hover:text-[#FFD166] hover:scale-110" />
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="/best-sellers" className="flex items-center gap-3 text-white no-underline transition-all duration-300 opacity-90 py-1 hover:text-[#FFD166] hover:opacity-100 hover:translate-x-2">
                    <FaStar className="text-[#4ECDC4] transition-all duration-300 hover:text-[#FFD166] hover:scale-110" />
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="/sales" className="flex items-center gap-3 text-white no-underline transition-all duration-300 opacity-90 py-1 hover:text-[#FFD166] hover:opacity-100 hover:translate-x-2">
                    <FaTags className="text-[#4ECDC4] transition-all duration-300 hover:text-[#FFD166] hover:scale-110" />
                    On Sale
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-5 text-[#FFD166] relative pb-3 flex items-center gap-3">
                <FaHeadset className="text-[#4ECDC4]" />
                Customer Service
                <span className="absolute bottom-0 left-0 w-10 h-1 bg-[#4ECDC4] rounded"></span>
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="/contact" className="flex items-center gap-3 text-white no-underline transition-all duration-300 opacity-90 py-1 hover:text-[#FFD166] hover:opacity-100 hover:translate-x-2">
                    <FaHeadset className="text-[#4ECDC4] transition-all duration-300 hover:text-[#FFD166] hover:scale-110" />
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/shipping" className="flex items-center gap-3 text-white no-underline transition-all duration-300 opacity-90 py-1 hover:text-[#FFD166] hover:opacity-100 hover:translate-x-2">
                    <FaShippingFast className="text-[#4ECDC4] transition-all duration-300 hover:text-[#FFD166] hover:scale-110" />
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="/returns" className="flex items-center gap-3 text-white no-underline transition-all duration-300 opacity-90 py-1 hover:text-[#FFD166] hover:opacity-100 hover:translate-x-2">
                    <FaExchangeAlt className="text-[#4ECDC4] transition-all duration-300 hover:text-[#FFD166] hover:scale-110" />
                    Returns & Exchanges
                  </a>
                </li>
                <li>
                  <a href="/faq" className="flex items-center gap-3 text-white no-underline transition-all duration-300 opacity-90 py-1 hover:text-[#FFD166] hover:opacity-100 hover:translate-x-2">
                    <FaQuestionCircle className="text-[#4ECDC4] transition-all duration-300 hover:text-[#FFD166] hover:scale-110" />
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/size-guide" className="flex items-center gap-3 text-white no-underline transition-all duration-300 opacity-90 py-1 hover:text-[#FFD166] hover:opacity-100 hover:translate-x-2">
                    <FaRuler className="text-[#4ECDC4] transition-all duration-300 hover:text-[#FFD166] hover:scale-110" />
                    Size Guide
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-5 text-[#FFD166] relative pb-3 flex items-center gap-3">
                <FaRegEnvelope className="text-[#4ECDC4]" />
                Contact Info
                <span className="absolute bottom-0 left-0 w-10 h-1 bg-[#4ECDC4] rounded"></span>
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3 opacity-90">
                  <FaMapMarkerAlt className="text-[#4ECDC4] text-lg mt-1 shrink-0" />
                  <span>Rangpur City</span>
                </div>
                <div className="flex items-start gap-3 opacity-90">
                  <FaPhone className="text-[#4ECDC4] text-lg mt-1 shrink-0" />
                  <span>01866969660</span>
                </div>
                <div className="flex items-start gap-3 opacity-90">
                  <FaRegEnvelope className="text-[#4ECDC4] text-lg mt-1 shrink-0" />
                  <span>hello@toytopia.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 py-6 w-full">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-6xl mx-auto px-5">
              <div className="flex items-center gap-2 opacity-80 text-sm">
                <p className="flex items-center gap-1">
                  &copy; {new Date().getFullYear()} ToyTopia. Made with 
                  <FaHeart className="text-[#ff4d7a] animate-pulse mx-1" />  
                  S M Samiul Hasan
                  for joyful children.
                </p>
              </div>
              
              <div className="flex gap-5 flex-wrap justify-center">
                <a href="/privacy-policy" className="text-white no-underline text-sm opacity-80 transition-all duration-300 hover:opacity-100 hover:text-[#4ECDC4] whitespace-nowrap">
                  Privacy Policy
                </a>
                <a href="/terms-conditions" className="text-white no-underline text-sm opacity-80 transition-all duration-300 hover:opacity-100 hover:text-[#4ECDC4] whitespace-nowrap">
                  Terms & Conditions
                </a>
                <a href="/cookie-policy" className="text-white no-underline text-sm opacity-80 transition-all duration-300 hover:opacity-100 hover:text-[#4ECDC4] whitespace-nowrap">
                  Cookie Policy
                </a>
                <a href="/accessibility" className="text-white no-underline text-sm opacity-80 transition-all duration-300 hover:opacity-100 hover:text-[#4ECDC4] whitespace-nowrap">
                  Accessibility
                </a>
              </div>
              
              <button 
                className="bg-[#FFD166] text-gray-800 border-none w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg hover:bg-white hover:-translate-y-1 hover:shadow-xl"
                onClick={scrollToTop} 
                aria-label="Scroll to top"
              >
                <FaArrowUp />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;