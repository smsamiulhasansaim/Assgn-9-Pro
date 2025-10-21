import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPuzzlePiece, 
  faRobot, 
  faPalette, 
  faDragon,
  faCar,
  faGamepad,
  faMusic,
  faMicroscope
} from '@fortawesome/free-solid-svg-icons';
import './Hero.css';
import { NavLink } from 'react-router';

const Hero = () => {
  return (
    <div className="content">
      <h1>Welcome to ToyTopia!</h1>
      <p>Discover a magical world of toys, games, and fun activities for children of all ages. Explore our collection and find your next favorite toy!</p>
      
      <div className="toy-grid">
        <div className="toy-card">
          <FontAwesomeIcon icon={faPuzzlePiece} className="toy-icon" />
          <h3>Puzzle Games</h3>
          <p>Challenge your mind with our exciting puzzle collection</p>
        </div>
        
        <div className="toy-card">
          <FontAwesomeIcon icon={faRobot} className="toy-icon" />
          <h3>Robots</h3>
          <p>Interactive robots that teach coding and problem-solving</p>
        </div>
        
        <div className="toy-card">
          <FontAwesomeIcon icon={faPalette} className="toy-icon" />
          <h3>Art Supplies</h3>
          <p>Unleash creativity with our colorful art materials</p>
        </div>
        
        <div className="toy-card">
          <FontAwesomeIcon icon={faDragon} className="toy-icon" />
          <h3>Action Figures</h3>
          <p>Heroes and villains for epic adventure stories</p>
        </div>

        {/* New Cards */}
        <div className="toy-card">
          <FontAwesomeIcon icon={faCar} className="toy-icon" />
          <h3>Remote Control Cars</h3>
          <p>High-speed RC cars for thrilling races and adventures</p>
        </div>
        
        <div className="toy-card">
          <FontAwesomeIcon icon={faGamepad} className="toy-icon" />
          <h3>Video Games</h3>
          <p>Latest and classic games for all gaming consoles</p>
        </div>
        
        <div className="toy-card">
          <FontAwesomeIcon icon={faMusic} className="toy-icon" />
          <h3>Musical Toys</h3>
          <p>Instruments and toys that create beautiful melodies</p>
        </div>
        
        <div className="toy-card">
          <FontAwesomeIcon icon={faMicroscope} className="toy-icon" />
          <h3>Science Kits</h3>
          <p>Explore the wonders of science with fun experiments</p>
        </div>
      </div>

      {/* Special Offers Section */}
      <div className="special-offers">
        <div className="offer-banner">
          <h2>🎉 Special Summer Sale! 🎉</h2>
          <p>Get up to 50% off on selected toys | Free shipping on orders over ৳50</p>
          <NavLink to="/shop">
            <button className="cta-button">Shop Now</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Hero;