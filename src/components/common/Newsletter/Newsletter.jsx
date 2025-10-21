// Newsletter.jsx
import React, { useState } from 'react';
import { FaPaperPlane, FaEnvelope, FaGift } from 'react-icons/fa';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // এখানে সাধারণত API কল করা হবে
    console.log(`Subscribed with email: ${email}`);
    setIsSubscribed(true);
    setEmail('');
    
    // 3 সেকেন্ড পর সাবস্ক্রিপশন মেসেজ disappear হবে
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000);
  };

  return (
    <div className="newsletter-container">
      <div className="newsletter">
        <div className="newsletter-icon">
          <FaEnvelope />
        </div>
        
        <h2>Stay Updated!</h2>
        <p>Get the latest toy news and exclusive offers delivered to your inbox</p>
        
        {isSubscribed ? (
          <div className="success-message">
            <FaGift className="success-icon" />
            <p>Thank you for subscribing! Check your email for a special welcome gift.</p>
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="input-container">
              <FaEnvelope className="input-icon" />
              <input 
                type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="subscribe-btn">
              <span>Subscribe</span>
              <FaPaperPlane className="btn-icon" />
            </button>
          </form>
        )}
        
        <div className="newsletter-features">
          <div className="feature">
            <FaGift />
            <span>Exclusive Deals</span>
          </div>
          <div className="feature">
            <FaEnvelope />
            <span>Weekly Updates</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;