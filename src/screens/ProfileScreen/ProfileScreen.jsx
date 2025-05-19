import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetProfileQuery } from '../../store/features/userApiSlice';

const ProfileScreen = () => {
    const { userInfo } = useSelector((state) => state.auth)
    const { data: profile, isLoading } = useGetProfileQuery(userInfo?._id)
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: profile?.user?.name,
        email: profile?.user?.email,
        password: profile?.user?.password,
        profilePicture: '/api/placeholder/200/200'
    });

    console.log("user", profile?.user?.name)


    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-teal-200 to-first">
            {/* Header Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900">
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                <div className="relative max-w-7xl mx-auto  px-6 py-16">
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">
                            My Profile
                        </h1>
                        <p className="text-xl font-light opacity-90">
                            Manage your account information
                        </p>
                    </div>
                </div>

            </div>

            {/* Main Profile Section */}
            <div className="max-w-8xl mx-auto px-6 py-16">
                <div className="bg-gray-100 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/50">

                    {/* Profile Header */}
                    <div className="px-8 py-8 border-b border-gray-100/80">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="relative group">
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-lg ring-4 ring-white/50">
                                        <img
                                            src={isEditing ? editData.profilePicture : profileData.profilePicture}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {isEditing && (
                                        <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                                <div className="text-center md:text-left">
                                    <h2 className="text-2xl md:text-3xl font-light text-gray-800">
                                        {profileData.name}
                                    </h2>
                                    <p className="text-gray-600 font-light">
                                        {profileData.email}
                                    </p>

                                </div>
                            </div>

                            <div className="flex gap-3">
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-6 py-3 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        Edit Profile
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleCancel}
                                            className="px-6 py-3 bg-white text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-all duration-300"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="px-6 py-3 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                                        >
                                            Save Changes
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Profile Form */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Name Field */}
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    Full Name
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-300 focus:border-transparent outline-none transition-all duration-300 bg-white"
                                        placeholder="Enter your full name"
                                    />
                                ) : (
                                    <div className="px-4 py-3 bg-white rounded-xl border border-gray-100">
                                        <span className="text-gray-800 font-light">{profileData.name}</span>
                                    </div>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    Email Address
                                </label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={editData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-300 focus:border-transparent outline-none transition-all duration-300 bg-white/50"
                                        placeholder="Enter your email address"
                                    />
                                ) : (
                                    <div className="px-4 py-3 bg-white rounded-xl border border-gray-100">
                                        <span className="text-gray-800 font-light">{profileData.email}</span>
                                    </div>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-3 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    Password
                                </label>
                                {isEditing ? (
                                    <div className="relative">
                                        <input
                                            type="password"
                                            value={editData.password}
                                            onChange={(e) => handleInputChange('password', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-300 focus:border-transparent outline-none transition-all duration-300 bg-white/50"
                                            placeholder="Enter new password"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="px-4 py-3 bg-white rounded-xl border border-gray-100">
                                        <span className="text-gray-800 font-light">••••••••</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Additional Info Section */}
                        <div className="mt-12 pt-8 text-center border-t border-gray-100">
                            <h3 className="text-xl flex items-center justify-center?  font-light text-gray-800 mb-6">Account Information</h3>
                            <div className="flex items-center justify-center">
                                <div className="text-center p-6 bg-gray-50/30 rounded-xl">
                                    <div className="text-2xl font-light text-gray-800">24</div>
                                    <div className="text-sm text-gray-600 uppercase tracking-wider">Save Photos</div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Cards */}

            </div>


        </div>
    );
};

export default ProfileScreen;