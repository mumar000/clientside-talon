import { useState } from 'react';
import { Search, User, LogOut, HomeIcon } from 'lucide-react';
import { FaBookmark, } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { logout } from '../../store/features/authSlice';
import { useNavigate, Link, Links } from 'react-router-dom';
import { useSelector } from 'react-redux'
export default function Navbar() {
    const [searchText, setSearchText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const { userInfo } = useSelector((state) => state.auth)
    console.log("User", userInfo)

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="w-full border-b border-gray-200">
            <div className="flex items-center justify-between h-24">
                <div className="flex items-center pl-4 border-r border-gray-200 h-full min-w-64">
                    <div className="mr-4">
                        <img
                            src="https://randomuser.me/api/portraits/men/32.jpg"
                            className="rounded-full w-12 h-12 border bg-blue-300"
                        />
                    </div>
                    <div>
                        <p className="text-gray-700 font-medium">Welcome, {userInfo?.name}</p>
                    </div>
                </div>

                <div className="flex items-center px-4 mr-6 gap-2">
                    <Link to='/'>
                        <HomeIcon size={25} className='text-first hover:text-black transition-all cursor-pointer' />
                    </Link>
                    <div className="relative mr-2">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchText}
                            onChange={handleSearchChange}
                            className="bg-gray-100 rounded-full px-4 py-2 pl-10 w-60 text-sm"
                        />
                        <div className="absolute right-3 top-2.5">
                            <Search size={16} className="text-black" />
                        </div>
                    </div>
                    <Link to='inquiry' className='cursor-pointer hover:text-cyan-500 transiton-all duration-300'>
                        <h1>Inquiry Now</h1>
                    </Link>

                    <button className="">
                        <FaBookmark className="text-black" size={25} />
                    </button>

                    <Link to='/profile' className="">
                        <User className="text-black" size={28} />
                    </Link >

                    <button onClick={toggleModal} className="flex cursor-pointer  items-center gap-1">
                        <LogOut size={25} className='text-blue-500 hover:scale-102 hover:text-blue-500 transition-all ease-in-out duration-300' />
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-[9999]">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
                        <p className="mb-6">Are you sure you want to log out?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={toggleModal}
                                className="px-4 py-2 bg-gray-300 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500 text-white rounded-md"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
