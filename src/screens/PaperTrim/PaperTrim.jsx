import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ScreenLoader } from '../../components/components';
import image from '../../assets/image-2.png';

import { IoGridOutline } from "react-icons/io5";
import { IoImageOutline } from "react-icons/io5";
import { ChevronDown, Heart, List } from 'lucide-react';

import { Image, Pagination, Spin } from 'antd';

import { useGetPicByCategoryQuery } from '../../store/features/uploadSlice';
import { useSavePictureMutation } from '../../store/features/userApiSlice';
import { useGetSavePicturesQuery } from '../../store/features/userApiSlice';
import { toast } from 'sonner';
import { FaHeart } from 'react-icons/fa6';
const PaperTrim = () => {
    const [category, setCategory] = useState('Paper Trim');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('grid');
    const [isDropDown, setIsDropDown] = useState(false)

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

    const handlePageChange = (page) => {
        setCurrentPage(page);
        document.getElementById('gallery-grid')?.scrollIntoView({ behavior: 'smooth' });
    };


    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [category]);

    if (loading) {
        return <ScreenLoader />;
    }
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Main Banner */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent z-10"></div>
                <img
                    src='https://taloninternational.com/wp-content/uploads/2018/08/Trim-Paper-Trim-2.png'
                    alt="Paper Trim Banner"
                    className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 z-20 flex items-center">
                    <div className="max-w-8xl mx-auto px-8 w-full">
                        <div className="max-w-3xl">
                            <div className="flex items-center mb-4">
                                <Link to="/">
                                    <button className="mr-6 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 group">
                                        <svg
                                            className="w-5 h-5 text-white group-hover:transform group-hover:-translate-x-1 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                </Link>
                                <div>
                                    <h1 className="text-6xl font-bold text-white mb-3 tracking-wide">
                                        {category} Collection
                                    </h1>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-white/90 text-lg font-light">
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-white/80 text-xl font-medium leading-relaxed max-w-2xl">
                                Browse our complete collection of high-quality paper trim designs for all your manufacturing and creative needs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Gallery */}
            <div className="max-w-8xl mx-auto px-8 py-16">
                <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/50">

                    {/* Gallery Header */}
                    <div className="px-10 py-8 border-b border-gray-100/80">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-3xl font-light text-gray-800 mb-2">
                                    Gallery Overview
                                </h2>
                                <p className="text-gray-600 font-light">
                                    Page {currentPage} of {totalPages} • Showing {paginatedData.length} of {total} items
                                </p>
                            </div>
                            <div className='flex flex-row items-center gap-2'>
                                <div className='bg-gray-100 rounded-lg p-1 flex'>
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`px-3 py-1.5 cursor-pointer rounded-md flex items-center gap-2 transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-600'}`}>
                                        <IoGridOutline size={20} />
                                        Grid
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`px-3 py-1.5 rounded-md cursor-pointer flex items-center gap-2 transition-all ${viewMode === 'list'
                                            ? 'bg-white shadow-sm text-gray-800'
                                            : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        <List size={20} />
                                        List
                                    </button>
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
                                            to="/highlevel"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            High Level Products
                                        </Link>
                                        <Link
                                            to="/zippers"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Zipper
                                        </Link>
                                        <Link
                                            to="/patches"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Patches
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gallery Grid */}
                    <div className="p-10" id="gallery-grid">
                        {isLoading ? (
                            <div className="flex justify-center items-center py-32">
                                <div className="text-center">
                                    <div className="inline-block w-10 h-10 border-3 border-gray-200 border-t-gray-600 rounded-full animate-spin mb-4"></div>
                                    <p className="text-gray-500 font-light">Loading images...</p>
                                </div>
                            </div>
                        ) : error ? (
                            <div className="text-center py-32">
                                <div className="text-6xl text-gray-300 mb-4">⚠</div>
                                <h3 className="text-xl text-gray-600 font-light mb-2">Unable to load images</h3>
                                <p className="text-gray-500">Please try refreshing the page</p>
                            </div>
                        ) : paginatedData.length === 0 ? (
                            <div className="text-center py-32">
                                <div className="text-6xl text-gray-300 mb-4">📄</div>
                                <h3 className="text-xl text-gray-600 font-light mb-2">No images found</h3>
                                <p className="text-gray-500">This collection is currently empty</p>
                            </div>
                        ) : (
                            <>
                                <Image.PreviewGroup>
                                    {viewMode === 'grid' && (
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                            {paginatedData.map((img, index) => {
                                                const isSaved = savedImages?.includes(img)
                                                return (
                                                    <div
                                                        key={index}
                                                        className="group aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-2xl  transition-all duration-500 bg-gray-100 relative"
                                                    >
                                                        <Image
                                                            src={img}
                                                            alt={`Gallery image ${index + 1}`}
                                                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover'
                                                            }}
                                                            preview={{
                                                                mask: (
                                                                    <div className="flex items-center justify-center">
                                                                        <IoImageOutline size={20} className="text-white" />
                                                                    </div>
                                                                )
                                                            }}
                                                        />

                                                        {/* Heart button overlay */}
                                                        <button
                                                            onClick={() => handleSave(img)}
                                                            className="absolute z-[999] top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    objectFit: 'cover'
                                                                }}
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
                                {totalPages > 1 && (
                                    <div className="flex justify-center items-center mt-16 space-x-4">
                                        <button
                                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                            disabled={currentPage === 1}
                                            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>

                                        <div className="flex space-x-2">
                                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                let pageNum;
                                                if (totalPages <= 5) {
                                                    pageNum = i + 1;
                                                } else if (currentPage <= 3) {
                                                    pageNum = i + 1;
                                                } else if (currentPage >= totalPages - 2) {
                                                    pageNum = totalPages - 4 + i;
                                                } else {
                                                    pageNum = currentPage - 2 + i;
                                                }

                                                return (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => handlePageChange(pageNum)}
                                                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === pageNum
                                                            ? 'bg-gray-800 text-white shadow-lg'
                                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                            }`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <button
                                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                            disabled={currentPage === totalPages}
                                            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaperTrim;