import React, { useState, useEffect } from 'react';
import './Testimonials.css';
import { FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const response = await fetch('/data/testimonials.json');
        if (!response.ok) {
          throw new Error('Failed to load testimonials data');
        }
        const data = await response.json();
        setTestimonials(data.testimonials);
        setError(null);
      } catch (error) {
        console.error('Testimonials data load error:', error);
        setError('Testimonials data could not be loaded');
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="testimonials">
        <div className="testimonials-loading">Loading testimonials...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="testimonials">
        <div className="testimonials-error">
          <p>{error}</p>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="testimonials">
      <div className="testimonials-header">
        <h2>What Parents Say About ToyTopia</h2>
        <p>Hear from happy families who have discovered the joy of learning through play</p>
      </div>
      
      <div className="testimonial-grid">
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial.id} 
            className="testimonial-card"
            style={{ borderLeftColor: testimonial.color }}
          >
            <div className="quote-icon">
              <FaQuoteLeft style={{ color: testimonial.color }} />
            </div>
            <p>"{testimonial.text}"</p>
            <div className="customer-info">
              <div 
                className="customer-avatar"
                style={{ backgroundColor: testimonial.color }}
              >
                {testimonial.author.charAt(0)}
              </div>
              <div className="customer-details">
                <div className="customer">{testimonial.author}</div>
                <div className="customer-role">Happy Parent</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;