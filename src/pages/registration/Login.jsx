import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { collection, getDocs, query, where } from "firebase/firestore";
import Googleauthpage from "./Googleauthpage";

const Login = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const navigate = useNavigate();

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    const userLoginFunction = async (e) => {
        e.preventDefault();
        if (!userLogin.email.trim() || !userLogin.password.trim()) {
            toast.error("All Fields are required");
            return;
        }
    
        setLoading(true);
        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
            console.log('Login Successful:', users);
    
            const q = query(
                collection(fireDB, "user"),
                where('uid', '==', users.user.uid)
            );
            const querySnapshot = await getDocs(q);
            let user;
            querySnapshot.forEach((doc) => {
                user = doc.data();
            });
    
            if (!user) {
                toast.error("User not found");
                setLoading(false);
                return;
            }
    
    
            localStorage.setItem("users", JSON.stringify(user));
            console.log('User stored in localStorage:', localStorage.getItem("users"));
            setUserLogin({
                email: "",
                password: ""
            });
            toast.success("Login Successfully");

    
            // Log the user role
            const userRole = user.role.toLowerCase();
            console.log(userRole);
    
            if (userRole === "user") {            
                    console.log("Navigating to Home page");
                navigate('/');
            } else if (userRole === "admin") {
                console.log("Navigating to admin dashboard");
                navigate('/admin-dashboard');
            } else {
                toast.error("Invalid role");
            }
        } catch (error) {
            console.error('Login Failed:', error);
            toast.error("Login Failed");
        } finally {
            setLoading(false);
        }
    };
    
    

    return (
        <div className='flex justify-center items-center min-h-screen bg-[#EAEBFF]'>
            {loading && <Loader />}
            <div className="login_Form bg-white px-8 py-6 border border-pink-100 rounded-xl shadow-md w-full max-w-md m-4 relative">
                <Link to="/" className="absolute top-0 left-0 p-4">
                    <svg className="w-6 h-6 text-[#433B58]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-[#433B58]'>Login</h2>
                </div>

                <form onSubmit={userLoginFunction}>
                    <div className="mb-3">
                        <input
                            type="email"
                            name="email"
                            placeholder='Email Address'
                            value={userLogin.email}
                            onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
                            className='bg-[#EAEBFF] border border-pink-200 px-4 py-2 w-full rounded-md outline-none placeholder-gray-500'
                            autoComplete="email"
                        />
                    </div>

                    <div className="mb-5">
                        <input
                            type="password"
                            name="password"
                            placeholder='Password'
                            value={userLogin.password}
                            onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
                            className='bg-[#EAEBFF] border border-pink-200 px-4 py-2 w-full rounded-md outline-none placeholder-gray-500'
                            autoComplete="current-password"
                        />
                    </div>

                    <div className="mb-5">
                        <button
                            type='submit'
                            className='bg-[#6A5889] hover:bg-[#433B58] w-full text-white text-center py-2 font-bold rounded-md'
                        >
                            Login
                        </button>
                    </div>
                </form>
                
                <h2 className="text-gray-700 font-extrabold flex justify-center">OR</h2>
                
                <div className="mb-5">
                    <Googleauthpage />
                </div>

                <div className="m-1">
                    <h2 className='text-black font-bold flex justify-center'>Don't Have an account? <Link className='text-[#6A5889]  mx-2 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    );
};

export default Login;
