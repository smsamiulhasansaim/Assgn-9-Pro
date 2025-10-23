import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './PopularToys.css';
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
            stars.push(<FaStar key={i} className="text-yellow-400 text-lg" />);
        }

        if (hasHalfStar) {
            stars.push(<FaStar key="half" className="text-yellow-400 text-lg opacity-70" />);
        }

        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaStar key={`empty-${i}`} className="text-gray-300 text-lg" />);
        }

        return stars;
    };

    const handleToyClick = (toyId) => {
        navigate(`/toy/${toyId}`);
    };

    if (loading) {
        return (
            <section className="py-20 bg-linear-to-b from-gray-50 to-gray-100 relative">
                <div className="max-w-6xl mx-auto px-5">
                    <div className="text-center mb-15">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4 relative">
                            Popular Toys
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Check out our best-selling toys loved by kids and parents alike
                        </p>
                    </div>
                    <div className="text-center py-15 text-xl text-gray-600">Loading popular toys...</div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-linear-to-b from-gray-50 to-gray-100 relative">
            <div className="max-w-6xl mx-auto px-5">
                <div className="text-center mb-15">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4 relative">
                        Popular Toys
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Check out our best-selling toys loved by kids and parents alike
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                    {toys.map((toy, index) => (
                        <div 
                            key={toy.toyId} 
                            className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100 flex flex-col cursor-pointer animate-fade-in-up"
                            style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                            onClick={() => handleToyClick(toy.toyId)}
                        >
                            <div className="relative h-48 overflow-hidden bg-gray-50 shrink-0">
                                <img 
                                    src={toy.pictureURL} 
                                    alt={toy.toyName}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                                <div className="absolute top-3 right-3 bg-linear-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                                    Popular
                                </div>
                            </div>
                            
                            <div className="p-6 flex flex-col grow justify-between">
                                <h3 className="text-xl font-bold text-gray-800 mb-4 line-clamp-2 leading-tight">
                                    {toy.toyName}
                                </h3>
                                
                                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1">
                                            {renderStars(toy.rating)}
                                        </div>
                                        <span className="text-gray-600 text-sm font-semibold">({toy.rating})</span>
                                    </div>
                                    <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                                        {toy.subCategory}
                                    </div>
                                </div>
                                
                                <div className="flex justify-between items-center mb-4">
                                    <div className="text-2xl font-bold text-gray-800">{formatPrice(toy.price)}</div>
                                    <div className="toy-stock">
                                        {toy.availableQuantity > 10 ? (
                                            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-lg text-sm font-semibold">In Stock</span>
                                        ) : toy.availableQuantity > 0 ? (
                                            <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-lg text-sm font-semibold">Low Stock</span>
                                        ) : (
                                            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-sm font-semibold">Out of Stock</span>
                                        )}
                                    </div>
                                </div>
                                
                                <button 
                                    className="w-full bg-linear-to-r from-[#667eea] to-[#764ba2] text-white border-none py-3 rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg uppercase tracking-wide mt-auto"
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

                <div className="flex justify-center items-center mt-12">
                    <Link 
                        to="/shop" 
                        className="bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-700 hover:-translate-y-1 hover:shadow-lg"
                    >
                        See All Toys
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PopularToys;