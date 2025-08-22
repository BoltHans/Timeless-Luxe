import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import ProductCard from "../components/ProductCard";

export default function WomenSection() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchWomen = async () => {
            try {
                const q = query(collection(db, "products"), where("gender", "==", "women"));
                const snap = await getDocs(q);
                const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
                const filtered = items.filter((p) => p.status === "active");
                setProducts(filtered);
            } catch (e) {
                console.error("WomenSection fetch failed:", e);
            }
        };
        fetchWomen();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
            {products.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    );
}