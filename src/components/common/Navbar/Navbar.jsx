import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import '../../../index.css';
import { 
  FaRainbow, 
  FaHome, 
  FaStore,
  FaHeart, 
  FaGamepad, 
  FaSignInAlt, 
  FaSignOutAlt, 
  FaBars,
  FaUser,
  FaShoppingCart,
  FaUserCircle
} from 'react-icons/fa';
import { auth } from '../../../app/Firebase/firebaseConfig'; 
import { signOut } from 'firebase/auth';
import { useAuth } from '../../../hooks/useAuth';

const Navbar = () => {
  const { user, loading } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowDropdown(false);
      setShowMobileMenu(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleProtectedNavigation = (path) => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: path } } });
      setShowMobileMenu(false);
      return;
    }
    navigate(path);
    setShowMobileMenu(false);
  };

  useEffect(() => {
    const closeDropdown = () => setShowDropdown(false);
    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMobileMenu && !event.target.closest('nav')) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMobileMenu]);

  const getProfileImage = () => {
    if (user?.photoURL) {
      return user.photoURL;
    }
    return null;
  };

  const getDisplayName = () => {
    if (user?.displayName) {
      return user.displayName;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  if (loading) {
    return (
      <nav className={`fixed top-0 left-0 w-full bg-linear-to-r from-[#FF6B8B] via-[#6A5AF9] to-[#C084FC] py-3 px-[5%] shadow-lg z-50 transition-all duration-300`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaRainbow className="text-3xl text-[#FFD166] drop-shadow" />
            <span className="text-2xl font-extrabold bg-linear-to-r from-white to-[#FFD166] bg-clip-text text-transparent drop-shadow pr-2">
              ToyTopia
            </span>
          </div>
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </nav>
    );
  }

  const navLinkClass = ({ isActive }) => 
    `flex items-center gap-2 text-white no-underline px-4 py-2 rounded-full transition-all duration-300 font-semibold relative overflow-hidden ${
      isActive ? 'bg-white/15 text-[#FFD166] -translate-y-1 shadow-lg border-2 border-[#FFD166]' : ''
    } hover:text-[#FFD166] hover:-translate-y-1 hover:shadow-md`;

  const mobileNavLinkClass = "flex items-center gap-3 text-white no-underline p-4 rounded-lg mb-2 transition-all duration-300 font-semibold text-lg hover:bg-white/20 hover:text-[#FFD166] hover:translate-x-2";

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full bg-linear-to-r from-[#FF6B8B] via-[#6A5AF9] to-[#C084FC] py-3 px-[5%] shadow-lg z-50 transition-all duration-300 ${isScrolled ? 'py-2 shadow-xl' : ''}`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <NavLink to="/" className="flex items-center gap-2 no-underline">
            <FaRainbow className="text-3xl text-[#FFD166] drop-shadow animate-bounce" />
            <span className="text-2xl font-extrabold bg-linear-to-r from-white to-[#FFD166] bg-clip-text text-transparent drop-shadow pr-2">
              ToyTopia
            </span>
          </NavLink>

          <div className="hidden md:flex gap-6 items-center">
            <NavLink to="/" className={navLinkClass}>
              <FaHome className="transition-transform duration-300" />
              <span>Home</span>
            </NavLink>
            
            <NavLink to="/shop" className={navLinkClass}>
              <FaStore className="transition-transform duration-300" />
              <span>Shop</span>
            </NavLink>
            
            <div 
              onClick={() => handleProtectedNavigation('/my-favorites')}
              className="flex items-center gap-2 text-white no-underline px-4 py-2 rounded-full transition-all duration-300 font-semibold relative overflow-hidden cursor-pointer hover:text-[#FFD166] hover:-translate-y-1 hover:shadow-md"
            >
              <FaHeart className="transition-transform duration-300" />
              <span>My Favorites</span>
            </div>
            
            <div 
              onClick={() => handleProtectedNavigation('/games')}
              className="flex items-center gap-2 text-white no-underline px-4 py-2 rounded-full transition-all duration-300 font-semibold relative overflow-hidden cursor-pointer hover:text-[#FFD166] hover:-translate-y-1 hover:shadow-md"
            >
              <FaGamepad className="transition-transform duration-300" />
              <span>Games</span>
            </div>

            <div 
              onClick={() => handleProtectedNavigation('/cart')}
              className="flex items-center gap-2 text-white no-underline px-4 py-2 rounded-full transition-all duration-300 font-semibold relative overflow-hidden cursor-pointer hover:text-[#FFD166] hover:-translate-y-1 hover:shadow-md"
            >
              <FaShoppingCart className="transition-transform duration-300" />
              <span>Cart</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <div 
                  className="flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-105"
                  onClick={toggleDropdown}
                >
                  {getProfileImage() ? (
                    <img 
                      src={getProfileImage()} 
                      alt="Profile" 
                      className="w-11 h-11 rounded-full border-2 border-[#FFD166] object-cover"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full border-2 border-[#FFD166] bg-white/20 flex items-center justify-center">
                      <FaUserCircle className="text-2xl text-[#FFD166]" />
                    </div>
                  )}
                  <span className="hidden lg:block text-white font-semibold text-sm max-w-[100px] truncate">
                    {getDisplayName()}
                  </span>
                </div>
                
                {showDropdown && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-xl p-4 shadow-xl min-w-[200px] animate-fade-in z-50">
                    <div className="flex items-center gap-2 pb-3 border-b-2 border-gray-100 mb-3">
                      {getProfileImage() ? (
                        <img 
                          src={getProfileImage()} 
                          alt="Profile" 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-linear-to-r from-[#FF6B8B] to-[#6A5AF9] flex items-center justify-center">
                          <FaUserCircle className="text-xl text-white" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-gray-800 font-bold text-sm">{getDisplayName()}</span>
                        <span className="text-gray-500 text-xs">{user.email}</span>
                      </div>
                    </div>
                    
                    <NavLink 
                      to="/my-profile" 
                      className="flex items-center gap-2 w-full px-3 py-2 text-gray-700 no-underline rounded-lg transition-all duration-300 text-sm font-semibold hover:bg-gray-100 hover:text-[#FF6B8B] mb-2"
                      onClick={() => setShowDropdown(false)}
                    >
                      <FaUser />
                      <span>My Profile</span>
                    </NavLink>
                    
                    <button 
                      className="flex items-center gap-2 w-full px-3 py-2 bg-linear-to-r from-[#FF6B8B] to-[#6A5AF9] text-white border-none rounded-lg cursor-pointer transition-all duration-300 text-sm font-semibold justify-center hover:shadow-md hover:-translate-y-0.5"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink 
                to="/login" 
                className="hidden md:flex items-center gap-2 bg-[#FFD166] text-gray-800 px-5 py-2 rounded-full no-underline transition-all duration-300 font-bold shadow-md hover:bg-white hover:-translate-y-1 hover:shadow-lg"
              >
                <FaSignInAlt />
                <span>Login</span>
              </NavLink>
            )}
            
            <button 
              className="md:hidden bg-transparent border-none text-white text-2xl cursor-pointer p-1 transition-all duration-300 hover:text-[#FFD166] hover:scale-110"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </nav>

      {showMobileMenu && (
        <div className="fixed top-16 left-0 w-full bg-linear-to-r from-[#FF6B8B] to-[#6A5AF9] p-5 shadow-lg z-40 animate-slide-down md:hidden">
          <NavLink 
            to="/" 
            className={mobileNavLinkClass}
            onClick={() => setShowMobileMenu(false)}
          >
            <FaHome />
            <span>Home</span>
          </NavLink>
          
          <NavLink 
            to="/shop" 
            className={mobileNavLinkClass}
            onClick={() => setShowMobileMenu(false)}
          >
            <FaStore />
            <span>Shop</span>
          </NavLink>

          <div 
            onClick={() => handleProtectedNavigation('/my-favorites')}
            className={`${mobileNavLinkClass} cursor-pointer`}
          >
            <FaHeart />
            <span>My Favorites</span>
          </div>
          
          <div 
            onClick={() => handleProtectedNavigation('/games')}
            className={`${mobileNavLinkClass} cursor-pointer`}
          >
            <FaGamepad />
            <span>Games</span>
          </div>

          <div 
            onClick={() => handleProtectedNavigation('/cart')}
            className={`${mobileNavLinkClass} cursor-pointer`}
          >
            <FaShoppingCart />
            <span>Cart</span>
          </div>

          {user ? (
            <>
              <NavLink 
                to="/my-profile" 
                className={mobileNavLinkClass}
                onClick={() => setShowMobileMenu(false)}
              >
                <FaUser />
                <span>My Profile</span>
              </NavLink>

              <button 
                className="flex items-center gap-3 w-full text-white no-underline p-4 rounded-lg mb-2 transition-all duration-300 font-semibold text-lg hover:bg-white/20 hover:text-[#FFD166] hover:translate-x-2 bg-transparent border-none text-left"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <NavLink 
              to="/login" 
              className={mobileNavLinkClass}
              onClick={() => setShowMobileMenu(false)}
            >
              <FaSignInAlt />
              <span>Login</span>
            </NavLink>
          )}
        </div>  
      )}
    </>
  );
};
export default Navbar;