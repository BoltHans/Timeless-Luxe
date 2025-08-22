import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

const HomePage = () => {
    return (
        <div>
            <div className="bg-gray-100 p-6">
                <h2 className="text-3xl font-bold mb-4">Welcome to Timeless Luxe</h2>
                <SearchBar />
                <CategoryFilter />
            </div>
        </div>
    );
};

export default HomePage;
