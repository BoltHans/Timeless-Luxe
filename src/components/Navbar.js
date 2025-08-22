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
                    <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-wide">
                        <span>Timeless Luxe</span>
                    </Link>
                    {/* Navigation Links */}
                    <div className="hidden lg:flex items-center gap-8">
                        <Link to="/">Home</Link>
                        <Link to="/women">Women</Link>
                        <Link to="/men">Men</Link>
                        {user && <Link to="/wishlist">Wishlist</Link>}
                        <Link to="/contact">Contact</Link>
                    </div>
                    {/* User Actions */}
                    <div className="hidden lg:flex items-center gap-4">
                        {!user ? (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                {user.role === "admin" && <Link to="/admin">Admin</Link>}
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;