import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../searchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { clearCart } from "../../redux/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faShoppingBag, faBomb } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const user = localStorage.getItem('users');
  let parsedUser = null;

  if (user) {
    try {
      parsedUser = JSON.parse(user);
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    navigate("/");
    toast.success("Logout Success");
    localStorage.removeItem('users');
    dispatch(clearCart());
    localStorage.removeItem('cart');
  };

  const cartItems = useSelector((state) => state.cart);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const navList = (
    <ul className="flex flex-wrap sm:flex-nowrap space-x-4 sm:space-x-4 sm:space-y-0 items-center text-white font-Montserrat font-bold text-lg mx-auto">
      {['Men', 'Women', 'Kids','Accessories','MERCH'].map(category => (
        <li className="hover:text-[#FFFF00] transition duration-300" key={category}>
          <Link to={`/category/${category}`} onClick={() => setIsMobileMenuOpen(false)}>{category}</Link>
        </li>
      ))}
    </ul>
  );

  return (
    <nav className="bg-[#433B58] shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="mr-5">
          <Link to={'/'} className="flex items-center">
            <img src="/b2.png" alt="Brand Logo" className="h-8 lg:h-10 ml-1 lg:ml-0" />
          </Link>
        </div>
        <div className="hidden lg:flex items-center justify-center">
          {navList}
        </div>
        <div className="flex items-center ml-auto space-x-6">
          <div className="hidden lg:block">
            <SearchBar />
          </div>
          <div className="flex items-center">
          <Link to={'/cart'} className="text-white hover:text-gray-300 transition duration-300">
            <FontAwesomeIcon icon={faShoppingBag} className="h-6 w-6" />
          </Link>
          <span className="ml-1 text-white">({cartItems.length})</span>
          </div>
          <div className="flex items-center text-white">
          <Link to={'/explore'} className="text-white hover:text-gray-300 transition duration-300">
            <FontAwesomeIcon icon={faBomb} className="h-6 w-6" />
          </Link>
          </div>
          <div className="relative">
            <button 
              className="text-white hover:text-gray-300 transition duration-300 focus:outline-none" 
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              <FontAwesomeIcon icon={faCircleUser} className="h-6 w-6" />
            </button>
            {isProfileDropdownOpen && (
              <ul className="absolute right-0 bg-white text-black rounded-lg shadow-lg mt-2 py-2 w-48 z-50">
                {!parsedUser && (
                  <>
                    <li className="hover:bg-gray-200 transition duration-200">
                      <Link to={'/signup'} className="block px-4 py-2" onClick={() => setIsProfileDropdownOpen(false)}>Signup</Link>
                    </li>
                    <li className="hover:bg-gray-200 transition duration-200">
                      <Link to={'/login'} className="block px-4 py-2" onClick={() => setIsProfileDropdownOpen(false)}>Login</Link>
                    </li>
                  </>
                )}
                {parsedUser && (
                  <>
                    {parsedUser.role.toLowerCase() === "user" && (
                      <li className="hover:bg-gray-200 transition duration-200">
                        <Link to={'/user-dashboard'} className="block px-4 py-2" onClick={() => setIsProfileDropdownOpen(false)}>User</Link>
                      </li>
                    )}
                    <li className="cursor-pointer hover:bg-gray-200 transition duration-200 block px-4 py-2" onClick={logout}>
                      Logout
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none lg:hidden"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#433B58] px-4 pb-4">
          {navList}
        </div>
      )}
      {isProfileDropdownOpen && (
        <div className="lg:hidden bg-[#433B58] px-4 pb-4">
          <ul className="flex flex-col space-y-4 items-center text-white">
            {!parsedUser && (
              <>
                <li className="hover:text-gray-300 transition duration-300">
                  <Link to={'/signup'} onClick={() => setIsProfileDropdownOpen(false)}>Signup</Link>
                </li>
                <li className="hover:text-gray-300 transition duration-300">
                  <Link to={'/login'} onClick={() => setIsProfileDropdownOpen(false)}>Login</Link>
                </li>
              </>
            )}
            {parsedUser && (
              <>
                {parsedUser.role.toLowerCase() === "user" && (
                  <li className="hover:text-gray-300 transition duration-300">
                    <Link to={'/user-dashboard'} onClick={() => setIsProfileDropdownOpen(false)}>User</Link>
                  </li>
                )}
                <li className="cursor-pointer hover:text-gray-300 transition duration-300" onClick={logout}>
                  Logout
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
