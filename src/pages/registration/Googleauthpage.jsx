import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { collection, getDocs, query, where, addDoc, Timestamp } from 'firebase/firestore';
import signingoogle from '../../assets/signingoogle.png'; // Adjust the import path according to your project structure

const Googleauthpage = () => {
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
            const user = result.user;
    
            const userRef = collection(fireDB, "user");
            const q = query(userRef, where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);
    
            let userData = null;
            querySnapshot.forEach((doc) => {
                userData = doc.data();
            });
    
            if (!userData) {
                // New user, add to Firestore
                const newUser = {
                    name: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    role: "user", // default role
                    time: Timestamp.now(),
                    date: new Date().toLocaleString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric"
                    }),
                };
                await addDoc(userRef, newUser);
                userData = newUser;
            }
    
            localStorage.setItem("users", JSON.stringify(userData));
            toast.success(`Welcome ${user.displayName}!`);
    
            const userRole = userData.role.toLowerCase();
            if (userRole === "user") {
                navigate('/');
            } else if (userRole === "admin") {
                navigate('/admin-dashboard');
            } else {
                toast.error("Invalid role");
            }
        } catch (error) {
            toast.error(`Authentication failed: ${error.message}`);
        }
    };
    

    return (
        <div onClick={handleGoogleLogin} className="cursor-pointer flex justify-center">
            <img 
                src={signingoogle} 
                alt="Sign in with Google" 
                style={{ width: 250, height: 100 }} 
            />
        </div>
    );
};

export default Googleauthpage;
