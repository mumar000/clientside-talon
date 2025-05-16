import { useState } from 'react';
import { Search, Bookmark, User } from 'lucide-react';
import { FaBookmark } from "react-icons/fa6";
export default function Navbar() {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div className="w-full border-b border-gray-200">
            <div className="flex items-center justify-between h-24">
                {/* Left - User Welcome Section */}
                <div className="flex items-center pl-4 border-r border-gray-200 h-full min-w-64">
                    <div className="mr-4">
                        <img
                            src="/api/placeholder/60/60"
                            className="rounded-full w-12 h-12 border bg-blue-300"
                        />
                    </div>
                    <div>
                        <p className="text-gray-700 font-medium">Welcome, Amanda</p>
                        <p className="text-gray-400 text-sm">Tue, 07 June 2025</p>
                    </div>
                </div>

                {/* Right - Search & Icons */}
                <div className="flex items-center px-4 mr-6 gap-2">
                    {/* Search Bar */}
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

                    {/* Bookmark Icon */}
                    <button className="">
                        <FaBookmark className="text-black" size={25} />
                    </button>

                    {/* User Profile Icon */}
                    <button className="">
                        <User className="text-black" size={28} />
                    </button>
                </div>
            </div>
        </div>
    );
}