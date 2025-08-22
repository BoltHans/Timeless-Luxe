import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            const snap = await getDocs(collection(db, "categories"));
            setCategories(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                const userRef = doc(db, "users", currentUser.uid);
                const userDoc = await getDoc(userRef);
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
        <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-2xl font-bold tracking-wide bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent"
                    >
                        <div className="w-10 h-10 bg-gradient-to-tr from-gray-200 to-gray-400 rounded-lg flex items-center justify-center shadow-inner">
                            <span className="text-white">✨</span>
                        </div>
                        <span>Timeless Luxe</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        <Link to="/" className="hover:text-gray-800 transition">Home</Link>
                        <Link to="/women" className="hover:text-gray-800 transition">Women</Link>
                        <Link to="/men" className="hover:text-gray-800 transition">Men</Link>
                        {user && (
                            <Link to="/wishlist" className="hover:text-gray-800 transition">Wishlist</Link>
                        )}
                        <Link to="/contact" className="hover:text-gray-800 transition">Contact</Link>

                        {categories.length > 0 && (
                            <div className="relative group">
                                <button className="flex items-center hover:text-gray-800 transition">
                                    Categories
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                                    </svg>
                                </button>
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                    {categories.map((cat) => (
                                        <Link
                                            key={cat.id}
                                            to={`/category/${cat.id}`}
                                            className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                                        >
                                            {cat.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Actions */}
                    <div className="hidden lg:flex items-center gap-4">
                        {!user ? (
                            <>
                                <Link
                                    to="/login"
                                    className="px-4 py-2 rounded-xl border border-gray-300 hover:border-gray-500 transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-gray-500 to-gray-700 text-white hover:shadow-md transition"
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                {user.role === "admin" && (
                                    <Link
                                        to="/admin"
                                        className="px-4 py-2 rounded-xl border border-gray-300 hover:border-gray-500 transition"
                                    >
                                        Admin
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white transition"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 rounded-md border border-gray-300"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-gray-200">
                        <div className="flex flex-col gap-2">
                            <Link to="/" className="text-gray-700 hover:text-black">Home</Link>
                            <Link to="/women" className="text-gray-700 hover:text-black">Women</Link>
                            <Link to="/men" className="text-gray-700 hover:text-black">Men</Link>
                            {user && <Link to="/wishlist" className="text-gray-700 hover:text-black">Wishlist</Link>}
                            <Link to="/contact" className="text-gray-700 hover:text-black">Contact</Link>

                            {categories.map((cat) => (
                                <Link
                                    key={cat.id}
                                    to={`/category/${cat.id}`}
                                    className="pl-4 text-gray-600 hover:text-black"
                                >
                                    {cat.name}
                                </Link>
                            ))}

                            <div className="pt-4 border-t border-gray-200">
                                {!user ? (
                                    <>
                                        <Link to="/login" className="text-gray-700 hover:text-black">Login</Link>
                                        <Link to="/register" className="text-gray-700 hover:text-black">Register</Link>
                                    </>
                                ) : (
                                    <>
                                        {user.role === "admin" && (
                                            <Link to="/admin" className="text-gray-700 hover:text-black">
                                                Admin Dashboard
                                            </Link>
                                        )}
                                        <button
                                            onClick={handleLogout}
                                            className="text-left w-full text-gray-700 hover:text-black"
                                        >
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