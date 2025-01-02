import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slice/UserSlice'
import { RootState } from '../../redux/store/Store';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = useState(false);

    const avatar = useSelector((state: RootState) => state.user.userData?.avatar)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleMouseOver = () => {
        setOpen(true);
    };

    const handleMouseLeave = () => {
        setOpen(false);
    };

    const handleLogOut = () => {
        dispatch(logout());
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        navigate('/')
    }

    return (
        <>
            <nav className="bg-gradient-to-br from-purple-400 to-blue-600 p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center relative">

                    {/* Logo */}
                    <Link to="/home" className="text-white text-2xl font-bold tracking-wide hover:text-blue-200 transition duration-300">
                        MyApp
                    </Link>

                    {/* Hamburger Icon (Mobile) */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-white focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Center Links (Desktop) */}
                    <div className={`hidden md:flex space-x-8 items-center`}>
                        <Link
                            to="/addblog"
                            className="text-white text-lg hover:underline transition duration-200"
                        >
                            Add Blog
                        </Link>
                        <Link
                            to="/home"
                            className="text-white text-lg hover:underline transition duration-200"
                        >
                            Home
                        </Link>
                        <Link
                            to="/profile"
                            className="text-white text-lg hover:underline transition duration-200"
                        >
                            Profile
                        </Link>
                    </div>

                    {/* Profile Icon (Desktop) */}
                    <div
                        className="hidden md:flex items-center relative"
                        onMouseOver={handleMouseOver}
                        onMouseLeave={handleMouseLeave}
                    >
                        {avatar ? (
                            <img src={avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
                        ) : (
                            <FaUserCircle className="text-white text-4xl cursor-pointer transition-all duration-200 ease-in-out transform hover:text-blue-300 hover:scale-105" />
                        )}
                        {open && (
                            <div className="absolute right-0 mt-36 bg-white shadow-xl rounded-lg p-2 w-48 z-20">
                                <div className="flex flex-col gap-2 justify-center items-center">
                                    <span className="flex gap-4 text-gray-800 hover:text-blue-600 transition duration-200 font-medium p-2 rounded-md hover:bg-blue-50 cursor-pointer">
                                        <Link to="/profile" className="flex gap-2 items-center">
                                            <CgProfile size={20} />
                                            Profile
                                        </Link>
                                    </span>
                                    <hr className="border-t border-gray-300 w-full" />
                                    <span
                                        className="flex gap-2 text-gray-800 hover:text-red-600 transition duration-200 font-medium p-2 rounded-md hover:bg-blue-50 cursor-pointer"
                                        onClick={() => handleLogOut()}
                                    >
                                        <span className="flex gap-2 items-center">
                                            <MdLogout size={20} />
                                            LogOut
                                        </span>
                                    </span>
                                </div>
                            </div>

                        )}
                    </div>

                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                    <div className="flex flex-col items-center space-y-4 mt-4">
                        <div className="mb-4">
                            <FaUserCircle className="text-white text-5xl" />
                        </div>

                        <Link
                            to="/addblog"
                            className="text-white text-lg hover:underline transition duration-200"
                            onClick={toggleMenu}
                        >
                            Add Blog
                        </Link>
                        <Link
                            to="/"
                            className="text-white text-lg hover:underline transition duration-200"
                            onClick={toggleMenu}
                        >
                            Home
                        </Link>
                        <Link
                            to="/profile"
                            className="text-white text-lg hover:underline transition duration-200"
                            onClick={toggleMenu}
                        >
                            Profile
                        </Link>
                        <Link
                            to="/"
                            className="text-white text-lg hover:underline transition duration-200"
                            onClick={toggleMenu}
                        >
                            LogOut
                        </Link>
                    </div>
                </div>

            </nav>
        </>
    );
}

export default Navbar;
