import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'
import { 
  FaRainbow, 
  FaHome, 
  FaStore,
  FaHeart, 
  FaGamepad, 
  FaSignInAlt, 
  FaSignOutAlt, 
  FaBars
} from 'react-icons/fa';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowMobileMenu(false);
    alert('Welcome to ToyTopia! You are now logged in.');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDropdown(false);
    alert('You have been logged out. Come back soon!');
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = () => setShowDropdown(false);
    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Left: Logo */}
          <NavLink to="/" className="nav-logo">
            <FaRainbow className="logo-icon" />
            <span className="logo-text">ToyTopia</span>
          </NavLink>

          {/* Center: Navigation Links */}
          <div className="nav-center">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <FaHome />
              <span>Home</span>
            </NavLink>
            
            <NavLink 
              to="/Shop" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <FaStore />
              <span>Shop</span>
            </NavLink>
            
            <NavLink 
              to="/my-favorites" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <FaHeart />
              <span>My Favorites</span>
            </NavLink>
            
            <NavLink 
              to="/games" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <FaGamepad />
              <span>Games</span>
            </NavLink>
          </div>

          {/* Right: User Section */}
          <div className="nav-right">
            {isLoggedIn ? (
              <div className="user-section">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face" 
                  alt="Profile" 
                  className="user-avatar"
                  onClick={toggleDropdown}
                />
                
                {showDropdown && (
                  <div className="user-dropdown">
                    <div className="user-info">
                      <img 
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face" 
                        alt="Profile" 
                        className="user-avatar-small"
                      />
                      <span className="user-name">Alex Johnson</span>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink to="/login" className="login-btn" onClick={handleLogin}>
                <FaSignInAlt />
                <span>Login</span>
              </NavLink>
            )}
            
            <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
              <FaBars />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="mobile-menu">
          <NavLink 
            to="/" 
            className="mobile-nav-link" 
            onClick={() => setShowMobileMenu(false)}
          >
            <FaHome />
            <span>Home</span>
          </NavLink>
          
          <NavLink 
            to="/my-profile" 
            className="mobile-nav-link" 
            onClick={() => setShowMobileMenu(false)}
          >
            <FaUser />
            <span>My Profile</span>
          </NavLink>
          
          <NavLink 
            to="/my-favorites" 
            className="mobile-nav-link" 
            onClick={() => setShowMobileMenu(false)}
          >
            <FaHeart />
            <span>My Favorites</span>
          </NavLink>
          
          <NavLink 
            to="/games" 
            className="mobile-nav-link" 
            onClick={() => setShowMobileMenu(false)}
          >
            <FaGamepad />
            <span>Games</span>
          </NavLink>
          
          {!isLoggedIn && (
            <NavLink 
              to="/login" 
              className="mobile-nav-link" 
              onClick={handleLogin}
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