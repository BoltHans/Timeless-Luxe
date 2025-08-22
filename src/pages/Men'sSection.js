import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import ProductCard from "../components/ProductCard";

export default function MenSection() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchMen = async () => {
            try {
                const q = query(collection(db, "products"), where("gender", "==", "men"));
                const snap = await getDocs(q);
                const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
                const filtered = items.filter((p) => p.status === "active");
                setProducts(filtered);
            } catch (e) {
                console.error("MenSection fetch failed:", e);
            }
        };
        fetchMen();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
            {products.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    );
}