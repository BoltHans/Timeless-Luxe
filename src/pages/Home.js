import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>
                <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg')] bg-cover bg-center opacity-10"></div>
                
                <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
                    <h1 className="text-6xl md:text-8xl font-bold text-gradient mb-6 leading-tight">
                        Timeless
                        <br />
                        <span className="text-gray-600">Elegance</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Discover luxury accessories that define sophistication. 
                        Curated collections for the discerning individual.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/women" className="btn-primary text-lg px-8 py-4">
                            Shop Women's Collection
                        </Link>
                        <Link to="/men" className="btn-secondary text-lg px-8 py-4">
                            Shop Men's Collection
                        </Link>
                    </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-silver rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-silver rounded-full opacity-10 animate-pulse delay-1000"></div>
            </section>

            {/* Featured Categories */}
            <section className="py-20 bg-white">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                            Featured Collections
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Explore our carefully curated selection of premium accessories
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Women's Collection Card */}
                        <Link to="/women" className="group">
                            <div className="card hover-lift overflow-hidden">
                                <div className="relative h-80">
                                    <img 
                                        src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg" 
                                        alt="Women's Collection"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <h3 className="text-2xl font-bold mb-2">Women's Collection</h3>
                                        <p className="text-gray-200">Elegant bags, jewelry & accessories</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        
                        {/* Men's Collection Card */}
                        <Link to="/men" className="group">
                            <div className="card hover-lift overflow-hidden">
                                <div className="relative h-80">
                                    <img 
                                        src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg" 
                                        alt="Men's Collection"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <h3 className="text-2xl font-bold mb-2">Men's Collection</h3>
                                        <p className="text-gray-200">Sophisticated watches, wallets & more</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gradient mb-4">Why Choose Timeless Luxe</h2>
                        <p className="text-xl text-gray-600">Excellence in every detail</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center group">
                            <div className="w-16 h-16 bg-gradient-silver rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
                            <p className="text-gray-600">Handcrafted with the finest materials and attention to detail</p>
                        </div>
                        
                        <div className="text-center group">
                            <div className="w-16 h-16 bg-gradient-silver rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Timeless Design</h3>
                            <p className="text-gray-600">Classic styles that transcend trends and seasons</p>
                        </div>
                        
                        <div className="text-center group">
                            <div className="w-16 h-16 bg-gradient-silver rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Customer Care</h3>
                            <p className="text-gray-600">Exceptional service and support for every customer</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 bg-white">
                <div className="container">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-gradient mb-4">Stay in Touch</h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Be the first to know about new collections and exclusive offers
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input 
                                type="email" 
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-silver"
                            />
                            <button className="btn-primary px-6 py-3">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
