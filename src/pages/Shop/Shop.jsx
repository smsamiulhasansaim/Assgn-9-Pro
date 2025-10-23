import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FaSearch, 
    FaFilter, 
    FaTags, 
    FaStar, 
    FaDollarSign,
    FaListUl 
} from 'react-icons/fa';

const Shop = () => {
    const [toys, setToys] = useState([]);
    const [filteredToys, setFilteredToys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 250]);
    const [selectedRating, setSelectedRating] = useState(0);
    const [sortBy, setSortBy] = useState('name');
    const navigate = useNavigate();

    const categories = [
        'Building Blocks',
        'Dolls',
        'Vehicles',
        'Arts & Crafts',
        'Outdoor Play',
        'Educational',
        'Stuffed Animals',
        'Musical Toys',
        'Games & Puzzles'
    ];

    useEffect(() => {
        const fetchToys = async () => {
            try {
                const response = await fetch('/data/toys.json');
                const data = await response.json();
                setToys(data);
                setFilteredToys(data);
            } catch (error) {
                console.error('Error fetching toys:', error);
                setToys([]);
                setFilteredToys([]);
            } finally {
                setLoading(false);
            }
        };

        fetchToys();
    }, []);

    useEffect(() => {
        let filtered = toys.filter(toy => {
            const matchesSearch = toy.toyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            toy.description.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesCategory = selectedCategories.length === 0 || 
            selectedCategories.includes(toy.subCategory);
            
            const matchesPrice = toy.price >= priceRange[0] && toy.price <= priceRange[1];
            
            const matchesRating = selectedRating === 0 || toy.rating >= selectedRating;
            
            return matchesSearch && matchesCategory && matchesPrice && matchesRating;
        });

        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'name':
                default:
                    return a.toyName.localeCompare(b.toyName);
            }
        });

        setFilteredToys(filtered);
    }, [toys, searchTerm, selectedCategories, priceRange, selectedRating, sortBy]);

    const handleCategoryToggle = (category) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleRatingSelect = (rating) => {
        setSelectedRating(rating === selectedRating ? 0 : rating);
    };

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedCategories([]);
        setPriceRange([0, 250]);
        setSelectedRating(0);
        setSortBy('name');
    };

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

    const handleProductClick = (toyId) => {
        navigate(`/toy/${toyId}`);
    };

    const getCategoryCount = (category) => {
        return toys.filter(toy => toy.subCategory === category).length;
    };
    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8 pt-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center py-20 text-xl text-gray-600">Loading toys...</div>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8 pt-24">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold mb-4 bg-linear-to-r from-[#FF6B8B] to-[#6A5AF9] bg-clip-text text-transparent">
                        Toy Shop
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Discover our amazing collection of toys for all ages. 
                        Find the perfect toy for your little ones!
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  <aside className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg sticky top-24 h-fit">
                        <div className="mb-8 pb-6 border-b border-gray-200">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                                <FaSearch className="text-[#667eea]" />
                                Search Toys
                            </h3>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by name or description..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-4 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#667eea] focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                                />
                                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                        <div className="mb-8 pb-6 border-b border-gray-200">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                                <FaListUl className="text-[#667eea]" />
                                Categories
                            </h3>
                            <ul className="space-y-3">
                                {categories.map(category => (
                                    <li key={category}>
                                        <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:translate-x-1">
                                            <div 
                                                className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                                                    selectedCategories.includes(category) 
                                                        ? 'bg-[#667eea] border-[#667eea] text-white' 
                                                        : 'border-gray-300'
                                                }`}
                                                onClick={() => handleCategoryToggle(category)}
                                            >
                                                {selectedCategories.includes(category) && '✓'}
                                            </div>
                                            <span className="flex-1">{category}</span>
                                            <span className="text-gray-500 text-sm">
                                                ({getCategoryCount(category)})
                                            </span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                                <FaStar className="text-[#667eea]" />
                                Minimum Rating
                            </h3>
                            <div className="space-y-3">
                                {[4, 3, 2, 1].map(rating => (
                                    <div
                                        key={rating}
                                        className="flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:translate-x-1"
                                        onClick={() => handleRatingSelect(rating)}
                                    >
                                        <div className="flex gap-1">
                                            {renderStars(rating)}
                                        </div>
                                        <span className="text-gray-600 text-sm flex-1">
                                            {rating}+ Stars
                                        </span>
                                        <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                                            selectedRating === rating 
                                                ? 'bg-[#667eea] border-[#667eea] text-white' 
                                                : 'border-gray-300'
                                        }`}>
                                            {selectedRating === rating && '✓'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button className="flex-1 bg-linear-to-r from-[#667eea] to-[#764ba2] text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                                Apply Filters
                            </button>
                            <button 
                                className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-semibold border-2 border-gray-200 transition-all duration-300 hover:bg-gray-200 hover:-translate-y-0.5"
                                onClick={resetFilters}
                            >
                                Reset All
                            </button>
                        </div>
                    </aside>
                    <main className="lg:col-span-3">
                        <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="text-lg font-semibold text-gray-800">
                                Showing {filteredToys.length} of {toys.length} toys
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-gray-600 font-semibold">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-2 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:border-[#667eea] transition-all duration-200 cursor-pointer"
                                >
                                    <option value="name">Name (A-Z)</option>
                                    <option value="price-low">Price (Low to High)</option>
                                    <option value="price-high">Price (High to Low)</option>
                                    <option value="rating">Highest Rated</option>
                                </select>
                            </div>
                        </div>
                        {filteredToys.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredToys.map((toy, index) => (
                                    <div
                                        key={toy.toyId}
                                        className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100 flex flex-col cursor-pointer animate-fade-in-up"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                        onClick={() => handleProductClick(toy.toyId)}
                                    >
                                        <div className="relative h-48 overflow-hidden bg-gray-50">
                                            <img
                                                src={toy.pictureURL}
                                                alt={toy.toyName}
                                                loading="lazy"
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                            />
                                            {toy.rating >= 4.5 && (
                                                <div className="absolute top-3 right-3 bg-linear-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                                                    Popular
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6 flex flex-col grow">
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
                                                <div className={`text-sm font-semibold px-3 py-1 rounded-lg ${
                                                    toy.availableQuantity > 10 
                                                        ? 'bg-green-100 text-green-700'
                                                        : toy.availableQuantity > 0
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : 'bg-red-100 text-red-700'
                                                }`}>
                                                    {toy.availableQuantity > 10 
                                                        ? 'In Stock'
                                                        : toy.availableQuantity > 0
                                                        ? 'Low Stock'
                                                        : 'Out of Stock'
                                                    }
                                                </div>
                                            </div>

                                            <button
                                                className="w-full bg-linear-to-r from-[#667eea] to-[#764ba2] text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mt-auto"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleProductClick(toy.toyId);
                                                }}
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">No toys found</h3>
                                <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                                <button 
                                    className="bg-gray-100 text-gray-600 px-6 py-3 rounded-xl font-semibold border-2 border-gray-200 transition-all duration-300 hover:bg-gray-200 hover:-translate-y-0.5"
                                    onClick={resetFilters}
                                >
                                    Reset All Filters
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};
export default Shop;