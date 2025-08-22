import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc } from "firebase/firestore";
import { auth } from "../firebase"; // Import auth for current user state

const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const [user, setUser ] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const snap = await getDocs(collection(db, "categories"));
            setCategories(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser ) => {
            if (currentUser ) {
                const userRef = doc(db, "users", currentUser .uid);
                const userDoc = await getDocs(userRef);
                setUser ({ uid: userDoc.id, ...userDoc.data() });
            } else {
                setUser (null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await auth.signOut();
        setUser (null);
    };

    return (
        <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">👜 LuxeStore</Link>
            <div className="flex gap-4">
                <Link to="/">Home</Link>
                <Link to="/women">Women's Collection</Link>
                <Link to="/men">Men's Collection</Link>
                {user && <Link to="/wishlist">Wishlist</Link>} {/* Only show to logged-in users */}
                <Link to="/contact">Contact Us</Link>
                {categories.map(cat => (
                    <Link key={cat.id} to={`/category/${cat.id}`}>{cat.name}</Link>
                ))}
            </div>
            <div className="flex gap-4">
                {!user ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                ) : (
                    <>
                        {user.role === "admin" && (
                            <>
                                <Link to="/admin">Admin Dashboard</Link>
                                <Link to="/admin/manage-users">Manage Users</Link>
                                <Link to="/admin/manage-products">Manage Products</Link>
                            </>
                        )}
                        <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
