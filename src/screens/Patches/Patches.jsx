//Local Imports
import React, { useState, useEffect, useRef, useCallback } from 'react';
import image from '../../assets/banner.jpg';
import { Link } from 'react-router-dom';
import { GalleryViewMode, ScreenLoader } from '../../components/components';

//Antd 
import { Pagination, Spin, Empty, Image } from 'antd';

//sonner toast
import { toast } from 'sonner';

//Icons
import { ChevronDown, ChevronLeft, Heart, List } from 'lucide-react';
import { IoGridOutline, IoImageOutline } from 'react-icons/io5';

//Api Calls
import { useGetPicByCategoryQuery } from '../../store/features/uploadSlice';
import { useSavePictureMutation } from '../../store/features/userApiSlice';
import { useGetSavePicturesQuery } from '../../store/features/userApiSlice';
import { FaHeart } from 'react-icons/fa6';
const Patches = () => {
    const [category, setCategory] = useState('Patches');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [isDropDown, setIsDropDown] = useState(false)
    const [viewMode, setViewMode] = useState('grid');
    const pageSize = 50;

    const toggleDropDown = () => setIsDropDown(prev => !prev)



    const { data, isLoading, error } = useGetPicByCategoryQuery(category);
    const [savePicture, { isLoading: isLoadings }] = useSavePictureMutation()
    const { data: getPic, isLoading: isSavePicLoading, refetch } = useGetSavePicturesQuery()
    const savedImages = getPic?.pictures?.flatMap(p => p.pictureUrl)




    const total = data?.pictures?.length || 0;
    const paginatedData = data?.pictures?.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    ) || [];

    const totalPages = Math.ceil(total / pageSize);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [category]);

    const handleSave = async (img) => {
        try {
            const res = await savePicture({ bulkUploadId: data?.bulkUploadId, pictureUrl: img }).unwrap()
            toast.success("Picture Saved")
            refetch()
        } catch (error) {
            console.log(error?.message)
        }
    }

    return (
        <>
            {loading ? (
                <ScreenLoader />
            ) : (
                <div className="min-h-screen bg-gradient-to-br from-gray-50 via-cyan-50 to-slate-100">
                    {/* Hero Banner */}
                    <div className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent z-10"></div>
                        <img
                            src='https://taloninternational.com/wp-content/uploads/2018/08/Patches-HERO-Background-3-.png'
                            alt="Patches Banner"
                            className="w-full h-96 object-cover object-center"
                        />
                        <div className="absolute inset-0 z-20 flex items-center">
                            <div className="max-w-8xl mx-auto px-8 w-full">
                                <div className="max-w-3xl">
                                    <div className="flex items-center mb-4">
                                        <Link to="/">
                                            <button className="mr-6 p-3 bg-white/30 backdrop-blur-sm hover:bg-white/60 cursor-pointer rounded-full transition-all duration-300 group">
                                                <ChevronLeft
                                                    size={20}
                                                    className="group-hover:-translate-x-1 transition-transform group-hover:transform group-hover:scale-102"
                                                />
                                            </button>
                                        </Link>
                                        <div>
                                            <h1 className="text-6xl font-bold  text-white mb-3 tracking-wide">
                                                {category}
                                            </h1>
                                            <div className="flex items-center space-x-4">
                                                <span className="text-white/90 text-lg font-light"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-white/80 text-xl font-medium leading-relaxed max-w-2xl">
                                        Customize your clothes with our stylish and durable patches.
                                        Perfect for adding a unique touch to jackets, bags, and more!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-8xl mx-auto px-8 py-16">
                        <div className="bg-cyan-50/70 backdrop-blur-sm rounded-3xl shadow-xl border border-cyan-50/50 overflow-hidden">
                            {/* Header */}
                            <div className="px-10 py-8 border-b border-gray-100/50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h1 className="text-3xl font-light text-gray-800 mb-2">
                                            Collection Overview
                                        </h1>
                                        <p className="text-gray-600 font-light">
                                            Page {currentPage} of {totalPages} • Showing {paginatedData.length} of {total} items
                                        </p>
                                    </div>
                                    <div className='flex flex-row item-center gap-1'>
                                        <div className="flex items-center space-x-4">
                                            {/* View Toggle Buttons */}
                                            <div className="bg-gray-100 rounded-lg p-1 flex">
                                                <GalleryViewMode viewMode={viewMode} setViewMode={setViewMode} />
                                            </div>
                                            <div className="relative inline-block">
                                                <button
                                                    onClick={toggleDropDown}
                                                    className="px-4 py-2 rounded-xl bg-slate-800 text-white flex items-center gap-2"
                                                >
                                                    More Categories
                                                    <ChevronDown size={20} />
                                                </button>

                                                <div
                                                    className={`absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-[999] transform transition-all duration-200 ease-in-out origin-top
        ${isDropDown ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible'}`}
                                                >
                                                    <Link
                                                        to="/zippers"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        High Level Products
                                                    </Link>
                                                    <Link
                                                        to="/zippers"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Zippers
                                                    </Link>
                                                    <Link
                                                        to="/papertrim"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Paper Trim
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-10" id="gallery-grid">
                                {isLoading ? (
                                    <div className="flex justify-center items-center py-32">
                                        <div className="text-center">
                                            <Spin size="large" />
                                            <p className="text-gray-500 font-light mt-4">Loading patches...</p>
                                        </div>
                                    </div>
                                ) : error ? (
                                    <div className="text-center py-32">
                                        <div className="text-6xl text-gray-300 mb-4">⚠</div>
                                        <h3 className="text-xl text-gray-600 font-light mb-2">Unable to load patches</h3>
                                        <p className="text-gray-500">{error?.message || 'Please try refreshing the page'}</p>
                                    </div>
                                ) : paginatedData.length === 0 ? (
                                    <div className="text-center py-32">
                                        <div className="text-6xl text-gray-300 mb-4">🏷️</div>
                                        <h3 className="text-xl text-gray-600 font-light mb-2">No patches found</h3>
                                        <p className="text-gray-500">This collection is currently empty</p>
                                    </div>
                                ) : (
                                    <>
                                        <Image.PreviewGroup
                                            preview={{
                                                onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                                            }}
                                        >
                                            {viewMode === 'grid' && (
                                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                                    {paginatedData.map((img, index) => {
                                                        const isSaved = savedImages?.includes(img)
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="group aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 bg-gray-100 relative"
                                                            >
                                                                <Image
                                                                    src={img}
                                                                    alt={`Gallery image ${index + 1}`}
                                                                    tyle={{ width: '100%', height: '100%' }}
                                                                    className="w-full  h-full object-cover object-center rounded-xl group-hover:scale-105 transition-transform duration-700"
                                                                />

                                                                {/* Save Button */}
                                                                <button
                                                                    onClick={() => handleSave(img)}
                                                                    className="absolute z-[999] cursor-pointer top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                                >
                                                                    {isSaved ? (<FaHeart size={20} className='text-red-500 ' />) : (<Heart size={20} className="text-gray-700 cursor-pointer" />)}
                                                                </button>


                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )}

                                            {viewMode === 'list' && (
                                                <div className="space-y-4">
                                                    {paginatedData.map((img, index) => {
                                                        const isSaved = savedImages?.includes(img)
                                                        return (
                                                            <div
                                                                key={`list-${index}`}
                                                                className="group flex items-center bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                                                            >
                                                                {/* Thumbnail */}
                                                                <div className="w-20 h-20 sm:w-32 sm:h-32 flex-shrink-0 relative overflow-hidden">
                                                                    <Image
                                                                        src={img}
                                                                        alt={`Gallery image ${index + 1}`}
                                                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                                                        preview={{
                                                                            mask: (
                                                                                <div className="flex items-center justify-center">
                                                                                    <IoImageOutline size={20} className="text-white" />
                                                                                </div>
                                                                            )
                                                                        }}
                                                                    />
                                                                    {/* <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div> */}
                                                                </div>

                                                                {/* Image details */}
                                                                <div className="p-4 flex-grow flex justify-between items-center">
                                                                    <div>
                                                                        <div className="flex items-center space-x-2 mb-1">
                                                                            <span className="text-sm font-medium text-gray-900">
                                                                                Image {index + 1 + ((currentPage - 1) * pageSize)}
                                                                            </span>
                                                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-800">
                                                                                {category}
                                                                            </span>
                                                                        </div>
                                                                    </div>

                                                                    {/* Actions */}
                                                                    <div className="flex items-center space-x-2">
                                                                        <button
                                                                            onClick={() => handleSave(img)}
                                                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                                        >
                                                                            {isSaved ? (<FaHeart size={20} className='text-red-500 ' />) : (<Heart size={20} className="text-gray-700 cursor-pointer" />)}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                        </Image.PreviewGroup>

                                        {/* Pagination */}
                                        {total > pageSize && (
                                            <div className="flex justify-center mt-16">
                                                <Pagination
                                                    current={currentPage}
                                                    pageSize={pageSize}
                                                    total={total}
                                                    onChange={handlePageChange}
                                                    showSizeChanger={false}
                                                    showQuickJumper
                                                    className="custom-pagination"
                                                />
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Patches;