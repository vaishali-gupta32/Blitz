import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
import Loader from "../../components/loader/Loader";
import { storage } from "../../firebase/FirebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const categoryList = [
    { name: 'Mens' },
    { name: 'Womens' },
    
    { name: 'Accessories' },
    { name: 'Merch' }
];

const AddProductPage = () => {
    const { loading, setLoading } = useContext(myContext);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        category: "",
        description: "",
        quantity: 1,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric"
        })
    });

    const addProductFunction = async () => {
        if (!product.title || !product.price || !product.category || !product.description) {
            return toast.error("All fields are required");
        }

        if (!image && !imageUrl) {
            return toast.error("Please upload an image or provide an image URL");
        }

        setLoading(true);

        try {
            let downloadURL = imageUrl;

            if (image) {
                const imgRef = ref(storage, `images/${image.name}`);
                const uploadTask = uploadBytesResumable(imgRef, image);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // Optional: Can implement a progress indicator here
                    },
                    (error) => {
                        console.error(error);
                        toast.error("Failed to upload image");
                        setLoading(false);
                    },
                    async () => {
                        downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        await addProductToFirestore(downloadURL);
                    }
                );
            } else {
                await addProductToFirestore(downloadURL);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to add product");
            setLoading(false);
        }
    };

    const addProductToFirestore = async (downloadURL) => {
        const productRef = collection(fireDB, "products");
        await addDoc(productRef, { ...product, productImageUrl: downloadURL });
        toast.success("Product added successfully");
        navigate("/admin-dashboard");
        setLoading(false);
    };

    const cancelUpdate = () => {
        navigate("/admin-dashboard");
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-pink-100 px-4 py-10">
            {loading && <Loader />}
            <div className="bg-white px-8 py-10 border border-gray-200 rounded-xl shadow-md w-full max-w-lg m-2">
                <div className="mb-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-700">Add Product</h2>
                </div>

                <div className="space-y-6">
                    <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={(e) => setProduct({ ...product, title: e.target.value })}
                        placeholder="Product Title"
                        className="w-full px-4 py-2  border-2 border-gray-400 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />

                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        placeholder="Product Price"
                        className="w-full px-4 py-2 border-2 border-gray-400 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />

                    <div className="flex items-center justify-between">
                        <div className="w-full">
                            <input
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="w-full px-4 py-2 border-2 border-gray-400 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                        </div>
                        <span className="px-2 text-gray-600">OR</span>
                        <div className="w-full">
                            <input
                                type="text"
                                name="imageUrl"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="Enter Image URL"
                                className="w-full px-4 py-2 border-2 border-gray-400 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                        </div>
                    </div>

                    <select
                        value={product.category}
                        onChange={(e) => setProduct({ ...product, category: e.target.value })}
                        className="w-full px-4 py-2 border-2 border-gray-400 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                        <option value="" disabled>Select Product Category</option>
                        {categoryList.map((value, index) => (
                            <option key={index} value={value.name}>{value.name}</option>
                        ))}
                    </select>

                    <textarea
                        name="description"
                        value={product.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        placeholder="Product Description"
                        rows="5"
                        className="w-full px-4 py-2 border-2 border-gray-400 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />

                    <div className="flex space-x-4">
                        <button
                            onClick={cancelUpdate}
                            type="button"
                            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-md text-lg font-bold transition-colors"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={addProductFunction}
                            type="button"
                            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md text-lg font-bold transition-colors"
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProductPage;
