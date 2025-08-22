import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddCategory = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Simulate image upload with placeholder
            const bannerUrl = image
                ? "https://picsum.photos/600/300?random=" + Math.floor(Math.random() * 1000)
                : "";

            await addDoc(collection(db, "Categories"), {
                name,
                description,
                bannerUrl,
            });

            setName("");
            setDescription("");
            setImage(null);
            alert("Category added successfully (simulated image)!");
        } catch (error) {
            console.error("Error adding category: ", error);
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Add New Category (Dev Mode)</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full"
                />
                <button
                    type="submit"
                    className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
                >
                    Add Category
                </button>
            </form>
        </div>
    );
};

export default AddCategory;