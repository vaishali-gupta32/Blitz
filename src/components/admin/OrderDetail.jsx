import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";

const OrderDetail = () => {
    const context = useContext(myContext);
    const { getAllOrder, orderDelete } = context;

    useEffect(() => {
        console.log("Context Orders:", getAllOrder);
    }, [getAllOrder]);

    return (
        <div>
            <div className="py-5">
                <h1 className="text-xl text-pink-300 font-bold">All Orders</h1>
            </div>
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
                    <tbody>
                        <tr>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">S.No.</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">Order Id</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">Image</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">Title</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">Category</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">Price</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">Quantity</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">Total Price</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">Status</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">Name</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">Address</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">Pincode</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">Phone Number</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">Email</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">Date</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">Action</th>
                        </tr>
                        {getAllOrder.map((order, orderIndex) => (
                            order.cartItems.map((item, itemIndex) => {
                                const { id, productImageUrl, title, category, price, quantity } = item;
                                return (
                                    <tr key={`${order.id}-${item.id}`} className="text-pink-300">
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">{orderIndex + 1}.{itemIndex + 1}</td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">{id}</td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500"><img src={productImageUrl} alt="Product" /></td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">{title}</td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">{category}</td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">₹{price}</td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">{quantity}</td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">₹{price * quantity}</td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">{order.status}</td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">{order.addressInfo.name}</td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">{order.addressInfo.address}</td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">{order.addressInfo.pincode}</td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">{order.addressInfo.mobileNumber}</td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">{order.email}</td>
                                        <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">{order.date}</td>
                                        <td onClick={() => orderDelete(order.id)} className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-red-500 cursor-pointer">Delete</td>
                                    </tr>
                                );
                            })
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDetail;
