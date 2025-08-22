import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const ProductList = ({ categoryId }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            let q = collection(db, "Products");
            if (categoryId) q = query(q, where("categoryId", "==", categoryId));
            const snap = await getDocs(q);
            setProducts(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        };
        fetchProducts();
    }, [categoryId]);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((p) => (
                <div key={p.id} className="border p-3 rounded-2xl shadow hover:shadow-lg">
                    <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-full h-56 object-cover rounded-xl"
                    />
                    <h3 className="mt-2 font-bold text-lg">{p.title}</h3>
                    <p className="text-gray-500">${p.price}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
