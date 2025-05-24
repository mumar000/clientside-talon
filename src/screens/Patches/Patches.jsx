import React, { useState, useEffect, useRef, useCallback } from 'react';
import image from '../../assets/banner.jpg';
import { Link } from 'react-router-dom';
import { useGetPicByCategoryQuery } from '../../store/features/uploadSlice';
import { Pagination, Spin, Empty } from 'antd';
import { ScreenLoader } from '../../components/components';

import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-pager.css';

// Import required plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgPager from 'lightgallery/plugins/pager';

import { ChevronLeft, List } from 'lucide-react';
import { IoGridOutline } from 'react-icons/io5';

const Patches = () => {
    const [category, setCategory] = useState('Patches');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('grid');
    const pageSize = 50;

    // Reference to light gallery
    const lightGalleryRef = useRef(null);

    const { data, isLoading, error } = useGetPicByCategoryQuery(category);

    // Calculate pagination values
    const total = data?.pictures?.length || 0;
    const paginatedData = data?.pictures?.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    ) || [];

    const totalPages = Math.ceil(total / pageSize);


    const handlePageChange = (page) => {
        if (lightGalleryRef.current) {
            const lgInstance = lightGalleryRef.current.instance;
            if (lgInstance) {
                lgInstance.closeGallery();
            }
        }

        setCurrentPage(page);
        document.getElementById('gallery-grid')?.scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
            if (lightGalleryRef.current && lightGalleryRef.current.instance) {
                lightGalleryRef.current.instance.refresh();
            }
        }, 100);
    };

    const lightGalleryOptions = {
        speed: 500,
        plugins: [lgThumbnail, lgZoom],
        thumbnail: true,
        animateThumb: true,
        showThumbByDefault: false,
        allowMediaOverlap: true,
        toggleThumb: true,
        download: true,
    };

    useEffect(() => {
        if (lightGalleryRef.current && lightGalleryRef.current.instance) {
            setTimeout(() => {
                lightGalleryRef.current.instance.refresh();
            }, 100);
        }
    }, [viewMode]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [category]);



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
                            src={image}
                            alt="Patches Banner"
                            className="w-full h-92 object-cover object-center"
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
                                            <h1 className="text-5xl font-light text-white mb-3 tracking-wide">
                                                {category}
                                            </h1>
                                            <div className="flex items-center space-x-4">
                                                <span className="text-white/90 text-lg font-light"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-white/80 text-xl font-light leading-relaxed max-w-2xl">
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
                                    <div className="flex items-center space-x-4">
                                        {/* View Toggle Buttons */}
                                        <div className="bg-gray-100 rounded-lg p-1 flex">
                                            <button
                                                onClick={() => setViewMode('grid')}
                                                className={`px-3 py-1.5 cursor-pointer rounded-md flex items-center space-x-2 transition-all ${viewMode === 'grid'
                                                    ? 'bg-white shadow-sm text-gray-800'
                                                    : 'text-gray-500 hover:text-gray-600'
                                                    }`}
                                            >
                                                <IoGridOutline size={18} />
                                                <span className="text-sm font-medium">Grid</span>
                                            </button>
                                            <button
                                                onClick={() => setViewMode('list')}
                                                className={`px-3 py-1.5 rounded-md cursor-pointer flex items-center space-x-2 transition-all ${viewMode === 'list'
                                                    ? 'bg-white shadow-sm text-gray-800'
                                                    : 'text-gray-500 hover:text-gray-700'
                                                    }`}
                                            >
                                                <List size={18} />
                                                <span className="text-sm font-medium">List</span>
                                            </button>
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
                                        {/* Grid View */}
                                        {viewMode === 'grid' && (
                                            <LightGallery

                                                speed={500}
                                                plugins={[lgThumbnail, lgZoom, lgPager]}
                                                elementClassNames="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-6"
                                                ref={lightGalleryRef}
                                                {...lightGalleryOptions}
                                            >
                                                {paginatedData.map((img, index) => (
                                                    <a
                                                        href={img}
                                                        key={`grid-${index}`}
                                                        className="group aspect-square  overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 bg-gray-100 relative cursor-pointer"
                                                        data-sub-html={`<h4>Patch ${index + 1 + ((currentPage - 1) * pageSize)}</h4>`}
                                                        data-lg-size="1400-933"
                                                    >
                                                        <img
                                                            src={img}
                                                            alt={`Patch ${index + 1}`}
                                                            className="w-full h-full object-cover object-center rounded-xl group-hover:scale-105 transition-transform duration-700"
                                                            loading="lazy"
                                                        />
                                                        {/* Image number overlay */}
                                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                            <span className="text-xs font-medium text-gray-700">
                                                                {index + 1 + ((currentPage - 1) * pageSize)}
                                                            </span>
                                                        </div>
                                                    </a>
                                                ))}
                                            </LightGallery>
                                        )}

                                        {/* List View */}
                                        {viewMode === 'list' && (
                                            <LightGallery

                                                speed={500}
                                                plugins={[lgThumbnail, lgZoom, lgPager]}
                                                ref={lightGalleryRef}
                                                {...lightGalleryOptions}
                                                elementClassNames="space-y-4"
                                            >
                                                {paginatedData.map((img, index) => (
                                                    <a
                                                        href={img}
                                                        key={`list-${index}`}
                                                        className="group flex items-center bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-cyan-100/50"
                                                        data-sub-html={`<h4>Patch ${index + 1 + ((currentPage - 1) * pageSize)}</h4>`}
                                                        data-lg-size="1400-933"
                                                    >
                                                        {/* Thumbnail */}
                                                        <div className="w-20 h-20 sm:w-32 sm:h-32 flex-shrink-0 relative overflow-hidden rounded-l-xl">
                                                            <img
                                                                src={img}
                                                                alt={`Patch ${index + 1}`}
                                                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                                                loading="lazy"
                                                            />
                                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                                                        </div>

                                                        {/* Patch details */}
                                                        <div className="p-4 flex-grow flex justify-between items-center">
                                                            <div>
                                                                <div className="flex items-center space-x-2 mb-1">
                                                                    <span className="text-sm font-medium text-gray-900">
                                                                        Patch #{index + 1 + ((currentPage - 1) * pageSize)}
                                                                    </span>

                                                                </div>


                                                            </div>

                                                            {/* Actions */}
                                                            <div className="flex items-center space-x-2">

                                                                <button className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200">
                                                                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </a>
                                                ))}
                                            </LightGallery>
                                        )}

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