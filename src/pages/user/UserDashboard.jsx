import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import MyContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";

const UserDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const { loading, getAllOrder, orderDelete, cancelOrder } = useContext(MyContext);
    const [profilePhoto, setProfilePhoto] = useState(null);

    useEffect(() => {
        // Fetch profile photo from Google API if available
        if (user?.accessToken) {
            fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch user info from Google API");
                }
                return response.json();
            })
            .then((data) => {
                setProfilePhoto(data.picture);
            })
            .catch((error) => {
                console.error("Error fetching profile photo:", error);
            });
        }
    }, [user]);

    // Function to calculate total amount
    const calculateTotalAmount = (order) => {
        let total = 0;
        order.cartItems.forEach(item => {
            total += parseFloat(item.price) * item.quantity; 
        });
        return total;
    };

    // Function to format order date in day-month-year format
    const formatDate = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000); // Convert Firestore timestamp to JavaScript timestamp
        return date.toLocaleDateString('en-IN'); 
    };

    // Function to handle order cancellation
    const handleCancelOrder = (orderId) => {
        // Call cancelOrder function from context
        cancelOrder(orderId)
            .then(() => {
                console.log(`Order ${orderId} cancelled successfully`);
                // Optionally, update UI or show success message
            })
            .catch((error) => {
                console.error(`Error cancelling order ${orderId}:`, error);
                // Optionally, handle error or display error message
            });
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-5 lg:py-8">
                <div className="bg-white shadow-lg rounded-xl p-4 lg:p-8">
                    {/* Profile Information */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
                        <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
                            <img src={profilePhoto || "https://cdn-icons-png.flaticon.com/128/1144/1144760.png"} alt="Profile" className="w-24 h-24 rounded-full border-4 border-pink-500" />
                            <div className="text-center lg:text-left">
                                <h3 className="text-2xl font-bold">{user?.name}</h3>
                                <p className="text-gray-600">Email: {user?.email}</p>
                                {/*<p className="text-gray-600">Role: {user?.role}</p>*/}
                                <Link to="/Userprofileupdate" className="text-pink-500 hover:underline">Edit Profile</Link>
                            </div>
                        </div>
                    </div>

                    {/* Order Details */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                        <div className="space-y-8">
                            {loading ? <Loader /> : (
                                getAllOrder.filter((obj) => obj.userid === user?.uid).map((order, index) => (
                                    <div key={index} className="bg-gray-100 rounded-xl p-4 lg:p-6">
                                        <h3 className="text-xl font-bold mb-4">Order #{order.id}</h3>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                            <div>
                                                {order.cartItems.map((item, idx) => (
                                                    <div key={idx} className="flex items-center space-y-2 border-b pb-4 last:border-b-0">
                                                        <img src={item.productImageUrl} alt={item.title} className="w-16 h-16 rounded-md mb-2 lg:mb-0 lg:mr-2" />
                                                        <div className="text-center lg:text-left">
                                                            <h4 className="text-lg font-semibold">{item.title}</h4>
                                                            <p className="text-gray-600">Category: {item.category}</p>
                                                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                                                        </div>
                                                        <div className="ml-auto">
                                                            <p className="text-gray-700 font-semibold">₹{item.price}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-4 lg:mt-0">
                                                {/* Invoice-like details */}
                                                <div className="flex justify-between mb-2">
                                                    <span className="font-semibold">Order Date:</span>
                                                    <span>{formatDate(order.time)}</span>
                                                </div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="font-semibold">Subtotal:</span>
                                                    <span>₹{calculateTotalAmount(order)}</span>
                                                </div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="font-semibold">Taxes (0.7%):</span>
                                                    <span>₹{Math.round(calculateTotalAmount(order) * 0.007)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-semibold text-xl">Total Amount:</span>
                                                    <span className="text-xl">₹{Math.round(calculateTotalAmount(order) * 1.007)}</span>
                                                </div>
                                                {/* Cancel Order Button */}
                                                <button
                                                    onClick={() => handleCancelOrder(order.id)}
                                                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-600"
                                                >
                                                    Cancel Order
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UserDashboard;
