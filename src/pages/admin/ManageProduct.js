import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function ManageProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const snapshot = await getDocs(collection(db, "products"));
            setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            await deleteDoc(doc(db, "products", id));
            setProducts(products.filter((p) => p.id !== id));
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Manage Products</h2>
            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="grid gap-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="border p-4 rounded flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-bold">{product.name}</h3>
                                <p>{product.description}</p>
                                <p className="text-sm text-gray-500">
                                    Category: {product.category} | Price: ${product.price}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                    onClick={() => alert("Edit functionality coming soon!")}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

