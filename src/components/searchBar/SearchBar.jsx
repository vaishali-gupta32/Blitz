import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import myContext from "../../context/myContext";

const SearchBar = () => {
    const context = useContext(myContext);
    const { getAllProduct } = context
    const navigate = useNavigate();

    // Search State 
    const [search, setSearch] = useState("");

    // Filtered Search Data
    const filteredProducts = getAllProduct.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleProductClick = (productId) => {

        navigate(`/productinfo/${productId}`);
        //reloads windows
        window.location.reload();

    };

    return (
        <div className="relative">
            {/* Search input */}
            <input
                type="text"
                placeholder='Search Product'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='bg-gray-100  rounded-lg px-3 py-2 w-full outline-none text-black focus:ring-2 focus:ring-blue-500'
            />

            {/* Search drop-down */}
            {search && (
                <div className="absolute top-full left-0 right-0 bg-gray-200 shadow-md rounded-lg mt-1">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.slice(0, 4).map((product, index) => (
                            <div key={index} className="px-4 py-3 cursor-pointer hover:bg-gray-300" onClick={() => handleProductClick(product.id)}>
                                <div className="flex items-center space-x-2">
                                    <img className="w-10" src={product.productImageUrl} alt="" />
                                    <span>{product.title}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex justify-center py-3">
                            <img className="w-12" src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png" alt="img" />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
