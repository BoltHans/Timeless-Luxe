export default function ProductCard({ product }) {
    return (
        <div className="border shadow rounded p-4">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-bold">${product.price}</p>
            <button className="bg-black text-white px-4 py-2 mt-2">
                Add to Wishlist
            </button>
        </div>
    );
}