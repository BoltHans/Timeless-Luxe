import React from "react";
import { useCategories } from "../hooks/useCategories";

const CategoryFilter = ({ onSelect }) => {
    const categories = useCategories();

    return (
        <div className="flex gap-2 flex-wrap my-4">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onSelect(cat.id)}
                    className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-300"
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
