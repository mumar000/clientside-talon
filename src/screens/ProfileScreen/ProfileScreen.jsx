import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useGetProfileQuery, useUpdateProfileMutation, useUpdateProfilePicMutation } from '../../store/features/userApiSlice';
import { toast } from 'react-toastify';

const ProfileScreen = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { data: profile, isLoading, isError, refetch } = useGetProfileQuery(userInfo?._id);
    const [updateProfile, { isLoading: isLoadings }] = useUpdateProfileMutation()
    const [updateProfilePic, { isLoading: loading }] = useUpdateProfilePicMutation()
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        name: '',
        email: '',
    });

    const fileInputRef = useRef(null)

    // Initialize editData when profile loads
    useEffect(() => {
        if (profile?.user) {
            setEditData({
                name: profile.user.name || '',
                email: profile.user.email || '',
            });
        }
    }, [profile]);

    console.log("Profile", profile)
    const handleInputChange = (field, value) => {
        setEditData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        try {
            const res = await updateProfile({ id: userInfo?._id, name: editData.name, email: editData.email }).unwrap()
            toast.success(res?.data?.message)
        } catch (error) {
            console.log("Error", error?.message)
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditData({
            name: profile?.user?.name || '',
            email: profile?.user?.email || '',
            password: ''
        });
        setIsEditing(false);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return;

        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await updateProfilePic(formData).unwrap()
            toast.success(res?.data?.msg)
            refetch()
        } catch (error) {
            console.log(error?.message)
            toast.error(error?.message)
        }
    };
    const bgImage = 'https://taloninternational.com/wp-content/uploads/2018/07/WWT-1-5.png'
    if (isLoading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    if (isError) return <div className="flex justify-center items-center min-h-screen">Error loading profile</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br bg-center bg-cover bg-no-repeat from-gray-50 to-gray-100" style={{ backgroundImage: `url('${bgImage}')` }}>
            {/* Floating Glass Morphism Container */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/30">
                    {/* Profile Header with Gradient */}
                    <div className="relative bg-gradient-to-r from-slate-500 via-slate-600 to-slate-900 p-8 text-white">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                            {/* Profile Picture */}
                            <div className="relative group">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-xl">
                                    <img
                                        src={profile?.user?.profilePic || ''}
                                        alt="Profile"
                                        className="w-full h-full object-cover"

                                    />
                                </div>



                            </div>

                            {/* Profile Info */}
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                                    {profile?.user?.name || 'User Name'}
                                </h1>
                                <p className="text-white/90 font-light">
                                    {profile?.user?.email || 'user@example.com'}
                                </p>
                                <div className="mt-4 flex justify-center md:justify-start gap-3">
                                    <button
                                        onClick={() => fileInputRef.current.click()}
                                        className="px-4 py-2 flex items-center justify-center cursor-pointer bg-white/20 hover:bg-white/30 text-white rounded-full font-medium transition-all duration-300 border border-white/30 hover:shadow-lg"
                                    >
                                        {loading ? (<div className='h-6 w-6 border-y-2 boder-l-2 rounded-full border-white animate-spin'></div>) : 'Change Profile Picture'}
                                    </button>
                                    {!isEditing ? (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="px-6 py-2 cursor-pointer bg-white/20 hover:bg-white/30 text-white rounded-full font-medium transition-all duration-300 border border-white/30 hover:shadow-lg"
                                        >
                                            Edit Profile
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={handleCancel}
                                                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all duration-300 border border-white/20"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSave}
                                                className="px-6 py-2 cursor-pointer bg-white text-indigo-600 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 shadow hover:shadow-lg"
                                            >
                                                Save Changes
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="p-8">
                        {/* Stats Cards */}


                        {/* Profile Form */}
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 uppercase tracking-wider mb-2">
                                        Full Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all duration-300"
                                        />
                                    ) : (
                                        <div className="px-4 py-3 bg-white/50 rounded-xl border border-gray-200">
                                            <span className="text-gray-800">{profile?.user?.name || 'Not provided'}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 uppercase tracking-wider mb-2">
                                        Email Address
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={editData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all duration-300"
                                        />
                                    ) : (
                                        <div className="px-4 py-3 bg-white/50 rounded-xl border border-gray-200">
                                            <span className="text-gray-800">{profile?.user?.email || 'Not provided'}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 uppercase tracking-wider mb-2">
                                    Password
                                </label>
                                <div className="px-4 py-3 bg-white/50 rounded-xl border border-gray-200">
                                    <span className="text-gray-800">••••••••</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
            />
        </div>
    );
};

export default ProfileScreen;