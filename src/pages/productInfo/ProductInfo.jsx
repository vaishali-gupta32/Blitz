import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { useParams, Navigate } from "react-router-dom";
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

// ProductInfo component
const ProductInfo = () => {
    // State and context variables
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    // Function to fetch product data
    const getProductData = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id));
            if (productTemp.exists()) {
                setProduct({ ...productTemp.data(), id: productTemp.id });
            } else {
                console.log("Product not found");
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // Redux state and dispatch
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    // Function to add item to cart
    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    };

    // Function to delete item from cart
    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Removed from cart");
    };

    // User
    const user = JSON.parse(localStorage.getItem('users'));

    // Effect hook to update local storage with cart items
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Effect hook to fetch product data on component mount
    useEffect(() => {
        getProductData();
    }, []);

    // Render JSX
    return (
        <Layout>
            <section className="py-5 lg:py-16 font-poppins dark:bg-white">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    <div className="max-w-6xl px-4 mx-auto">
                        <div className="flex flex-wrap mb-10 -mx-4">
                            <div className="w-full md:w-1/2 px-4 mb-8">
                                <div className="">
                                    <img
                                        className="w-full rounded-lg"
                                        src={product?.productImageUrl}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 px-4">
                                <div className="lg:pl-10">
                                    <h2 className="text-3xl font-semibold mb-4 text-black dark:text-bl-300">
                                        {product?.title}
                                    </h2>
                                    <div className="flex items-center mb-4">
                                        <p className="mr-2 text-yellow-500">
                                            ★ ★ ★ ★ ★
                                        </p>
                                        
                                    </div>
                                    <p className="text-xl font-semibold mb-4 text-black dark:text-gray-800">
                                        ₹ {product?.price}
                                    </p>
                                    <p className="mb-6 text-black dark:text-gray-800">
                                        {product?.description}
                                    </p>
                                    <div className="flex mb-4">
                                        <button
                                            onClick={() => addCart(product)}
                                            className="w-full mr-2 px-4 py-3 text-center text-white bg-pink-600 border border-pink-600 hover:bg-pink-700 rounded-xl"
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            onClick={() => deleteCart(product)}
                                            className="w-full px-4 py-3 text-center text-white bg-pink-600 border border-red-500 hover:bg-gray-600 rounded-xl"
                                        >
                                            Remove from Cart
                                        </button>
                                    </div>
            
                                    <div className="mt-4">
                                        
                                        <p className="text-sm text-gray-600">
                                            Cash on Delivery available
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </Layout>
    );
};

export default ProductInfo;
