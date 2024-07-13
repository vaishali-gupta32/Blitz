import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect } from "react";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const HomePageProductCard = () => {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { loading, getAllProduct } = context;
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    // add to cart function
    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    }

    // delete from cart function
    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Deleted from cart");
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <div className="mt-10">
            {/* Heading */}
            <div>
                <h1 className="text-center mb-5 text-3xl font-bold text-gray-800">Bestselling Products</h1>
            </div>

            {/* Main Section */}
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-5 mx-auto">
                    <div className="flex justify-center">
                        {loading && <Loader />}
                    </div>
                    {/* Products Grid */}
                    <div className="flex flex-wrap -m-4">
                        {getAllProduct.slice(0, 8).map((item, index) => {
                            const { id, title, price, productImageUrl } = item;
                            return (
                                <div key={index} className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                                    <div className="h-full border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer">
                                        <img
                                            onClick={() => navigate(`/productinfo/${id}`)}
                                            className="lg:h-80 h-64 w-full object-cover rounded-t-2xl transition-transform duration-300 ease-in-out hover:scale-105"
                                            src={productImageUrl}
                                            alt={title}
                                        />
                                        <div className="p-6 bg-white">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                E-Commerce
                                            </h2>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3 line-clamp-2">
                                                {title}
                                            </h1>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                ₹{price}
                                            </h1>
                                            <div className="flex justify-center">
                                                {cartItems.some((p) => p.id === item.id)
                                                    ? (
                                                        <button
                                                            onClick={() => deleteCart(item)}
                                                            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-bold transition-colors duration-300 ease-in-out w-full">
                                                            Delete From Cart
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => addCart(item)}
                                                            className="bg-gradient-to-r from-[#8379CD] to-[blue] hover:from-orange-500 hover:to-pink-500 text-white py-2 px-4 rounded-lg font-bold transition-all duration-300 ease-in-out w-full">
                                                            Add To Cart
                                                        </button>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePageProductCard;
