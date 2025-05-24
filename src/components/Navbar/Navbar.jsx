import { useState, useRef, useEffect } from 'react';
import { Search, User, LogOut, HomeIcon, Settings, ChevronDown } from 'lucide-react';
import { FaBookmark, } from "react-icons/fa6";
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
            <div className="flex items-center justify-between h-24">
                <div className="flex items-center pl-4 border-r border-gray-200 h-full min-w-64">
                    <div className="mr-4">
                        <img
                            src={profile?.user?.profilePic}
                            className="rounded-full w-12 h-12  bg-blue-300"
                        />
                    </div>
                    <div className='flex flex-col'>
                        <p className="text-gray-700 font-medium">Welcome, {userInfo?.name}</p>
                        <div className="relative" ref={dropdownRef}> {/* Ref attached to this div */}
                            <button
                                onClick={toggleProfileDropdown}
                                className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition-colors cursor-pointer focus:outline-none"
                            >
                                <ChevronDown size={18} /> {/* Using Lucide-react User icon */}
                                <span className="text-sm">Profile</span>
                            </button>

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

                <div className="flex items-center px-4 mr-6 gap-5">
                    <Link to='/' className='flex flex-row items-center gap-1 hover:border-b-2 transform transition-all'>
                        <RiHome9Line size={20} className='text-first  transition-all cursor-pointer' />
                        <h1 className='text-lg text-gray-600'>Home</h1>
                    </Link>

                    <Link to='inquiry' className=' flex flex-row items-center gap-1 hover:border-b-2  cursor-pointer hover:text-cyan-500 transiton-all '>
                        <TbPointerQuestion size={20} className='text-first  transition-all cursor-pointer' />
                        <h1 className='text-lg text-gray-600'>Inquiry Now</h1>
                    </Link>

                    <Link to='/saved-pictures' className="flex flex-row items-center gap-1 hover:border-b-2 hover:text-cyan-500 transition-all ">
                        <BsBookmarks className="text-first" size={16} />
                        <h1 className='text-lg text-gray-600'>Saved Images</h1>
                    </Link>

                    {/* <Link to='/profile' className="">
                        <User className="text-black" size={28} />
                    </Link >

                    <button onClick={toggleModal} className="flex cursor-pointer  items-center gap-1">
                        <LogOut size={25} className='text-blue-500 hover:scale-102 hover:text-blue-500 transition-all ease-in-out duration-300' />
                    </button> */}
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
