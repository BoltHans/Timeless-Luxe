import React, { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc } from "firebase/firestore";
import { auth } from "../firebase";

const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            const snap = await getDocs(collection(db, "categories"));
            setCategories(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                const userRef = doc(db, "users", currentUser.uid);
                const userDoc = await getDocs(userRef);
                setUser({ uid: userDoc.id, ...userDoc.data() });
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await auth.signOut();
        setUser(null);
    };

    return (
        <nav className="sticky top-0 z-50 glass-effect border-b border-white/20">
            <div className="container">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-gradient">
                        <div className="w-10 h-10 bg-gradient-silver rounded-lg flex items-center justify-center">
                            <span className="text-white">✨</span>
                        </div>
                        <span>Timeless Luxe</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/women" className="nav-link">Women's Collection</Link>
                        <Link to="/men" className="nav-link">Men's Collection</Link>
                        {user && <Link to="/wishlist" className="nav-link">Wishlist</Link>}
                        <Link to="/contact" className="nav-link">Contact</Link>
                        
                        {/* Categories Dropdown */}
                        {categories.length > 0 && (
                            <div className="relative group">
                                <button className="nav-link flex items-center">
                                    Categories
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                    {categories.map(cat => (
                                        <Link 
                                            key={cat.id} 
                                            to={`/category/${cat.id}`}
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                                        >
                                            {cat.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Actions */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {!user ? (
                            <>
                                <Link to="/login" className="btn-secondary">Login</Link>
                                <Link to="/register" className="btn-primary">Register</Link>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                {user.role === "admin" && (
                                    <div className="relative group">
                                        <button className="nav-link flex items-center">
                                            Admin
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                            <Link to="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 first:rounded-t-lg">Dashboard</Link>
                                            <Link to="/admin/manage-users" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Manage Users</Link>
                                            <Link to="/admin/manage-products" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 last:rounded-b-lg">Manage Products</Link>
                                        </div>
                                    </div>
                                )}
                                <button 
                                    onClick={handleLogout} 
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className="lg:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-white/20">
                        <div className="flex flex-col space-y-2">
                            <Link to="/" className="mobile-nav-link">Home</Link>
                            <Link to="/women" className="mobile-nav-link">Women's Collection</Link>
                            <Link to="/men" className="mobile-nav-link">Men's Collection</Link>
                            {user && <Link to="/wishlist" className="mobile-nav-link">Wishlist</Link>}
                            <Link to="/contact" className="mobile-nav-link">Contact</Link>
                            
                            {categories.map(cat => (
                                <Link key={cat.id} to={`/category/${cat.id}`} className="mobile-nav-link pl-4">
                                    {cat.name}
                                </Link>
                            ))}
                            
                            <div className="pt-4 border-t border-white/20">
                                {!user ? (
                                    <>
                                        <Link to="/login" className="mobile-nav-link">Login</Link>
                                        <Link to="/register" className="mobile-nav-link">Register</Link>
                                    </>
                                ) : (
                                    <>
                                        {user.role === "admin" && (
                                            <>
                                                <Link to="/admin" className="mobile-nav-link">Admin Dashboard</Link>
                                                <Link to="/admin/manage-users" className="mobile-nav-link">Manage Users</Link>
                                                <Link to="/admin/manage-products" className="mobile-nav-link">Manage Products</Link>
                                            </>
                                        )}
                                        <button onClick={handleLogout} className="mobile-nav-link text-left w-full">
                                            Logout
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
