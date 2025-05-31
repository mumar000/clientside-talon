import { useState, useRef, useEffect } from 'react';
import { Search, User, LogOut, HomeIcon, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { FaBookmark, } from "react-icons/fa6";
import logo from '../../assets/logo.png'
import { useDispatch } from 'react-redux';
import { logout } from '../../store/features/authSlice';
import { RiHome9Line } from "react-icons/ri";
import { TbPointerQuestion } from "react-icons/tb";
import { useNavigate, Link, Links } from 'react-router-dom';
import { BsBookmarks } from "react-icons/bs";
import { useSelector } from 'react-redux'
import { useGetProfileQuery } from '../../store/features/userApiSlice';
export default function Navbar() {
    const [searchText, setSearchText] = useState('');
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const { data: profile, isLoading } = useGetProfileQuery()
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const { userInfo } = useSelector((state) => state.auth)

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
        setIsLogoutModalOpen(false);
        setIsProfileDropdownOpen(false);
    };

    const toggleLogoutModal = () => {
        setIsLogoutModalOpen(!isLogoutModalOpen);
        setIsProfileDropdownOpen(false);
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };


    const handleProfileSettingsClick = () => {
        navigate('/profile');
        setIsProfileDropdownOpen(false);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="w-full border-b border-gray-200">
            <div className="flex items-center  justify-between h-24">



                <div className="flex items-center px-4 mr-6 gap-6">
                    {/* Logo */}
                    <div className="px-2">
                        <img src={logo} className="w-20" alt="Logo" />
                    </div>

                    {/* Home */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-gray-700 hover:text-cyan-500 transition-all group"
                    >
                        <RiHome9Line
                            size={22}
                            className="text-cyan-500 group-hover:scale-110 transition-transform duration-200"
                        />
                        <span className="text-base font-medium group-hover:underline">Home</span>
                    </Link>

                    {/* Inquiry Now */}
                    <Link
                        to="/inquiry"
                        className="flex items-center gap-2 text-gray-700 hover:text-cyan-500 transition-all group"
                    >
                        <TbPointerQuestion
                            size={22}
                            className="text-cyan-500 group-hover:scale-110 transition-transform duration-200"
                        />
                        <span className="text-base font-medium group-hover:underline">
                            Inquiry Now
                        </span>
                    </Link>

                    {/* Saved Images */}
                    <Link
                        to="/save-pictures"
                        className="flex items-center gap-2 text-gray-700 hover:text-cyan-500 transition-all group"
                    >
                        <BsBookmarks
                            size={20}
                            className="text-cyan-500 group-hover:scale-110 transition-transform duration-200"
                        />
                        <span className="text-base font-medium group-hover:underline">
                            Saved Images
                        </span>
                    </Link>
                </div>




                <div className="flex items-center pl-4 border-l border-gray-200 h-full min-w-64">
                    <div className="mr-4">
                        <img
                            src={profile?.user?.profilePic || ''}
                            alt='Profile'
                            className="rounded-full w-12 h-12  bg-gray-100"
                        />
                    </div>
                    <div className='flex flex-col'>
                        <p className="text-gray-700 font-medium">Welcome, {userInfo?.name}</p>
                        <div className="relative" ref={dropdownRef}> {/* Ref attached to this div */}
                            <button
                                onClick={toggleProfileDropdown}
                                className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition-colors cursor-pointer focus:outline-none"
                            >
                                {isProfileDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />} {/* Using Lucide-react User icon */}
                                <span className="text-sm">Profile</span>
                            </button>
                            {/* <ChevronDown size={18} /> */}

                            {/* Profile Dropdown Menu */}
                            {isProfileDropdownOpen && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-[999]">
                                    <button
                                        onClick={handleProfileSettingsClick}
                                        className="flex items-center cursor-pointer gap-2 w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                                    >
                                        <Settings size={16} /> Profile Settings
                                    </button>
                                    <button
                                        onClick={toggleLogoutModal}
                                        className="flex items-center cursor-pointer gap-2 w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                                    >
                                        <LogOut size={16} /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {isLogoutModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[9999] p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-200 scale-100">
                        <div className="p-8">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-red-50 rounded-full">
                                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
                                Sign Out
                            </h2>

                            <p className="text-gray-600 text-center mb-8 leading-relaxed">
                                Are you sure you want to sign out of your account? You'll need to sign in again to access.
                            </p>

                            <div className="flex flex-col-reverse sm:flex-row gap-3">
                                <button
                                    onClick={toggleLogoutModal}
                                    className="flex-1 px-6 py-3 text-gray-700 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex-1 px-6 py-3 text-white bg-red-500 cursor-pointer hover:bg-red-600 rounded-xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
}
