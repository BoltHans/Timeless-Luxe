import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import ProductCard from "../components/ProductCard";

const MenSection = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const q = query(
                collection(db, "Products"),
                where("status", "==", "approved"),
                where("category", "in", ["Watches", "Wallets"])
            );
            const querySnapshot = await getDocs(q);
            setProducts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        };
        fetchProducts();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
            {products.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    );
};

export default MenSection;
