import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWishlist = async () => {
            if (!user) {
                navigate("/login");
                return;
            }

            try {
                const wishlistRef = collection(db, "users", user.uid, "wishlist");
                const querySnapshot = await getDocs(wishlistRef);
                setWishlist(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            }
        };

        fetchWishlist();
    }, [user, navigate]);

    // Calculate total price
    const total = wishlist.reduce((sum, item) => sum + (item.price || 0), 0);

    if (!user) {
        return (
            <div className="p-6 text-center">
                <p className="text-lg">Please log in to view your wishlist.</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {wishlist.map((item) => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>

            {wishlist.length > 0 && (
                <div className="mt-6 p-4 bg-gray-100 rounded">
                    <h3 className="text-xl font-semibold">Total: ${total.toFixed(2)}</h3>
                    <button className="mt-2 bg-black text-white px-4 py-2 rounded">
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
