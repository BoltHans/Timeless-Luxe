import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import ProductList from "../pages/ProductsList";

const CategoryPage = () => {
    const { id } = useParams();
    const [category, setCategory] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
            const ref = doc(db, "Categories", id);
            const snap = await getDoc(ref);
            if (snap.exists()) setCategory({ id: snap.id, ...snap.data() });
        };
        fetchCategory();
    }, [id]);

    if (!category) return <p>Loading...</p>;

    return (
        <div>
            {/* Hero Banner */}
            <div className="relative w-full h-64 md:h-96">
                <img
                    src={category.bannerUrl}
                    alt={category.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold">{category.name}</h1>
                    <p className="mt-2 max-w-2xl text-center">{category.description}</p>
                </div>
            </div>

            {/* Product Grid */}
            <div className="container mx-auto px-4 py-8">
                <ProductList categoryId={id} />
            </div>
        </div>
    );
};

export default CategoryPage;
