import React, { useState, useEffect } from 'react';
import image from '../../assets/image-2.png';
import { Link } from 'react-router-dom';
import { useGetPicByCategoryQuery } from '../../store/features/uploadSlice';
import { Image } from 'antd';
import banner from '../../assets/banner.jpg'

const HighLevelProduct = () => {
    const [category, setCategory] = useState('High Level Product');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 50;

    const { data, isLoading, error } = useGetPicByCategoryQuery(category);

    // Calculate pagination values
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

    // Loading screen with custom loader
    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600 text-lg font-light">Loading Collection...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Hero Banner */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent z-10"></div>
                <img
                    src={banner}
                    alt="High Level Product Banner"
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
                                    <h1 className="text-5xl font-light text-white mb-3 tracking-wide">
                                        {category}
                                    </h1>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-white/90 text-lg font-light">
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-white/80 text-xl font-light leading-relaxed max-w-2xl">
                                Discover our curated collection of high-quality products, meticulously designed for excellence and crafted with precision.
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
                            <div className="text-right">
                                <div className="text-2xl font-light text-gray-700">
                                    {String(currentPage).padStart(2, '0')}
                                </div>
                                <div className="text-sm text-gray-500 uppercase tracking-wider">
                                    Current Page
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
                                <div className="text-6xl text-gray-300 mb-4">📷</div>
                                <h3 className="text-xl text-gray-600 font-light mb-2">No images found</h3>
                                <p className="text-gray-500">This collection is currently empty</p>
                            </div>
                        ) : (
                            <>
                                {/* Image Grid with Ant Design Images */}
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                    {paginatedData.map((img, index) => (
                                        <div
                                            key={index}
                                            className="group aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 bg-gray-100 relative"
                                        >
                                            <Image
                                                src={img}
                                                alt={`Gallery image ${index + 1}`}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    objectPosition: 'center',
                                                    borderRadius: '12px'
                                                }}
                                                className="group-hover:scale-105 transition-transform duration-700"
                                                wrapperClassName="w-full h-full"
                                                preview={{
                                                    mask: (
                                                        <div className="text-white text-center">
                                                            <svg className="w-6 h-6 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            <div>View Image</div>
                                                        </div>
                                                    )
                                                }}
                                            />
                                            {/* Image number overlay */}
                                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <span className="text-xs font-medium text-gray-700">
                                                    {index + 1 + ((currentPage - 1) * pageSize)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

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

export default HighLevelProduct;