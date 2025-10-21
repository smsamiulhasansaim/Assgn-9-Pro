import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ToyDetails.css';
import { toast } from 'react-toastify';

const ToyDetails = () => {
    const { toyId } = useParams();
    const navigate = useNavigate();
    const [toy, setToy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchToyDetails = async () => {
            try {
                const response = await fetch('/data/toys.json');
                const data = await response.json();
                const foundToy = data.find(t => t.toyId === parseInt(toyId));
                
                if (foundToy) {
                    // Add multiple images for demo (in real app, this would come from API)
                    const toyWithImages = {
                        ...foundToy,
                        images: [
                            foundToy.pictureURL,
                            foundToy.pictureURL, // Duplicate for demo
                            foundToy.pictureURL, // In real app, these would be different angles
                        ],
                        specifications: {
                            material: "High-quality Plastic",
                            ageRange: "3-8 years",
                            weight: "0.5 kg",
                            dimensions: "15x10x8 cm",
                            battery: "2x AA (not included)"
                        },
                        features: [
                            "Educational and fun",
                            "Safe for children",
                            "Durable construction",
                            "Easy to clean",
                            "Promotes creativity"
                        ]
                    };
                    setToy(toyWithImages);
                } else {
                    setToy(null);
                }
            } catch (error) {
                console.error('Error fetching toy details:', error);
                setToy(null);
            } finally {
                setLoading(false);
            }
        };

        fetchToyDetails();
    }, [toyId]);

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

    const handleAddToCart = () => {
       toast(`Added ${quantity} ${toy.toyName} to cart!`);
    };

    const handleBuyNow = () => {
        toast(`Proceeding to checkout with ${quantity} ${toy.toyName}`);
    };

    if (loading) {
        return (
            <div className="toy-details-loading">
                <div className="loading-spinner">Loading toy details...</div>
            </div>
        );
    }

    if (!toy) {
        return (
            <div className="toy-not-found">
                <div className="container">
                    <h2>Toy Not Found</h2>
                    <p>The toy you're looking for doesn't exist.</p>
                    <button onClick={() => navigate('/')} className="back-btn">
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section className="toy-details">
            <div className="container">
                {/* Updated Breadcrumb */}
                <nav className="breadcrumb">
                    <button onClick={() => navigate('/')} className="breadcrumb-link">Home</button>
                    <span className="breadcrumb-separator">/</span>
                    <button onClick={() => navigate('/shop')} className="breadcrumb-link">Shop</button>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-current">{toy.toyName}</span>
                </nav>

                <div className="toy-details-content">
                    {/* Image Gallery */}
                    <div className="image-gallery">
                        <div className="main-image">
                            <img 
                                src={toy.images[selectedImage]} 
                                alt={toy.toyName}
                            />
                        </div>
                        <div className="thumbnail-list">
                            {toy.images.map((image, index) => (
                                <div 
                                    key={index}
                                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <img src={image} alt={`${toy.toyName} view ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="product-info">
                        <div className="product-header">
                            <h1 className="product-title">{toy.toyName}</h1>
                            <div className="product-rating">
                                {renderStars(toy.rating)}
                                <span className="rating-value">({toy.rating})</span>
                                <span className="reviews-count">128 Reviews</span>
                            </div>
                        </div>

                        <div className="product-price">
                            <span className="current-price">{formatPrice(toy.price)}</span>
                            <span className="original-price">৳{(toy.price * 1.2).toFixed(2)}</span>
                            <span className="discount">Save 20%</span>
                        </div>

                        <div className="product-description">
                            <p>{toy.description}</p>
                        </div>

                        {/* Key Features */}
                        <div className="key-features">
                            <h3>Key Features</h3>
                            <ul>
                                {toy.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Quantity Selector */}
                        <div className="quantity-selector">
                            <label htmlFor="quantity">Quantity:</label>
                            <div className="quantity-controls">
                                <button 
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <input 
                                    type="number" 
                                    id="quantity"
                                    value={quantity}
                                    min="1"
                                    max="10"
                                    onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                                />
                                <button 
                                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                                    disabled={quantity >= 10}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Stock Status - Improved */}
                        <div className="stock-status">
                    
                        </div>

                        {/* Action Buttons */}
                        <div className="action-buttons">
                            <button 
                                className="add-to-cart-btn"
                                onClick={handleAddToCart}
                                disabled={toy.availableQuantity === 0}
                            >
                                Add to Cart
                            </button>
                            <button 
                                className="buy-now-btn"
                                onClick={handleBuyNow}
                                disabled={toy.availableQuantity === 0}
                            >
                                Buy Now
                            </button>
                        </div>

                        {/* Additional Info */}
                        <div className="additional-info">
                            <div className="info-item">
                                <span className="info-label">Category:</span>
                                <span className="info-value">{toy.subCategory}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Seller:</span>
                                <span className="info-value">{toy.sellerName}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Free Shipping:</span>
                                <span className="info-value">On orders over ৳500</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Returns:</span>
                                <span className="info-value">30 days return policy</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ToyDetails;  