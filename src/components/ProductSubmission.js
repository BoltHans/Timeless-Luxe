import { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ProductSubmission = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        status: "active",
    });

    const [image, setImage] = useState<File | null>(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file instanceof File) {
            setImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let imageUrl = "";
            if (image) {
                const storageRef = ref(storage, `products/${Date.now()}-${image.name}`);
                await uploadBytes(storageRef, image);
                imageUrl = await getDownloadURL(storageRef);
            }

            const productsRef = collection(db, "products");

            await addDoc(productsRef, {
                ...formData,
                price: parseFloat(formData.price),
                imageUrl,
            });

            alert("✅ Product added successfully!");
            setFormData({
                name: "",
                description: "",
                price: "",
                category: "",
                status: "active",
            });
            setImage(null);
        } catch (error) {
            console.error("❌ Error adding product:", error);
            alert("Failed to add product.");
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="border p-2 w-full"
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                <input type="file" onChange={handleImageChange} className="w-full" />

                <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded w-full"
                >
                    Submit Product
                </button>
            </form>
        </div>
    );
};

export default ProductSubmission;
