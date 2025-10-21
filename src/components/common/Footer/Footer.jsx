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
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          
          {/* Brand Section */}
          <div className="footer-section brand-section">
            <h3 className="footer-logo">
              <span className="logo-gradient">ToyTopia</span>
            </h3>
            <p className="footer-description">
              Where imagination comes to life! We provide the finest toys and games 
              for children of all ages, fostering creativity, learning, and endless fun.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-link" aria-label="Pinterest">
                <FaPinterestP />
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-heading">
              <FaHome className="heading-icon" />
              Quick Links
            </h4>
            <ul className="footer-links">
              <li>
                <a href="/">
                  <FaHome className="link-icon" />
                  Home
                </a>
              </li>
              <li>
                <a href="/shop">
                  <FaShoppingBag className="link-icon" />
                  Shop All Toys
                </a>
              </li>
              <li>
                <a href="/new-arrivals">
                  <FaStar className="link-icon" />
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="/best-sellers">
                  <FaStar className="link-icon" />
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="/sales">
                  <FaTags className="link-icon" />
                  On Sale
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-section">
            <h4 className="footer-heading">
              <FaHeadset className="heading-icon" />
              Customer Service
            </h4>
            <ul className="footer-links">
              <li>
                <a href="/contact">
                  <FaHeadset className="link-icon" />
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/shipping">
                  <FaShippingFast className="link-icon" />
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="/returns">
                  <FaExchangeAlt className="link-icon" />
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="/faq">
                  <FaQuestionCircle className="link-icon" />
                  FAQ
                </a>
              </li>
              <li>
                <a href="/size-guide">
                  <FaRuler className="link-icon" />
                  Size Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div className="footer-section">
            <h4 className="footer-heading">
              <FaInfoCircle className="heading-icon" />
              Company
            </h4>
            <ul className="footer-links">
              <li>
                <a href="/about">
                  <FaInfoCircle className="link-icon" />
                  About Us
                </a>
              </li>
              <li>
                <a href="/careers">
                  <FaBriefcase className="link-icon" />
                  Careers
                </a>
              </li>
              <li>
                <a href="/blog">
                  <FaBlog className="link-icon" />
                  Blog
                </a>
              </li>
              <li>
                <a href="/press">
                  <FaNewspaper className="link-icon" />
                  Press
                </a>
              </li>
              <li>
                <a href="/affiliates">
                  <FaUserFriends className="link-icon" />
                  Affiliate Program
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section contact-section">
            <h4 className="footer-heading">
              <FaRegEnvelope className="heading-icon" />
              Contact Info
            </h4>
            <div className="contact-info">
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>Rangpur City </span>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <span>01866969660</span>
              </div>
              <div className="contact-item">
                <FaRegEnvelope className="contact-icon" />
                <span>hello@toytopia.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>
                &copy; {new Date().getFullYear()} ToyTopia. Made with 
                <FaHeart className="heart-icon" />  
                S M Samiul Hasan
                for joyful children.
              </p>
            </div>
            
            <div className="legal-links">
              <a href="/privacy-policy">
                Privacy Policy
              </a>
              <a href="/terms-conditions">
                Terms & Conditions
              </a>
              <a href="/cookie-policy">
                Cookie Policy
              </a>
              <a href="/accessibility">
                Accessibility
              </a>
            </div>
            
            <button 
              className="scroll-to-top" 
              onClick={scrollToTop} 
              aria-label="Scroll to top"
            >
              <FaArrowUp />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;