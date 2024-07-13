import { useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ProductDetail from '../../components/admin/ProductDetail';
import OrderDetail from '../../components/admin/OrderDetail';
import UserDetail from '../../components/admin/UserDetail';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/myContext';
import ErrorBoundary from '../../components/admin/ErrorBoundary';

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users')) || {};
    const context = useContext(myContext);
    const { getAllProduct = [], getAllOrder = [], getAllUser = [] } = context;

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="bg-pink-50 py-5 border border-pink-100 rounded-lg mb-8">
                    <h1 className="text-center text-3xl font-bold text-pink-600">Admin Dashboard</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-pink-50 py-5 border border-pink-100 rounded-lg flex flex-col items-center justify-center">
                        <img className="w-24 h-24 rounded-full mb-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWCMU0GZe9IcSaTfOB9f3yJOXdgeUBVwW5-Q&s" alt="Admin Avatar" />
                        <div>
                            <p className="text-lg font-semibold mb-1"><span className="font-bold">Name: </span>{user.name || 'N/A'}</p>
                            <p className="text-lg font-semibold mb-1"><span className="font-bold">Email: </span>{user.email || 'N/A'}</p>
                            <p className="text-lg font-semibold mb-1"><span className="font-bold">Date: </span>{user.date || 'N/A'}</p>
                            <p className="text-lg font-semibold mb-1"><span className="font-bold">Role: </span>{user.role || 'N/A'}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3 rounded-lg">
                            <h2 className="text-pink-600 text-3xl font-semibold">{getAllProduct.length}</h2>
                            <p className="text-pink-600 font-bold">Total Products</p>
                        </div>

                        <div className="border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3 rounded-lg">
                            <h2 className="text-pink-600 text-3xl font-semibold">{getAllOrder.length}</h2>
                            <p className="text-pink-600 font-bold">Total Orders</p>
                        </div>

                        <div className="border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3 rounded-lg">
                            <h2 className="text-pink-600 text-3xl font-semibold">{getAllUser.length}</h2>
                            <p className="text-pink-600 font-bold">Total Users</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white py-8 px-6 rounded-lg border border-gray-200">
                <ErrorBoundary>

                    <Tabs>
                        <TabList className="flex flex-wrap -m-4 text-center justify-center">
                            <Tab className="p-4 m-1 md:w-1/3 sm:w-1/2 w-full cursor-pointer bg-pink-600 text-white rounded-lg hover:bg-pink-700">
                                Total Products
                            </Tab>
                            <Tab className="p-4 m-1 md:w-1/3 sm:w-1/2 w-full cursor-pointer bg-pink-600 text-white rounded-lg hover:bg-pink-700">
                                Total Orders
                            </Tab>
                            <Tab className="p-4 m-1 md:w-1/3 sm:w-1/2 w-full cursor-pointer bg-pink-600 text-white rounded-lg hover:bg-pink-700">
                                Total Users
                            </Tab>
                        </TabList>

                            <TabPanel>
                                <ProductDetail />
                            </TabPanel>

                            <TabPanel>
                                <OrderDetail />
                            </TabPanel>

                            <TabPanel>
                                <UserDetail />
                            </TabPanel>
                    </Tabs>
                    </ErrorBoundary>

                </div>
            </div>
        </Layout>
    );
}

export default AdminDashboard;