import { useEffect, useState, useCallback } from "react";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProductSubmission from "../../components/ProductSubmission";

export default function ManageProducts() {
    const { role, loading } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [fetching, setFetching] = useState(true);

    const fetchProducts = useCallback(async () => {
        setFetching(true);
        try {
            const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
            const snapshot = await getDocs(q);
            setProducts(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        } catch (e) {
            console.error("Failed to fetch products", e);
        } finally {
            setFetching(false);
        }
    }, []);

    useEffect(() => {
        if (!loading && role !== "admin") navigate("/login");
    }, [loading, role, navigate]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this product?")) return;
        try {
            await deleteDoc(doc(db, "products", id));
            setProducts((prev) => prev.filter((p) => p.id !== id));
        } catch (e) {
            console.error("Delete failed", e);
            alert("Delete failed");
        }
    };

    if (loading) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold">Manage Products</h2>
            <ProductSubmission onAdded={fetchProducts} />
            <div>
                <h3 className="text-xl font-semibold mt-6 mb-3">All Products</h3>
                {fetching ? (
                    <p>Loading products...</p>
                ) : products.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    <div className="grid gap-4">
                        {products.map((product) => (
                            <div key={product.id} className="border p-4 rounded flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded" />
                                    <div>
                                        <h3 className="font-bold">{product.name}</h3>
                                        <p className="text-sm text-gray-600">{product.description}</p>
                                        <p className="text-sm text-gray-500">
                                            Gender: {product.gender} | SubCategory: {product.subCategory} | Status: {product.status} | Price: ${product.price}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => alert("Edit functionality coming soon!")}>
                                        Edit
                                    </button>
                                    <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(product.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}