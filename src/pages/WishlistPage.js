import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWishlist = async () => {
            if (!auth.currentUser ) {
                navigate("/login"); // Redirect to login if not logged in
                return;
            }
            const wishlistRef = collection(db, "users", auth.currentUser .uid, "wishlist");
            const querySnapshot = await getDocs(wishlistRef);
            setWishlist(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        };

        fetchWishlist();
    }, [navigate]);

    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlist.map((item) => (
                <ProductCard key={item.id} product={item} />
            ))}
        </div>
    );
};

export default WishlistPage;
