import { useEffect, useState } from 'react';
import MyContext from './myContext';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDB, auth } from '../firebase/FirebaseConfig';
import toast from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';

function MyState({ children }) {
    const [loading, setLoading] = useState(false);
    const [getAllProduct, setGetAllProduct] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [getAllOrder, setGetAllOrder] = useState([]);
    const [getAllUser, setGetAllUser] = useState([]);

    const getAllProductFunction = () => {
        setLoading(true);
        try {
            const q = query(collection(fireDB, "products"), orderBy('time'));
            const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
                const productArray = QuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setGetAllProduct(productArray);
                setLoading(false);
            });
            return unsubscribe;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const getAllOrderFunction = () => {
        setLoading(true);
        try {
            const q = query(collection(fireDB, "order"), orderBy('time'));
            const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
                const orderArray = QuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                console.log("Fetched Orders:", orderArray);
                setGetAllOrder(orderArray);
                setLoading(false);
            });
            return unsubscribe;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const getAllUserFunction = () => {
        setLoading(true);
        try {
            const q = query(collection(fireDB, "user"), orderBy('time'));
            const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
                const userArray = QuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setGetAllUser(userArray);
                setLoading(false);
            });
            return unsubscribe;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const productUnsubscribe = getAllProductFunction();
        const orderUnsubscribe = getAllOrderFunction();
        const userUnsubscribe = getAllUserFunction();

        const authUnsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const storedUser = JSON.parse(localStorage.getItem("users"));
                setCurrentUser(storedUser);
            } else {
                setCurrentUser(null);
            }
        });

        return () => {
            productUnsubscribe();
            orderUnsubscribe();
            userUnsubscribe();
            authUnsubscribe();
        };
    }, []);

    const orderDelete = async (id) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'order', id));
            toast.success('Order Deleted successfully');
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const cancelOrder = async (id) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'order', id));
            toast.success('Order Deleted successfully');
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <MyContext.Provider value={{
            loading,
            setLoading,
            getAllProduct,
            getAllOrder,
            orderDelete,
            cancelOrder,
            getAllUser,
            currentUser,
            setCurrentUser,
            getAllProductFunction // Ensure this is included in the context value
        }}>
            {children}
        </MyContext.Provider>
    );
}

export default MyState;
