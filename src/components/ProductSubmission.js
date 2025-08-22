import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const placeholderImg = "https://via.placeholder.com/600x600?text=Timeless+Luxe";

export default function ProductSubmission({ onAdded }) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        gender: "women",
        subCategory: "Bags",
        status: "active",
        imageUrl: "",
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const priceNum = Number(formData.price);
        if (!formData.name || !formData.description || Number.isNaN(priceNum) || priceNum <= 0) {
            setError("Please fill all fields and use a positive price.");
            return;
        }

        setSaving(true);
        try {
            await addDoc(collection(db, "products"), {
                name: formData.name,
                description: formData.description,
                price: priceNum,
                gender: formData.gender,
                subCategory: formData.subCategory,
                status: formData.status,
                imageUrl: formData.imageUrl?.trim() || placeholderImg,
                createdAt: serverTimestamp(),
            });
            if (onAdded) onAdded();
            alert("Product added successfully");
            setFormData({
                name: "",
                description: "",
                price: "",
                gender: "women",
                subCategory: "Bags",
                status: "active",
                imageUrl: "",
            });
        } catch (err) {
            console.error("Error adding product:", err);
            setError(err.message || "Failed to add product.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-3">Add New Product</h2>
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="border p-2 w-full md:col-span-2" required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 w-full md:col-span-2" required />
                <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="border p-2 w-full" required />
                <select name="gender" value={formData.gender} onChange={handleChange} className="border p-2 w-full">
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                </select>
                <select name="subCategory" value={formData.subCategory} onChange={handleChange} className="border p-2 w-full">
                    <option value="Bags">Bags</option>
                    <option value="Wallets">Wallets</option>
                    <option value="Watches">Watches</option>
                    <option value="Jewelry">Jewelry</option>
                </select>
                <select name="status" value={formData.status} onChange={handleChange} className="border p-2 w-full">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <input name="imageUrl" placeholder="Image URL (optional)" value={formData.imageUrl} onChange={handleChange} className="border p-2 w-full md:col-span-2" />
                <button type="submit" disabled={saving} className="bg-black text-white px-4 py-2 rounded md:col-span-2">
                    {saving ? "Saving..." : "Submit Product"}
                </button>
            </form>
        </div>
    );
}