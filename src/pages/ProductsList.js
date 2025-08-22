import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const productsRef = collection(db, "products");
            const snap = await getDocs(productsRef);
            setProducts(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        };
        fetchProducts();
    }, []);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((p) => (
                <div key={p.id} className="border p-3 rounded-2xl shadow hover:shadow-lg">
                    <img
                        src={p.imageUrl} // Display the image URL
                        alt={p.name}
                        className="w-full h-56 object-cover rounded-xl"
                    />
                    <h3 className="mt-2 font-bold text-lg">{p.name}</h3>
                    <p className="text-gray-500">${p.price}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
