import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PopularToys.css';
import { Link } from 'react-router';

const PopularToys = () => {
    const [toys, setToys] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchToys = async () => {
            try {
                const response = await fetch('/data/toys.json');
                const data = await response.json();
                
                const popularToys = data
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 6);
                
                setToys(popularToys);
            } catch (error) {
                console.error('Error fetching toys:', error);
                setToys([]);
            } finally {
                setLoading(false);
            }
        };

        fetchToys();
    }, []);

    const formatPrice = (price) => {
        return `৳${price.toFixed(2)}`;
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="star full">★</span>);
        }

        if (hasHalfStar) {
            stars.push(<span key="half" className="star half">★</span>);
        }

        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
        }

        return stars;
    };

    const handleToyClick = (toyId) => {
        navigate(`/toy/${toyId}`);
    };

    if (loading) {
        return (
            <section className="popular-toys">
                <div className="container">
                    <div className="section-header">
                        <h2>Popular Toys</h2>
                        <p>Check out our best-selling toys loved by kids and parents alike</p>
                    </div>
                    <div className="loading-spinner">Loading popular toys...</div>
                </div>
            </section>
        );
    }

    return (
        <section className="popular-toys">
            <div className="container">
                <div className="section-header">
                    <h2>Popular Toys</h2>
                    <p>Check out our best-selling toys loved by kids and parents alike</p>
                </div>
                
                <div className="toys-grid" id="popular-toys-grid">
                    {toys.map(toy => (
                        <div 
                            key={toy.toyId} 
                            className="toy-card"
                            onClick={() => handleToyClick(toy.toyId)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="toy-image">
                                <img 
                                    src={toy.pictureURL} 
                                    alt={toy.toyName}
                                    loading="lazy"
                                />
                                <div className="toy-badge">Popular</div>
                            </div>
                            
                            <div className="toy-content">
                                <h3 className="toy-name">{toy.toyName}</h3>
                                
                                <div className="toy-meta">
                                    <div className="toy-rating">
                                        {renderStars(toy.rating)}
                                        <span className="rating-value">({toy.rating})</span>
                                    </div>
                                    <div className="toy-category">{toy.subCategory}</div>
                                </div>
                                
                                <div className="toy-footer">
                                    <div className="toy-price">{formatPrice(toy.price)}</div>
                                    <div className="toy-stock">
                                        {toy.availableQuantity > 10 ? (
                                            <span className="in-stock">In Stock</span>
                                        ) : toy.availableQuantity > 0 ? (
                                            <span className="low-stock">Low Stock</span>
                                        ) : (
                                            <span className="out-of-stock">Out of Stock</span>
                                        )}
                                    </div>
                                </div>
                                
                                <button 
                                    className="view-more-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleToyClick(toy.toyId);
                                    }}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center items-center mt-10">
            <button className="btn btn-neutral btn-dash">
               <Link to="/shop">See All Toys</Link>
            </button>
            </div>

        </section>
    );
};

export default PopularToys;