import React, { useState, useEffect } from 'react';
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
      <div className="max-w-6xl mx-auto px-5 my-20">
        <div className="text-center py-15 text-xl text-gray-600">Loading testimonials...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-5 my-20">
        <div className="text-center py-15 text-red-500 text-lg">
          <p>{error}</p>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 my-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-[#FF6B8B]">What Parents Say About ToyTopia</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Hear from happy families who have discovered the joy of learning through play
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div 
            key={testimonial.id} 
            className="bg-white p-8 rounded-xl text-left border-l-4 transition-all duration-300 shadow-lg hover:-translate-y-2 hover:shadow-xl animate-fade-in-up"
            style={{ 
              borderLeftColor: testimonial.color,
              animationDelay: `${(index + 1) * 0.1}s` 
            }}
          >
            <div className="text-2xl mb-4 opacity-80">
              <FaQuoteLeft style={{ color: testimonial.color }} />
            </div>
            <p className="italic text-gray-700 mb-6 text-lg leading-relaxed">"{testimonial.text}"</p>
            <div className="flex items-center mt-6">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 shadow-lg"
                style={{ backgroundColor: testimonial.color }}
              >
                {testimonial.author.charAt(0)}
              </div>
              <div className="flex flex-col">
                <div className="font-bold text-gray-900 text-lg">{testimonial.author}</div>
                <div className="text-gray-600 text-sm">Happy Parent</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;