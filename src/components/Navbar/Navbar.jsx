import { useState, useRef, useEffect } from "react";
import {
  Search,
  User,
  LogOut,
  Settings,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
} from "lucide-react";
import { FaBookmark } from "react-icons/fa6";
import logo from "../../assets/logo.png";
import { useDispatch } from "react-redux";
import { logout } from "../../store/features/authSlice";
import { RiHome9Line } from "react-icons/ri";
import { TbPointerQuestion } from "react-icons/tb";
import { useNavigate, Link, Links } from "react-router-dom";
import { BsBookmarks } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "../../store/features/userApiSlice";

export default function Navbar() {
  const [searchText, setSearchText] = useState("");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { data: profile, isLoading } = useGetProfileQuery();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleProfileSettingsClick = () => {
    navigate("/profile");
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
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
      <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24 px-4">
        {/* Logo - always visible */}
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <img src={logo} className="w-12 sm:w-16 lg:w-20" alt="Logo" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-700 hover:text-cyan-500 transition-all group"
            >
              <RiHome9Line
                size={22}
                className="text-cyan-500 group-hover:scale-110 transition-transform duration-200"
              />
              <span className="text-base font-medium group-hover:underline">
                Home
              </span>
            </Link>

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
        </div>

        {/* Right side - Profile section */}
        <div className="flex ml-5 pl-4 items-center gap-2">
          {/* Desktop Profile Section */}
          <div className="hidden sm:flex  items-center pl-6 border-l border-gray-200 h-12 lg:h-16">
            <div className="mr-2">
              <img
                src={profile?.user?.profilePic || ""}
                alt="Profile"
                className="rounded-full w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-100"
              />
            </div>
            <div className="hidden md:flex flex-col ">
              <p className="text-gray-700 font-medium text-sm lg:text-base  ">
                <span className="">Welcome,</span> {userInfo?.name}
              </p>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition-colors cursor-pointer focus:outline-none"
                >
                  {isProfileDropdownOpen ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                  <span className="text-sm">Profile</span>
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-[999]">
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

          {/* Mobile Hamburger Menu */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 cursor-pointer  hover:text-blue-500 transform transition-all duration-200 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t transform transition-all duration-200 border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Profile Info */}
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <img
                src={profile?.user?.profilePic || ""}
                alt="Profile"
                className="rounded-full w-10 h-10 bg-gray-100"
              />
              <div>
                <p className="text-gray-700 font-medium text-sm">
                  Welcome, {userInfo?.name}
                </p>
                <p className="text-gray-500 text-xs">Manage your account</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-3">
              <Link
                to="/"
                onClick={handleNavClick}
                className="flex items-center gap-3 text-gray-700 hover:text-cyan-500 transition-all py-2"
              >
                <RiHome9Line size={20} className="text-cyan-500" />
                <span className="font-medium">Home</span>
              </Link>

              <Link
                to="/inquiry"
                onClick={handleNavClick}
                className="flex items-center gap-3 text-gray-700 hover:text-cyan-500 transition-all py-2"
              >
                <TbPointerQuestion size={20} className="text-cyan-500" />
                <span className="font-medium">Inquiry Now</span>
              </Link>

              <Link
                to="/save-pictures"
                onClick={handleNavClick}
                className="flex items-center gap-3 text-gray-700 hover:text-cyan-500 transition-all py-2"
              >
                <BsBookmarks size={18} className="text-cyan-500" />
                <span className="font-medium">Saved Images</span>
              </Link>

              <button
                onClick={handleProfileSettingsClick}
                className="flex items-center gap-3 text-gray-700 hover:text-blue-500 transition-all py-2 w-full text-left"
              >
                <Settings size={20} />
                <span className="font-medium">Profile Settings</span>
              </button>

              <button
                onClick={toggleLogoutModal}
                className="flex items-center gap-3 text-red-600 hover:text-red-700 transition-all py-2 w-full text-left"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Modal - unchanged */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[9999] p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-200 scale-100">
            <div className="p-8">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-red-50 rounded-full">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
                Sign Out
              </h2>

              <p className="text-gray-600 text-center mb-8 leading-relaxed">
                Are you sure you want to sign out of your account? You'll need
                to sign in again to access.
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
    </div>
  );
}
