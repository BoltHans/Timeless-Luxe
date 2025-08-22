import { useState } from "react";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    return (
        <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-2 w-full"
        />
    );
};

export default SearchBar;
