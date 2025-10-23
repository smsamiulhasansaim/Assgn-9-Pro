import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaArrowLeft, FaShoppingCart, FaBolt } from 'react-icons/fa';
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
                    const toyWithImages = {
                        ...foundToy,
                        images: [
                            foundToy.pictureURL,
                            foundToy.pictureURL,
                            foundToy.pictureURL,
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
            stars.push(<FaStar key={i} className="text-yellow-400 text-xl" />);
        }

        if (hasHalfStar) {
            stars.push(<FaStar key="half" className="text-yellow-400 text-xl opacity-70" />);
        }

        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaStar key={`empty-${i}`} className="text-gray-300 text-xl" />);
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
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <div className="text-xl text-gray-600">Loading toy details...</div>
            </div>
        );
    }

    if (!toy) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Toy Not Found</h2>
                    <p className="text-gray-600 mb-6">The toy you're looking for doesn't exist.</p>
                    <button 
                        onClick={() => navigate('/')} 
                        className="bg-linear-to-r from-[#667eea] to-[#764ba2] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <nav className="flex items-center gap-2 mb-8 text-sm">
                    <button 
                        onClick={() => navigate('/')} 
                        className="text-[#667eea] hover:underline transition-colors duration-200"
                    >
                        Home
                    </button>
                    <span className="text-gray-400">/</span>
                    <button 
                        onClick={() => navigate('/shop')} 
                        className="text-[#667eea] hover:underline transition-colors duration-200"
                    >
                        Shop
                    </button>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-800 font-semibold truncate max-w-[200px]">
                        {toy.toyName}
                    </span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl p-8 shadow-lg">
                    <div className="space-y-6">
                        <div className="w-full h-96 rounded-xl overflow-hidden bg-gray-100">
                            <img 
                                src={toy.images[selectedImage]} 
                                alt={toy.toyName}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div className="flex gap-4 justify-center">
                            {toy.images.map((image, index) => (
                                <div 
                                    key={index}
                                    className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 border-2 ${
                                        selectedImage === index 
                                            ? 'border-[#667eea] scale-105' 
                                            : 'border-transparent hover:border-gray-300'
                                    }`}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <img 
                                        src={image} 
                                        alt={`${toy.toyName} view ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="border-b border-gray-200 pb-6">
                            <h1 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
                                {toy.toyName}
                            </h1>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    {renderStars(toy.rating)}
                                    <span className="text-gray-600 font-semibold">({toy.rating})</span>
                                </div>
                                <span className="text-[#667eea] underline cursor-pointer text-sm">
                                    128 Reviews
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-4xl font-bold text-gray-800">
                                {formatPrice(toy.price)}
                            </span>
                            <span className="text-2xl text-gray-500 line-through">
                                ৳{(toy.price * 1.2).toFixed(2)}
                            </span>
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                Save 20%
                            </span>
                        </div>

                        <div className="text-gray-700 leading-relaxed text-lg">
                            <p>{toy.description}</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Features</h3>
                            <ul className="space-y-2">
                                {toy.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-700">
                                        <span className="text-green-500 font-bold">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex items-center gap-4">
                            <label htmlFor="quantity" className="font-semibold text-gray-800">
                                Quantity:
                            </label>
                            <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                                <button 
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                    className="bg-gray-100 px-4 py-3 text-xl transition-colors duration-200 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                                    className="w-16 text-center text-lg font-semibold border-none focus:outline-none"
                                />
                                <button 
                                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                                    disabled={quantity >= 10}
                                    className="bg-gray-100 px-4 py-3 text-xl transition-colors duration-200 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className={`text-sm font-semibold px-4 py-2 rounded-lg ${
                            toy.availableQuantity > 10 
                                ? 'bg-green-100 text-green-700'
                                : toy.availableQuantity > 0
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                        }`}>
                            {toy.availableQuantity > 10 
                                ? '✓ In Stock'
                                : toy.availableQuantity > 0
                                ? '⚠ Low Stock'
                                : '✗ Out of Stock'
                            }
                        </div>
                        <div className="flex gap-4">
                            <button 
                                className="flex-1 bg-linear-to-r from-[#667eea] to-[#764ba2] text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                onClick={handleAddToCart}
                                disabled={toy.availableQuantity === 0}
                            >
                                <FaShoppingCart />
                                Add to Cart
                            </button>
                            <button 
                                className="flex-1 bg-linear-to-r from-red-500 to-orange-500 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                onClick={handleBuyNow}
                                disabled={toy.availableQuantity === 0}
                            >
                                <FaBolt />
                                Buy Now
                            </button>
                        </div>
                        <div className="border-t border-gray-200 pt-6 space-y-3">
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-800">Category:</span>
                                <span className="text-gray-700">{toy.subCategory}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-800">Seller:</span>
                                <span className="text-gray-700">{toy.sellerName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-800">Free Shipping:</span>
                                <span className="text-gray-700">On orders over ৳500</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-800">Returns:</span>
                                <span className="text-gray-700">30 days return policy</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ToyDetails;