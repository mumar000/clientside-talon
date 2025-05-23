import React from 'react'
import image from '../../assets/banner.jpg'
import { Link } from 'react-router-dom'
import { useGetPicByCategoryQuery } from '../../store/features/uploadSlice'
import { useState } from 'react'
import { Image, Pagination, Spin, Empty, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ScreenLoader } from '../../components/components'
import { useEffect } from 'react'
import { ChevronLeft } from 'lucide-react'
const Patches = () => {
    const [category, setCategory] = useState('Patches');
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 50;
    const { data, isLoading, error } = useGetPicByCategoryQuery(category);

    // Calculate pagination values
    const total = data?.pictures?.length || 0;
    const paginatedData = data?.pictures?.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    ) || [];

    const totalPages = Math.ceil(total / pageSize)

    const handlePageChange = (page) => {
        setCurrentPage(page);
        document.getElementById('gallery-grid').scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [category])
    return (
        <>
            {loading ? (<ScreenLoader />) : (
                <div className="min-h-screen bg-gradient-to-br from-gray-50 via-cyan-50 to-slate-100">
                    {/* Hero Banner */}
                    <div className="relative overflow-hidden">
                        <div className='absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent z-10'></div>
                        <img
                            src={image}
                            alt="Zippers Banner"
                            className="w-full h-92 object-cover object-center"
                        />
                        <div className='absolute inset-0  z-20 flex items-center'>
                            <div className='max-w-8xl mx-auto px-8 w-full'>
                                <div className='max-w-3xl'>
                                    <div className='flex items-center mb-4'>
                                        <Link to='/'>
                                            <button className='mr-6 p-3 bg-white/30 backdrop-blur-sm hover:bg-white/60 cursor-pointer rounded-full transition-all duration-300 group'>
                                                <ChevronLeft size={20} className='group-hover:-translate-x-1 transition-transform group-hover:transform group-hover:scale-102' />
                                            </button>
                                        </Link>
                                        <div>
                                            <h1 className='text-5xl font-light text-white mb-3 tracking wide'>
                                                {category}
                                            </h1>
                                            <div className="flex items-center space-x-4">
                                                <span className="text-white/90 text-lg font-light">
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className='text-white/80  text-xl font-light leading-relaxed max-w-2xl'>    Customize your clothes with our stylish and durable patches.
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
                            <div className='px-10 py-2 border-b border-gray-100/50'>
                                <div>
                                    <h1 className='text-3xl font-light text-gray-800 mb-2'>
                                        Collection Overview
                                    </h1>
                                    <p className='text-gray-600 font-light'>
                                        Page {currentPage} of {totalPages} Showing {paginatedData.length} of {total} items
                                    </p>
                                </div>
                                <div className='text-right'>
                                    <div className='text-2xl font-light text-gray-700'>
                                        {String(currentPage).padStart(2, '0')}
                                    </div>
                                    <div className='text-sm text-gray-500 uppercase tracking-wider'>
                                        Current Page
                                    </div>
                                </div>
                            </div>

                            <div className="p-8" id="gallery-grid">
                                {isLoading ? (
                                    <div className="flex justify-center items-center py-20">
                                        <Spin size="large" />
                                    </div>
                                ) : error ? (
                                    <Empty
                                        description={error?.message}
                                        className="py-16"
                                    />
                                ) : paginatedData.length === 0 ? (
                                    <Empty
                                        description="No images found"
                                        className="py-16"
                                    />
                                ) : (
                                    <>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                            {paginatedData.map((img, index) => (
                                                <div
                                                    key={index}
                                                    className="group aspect-square h-70 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-gray-50"
                                                >
                                                    <Image
                                                        src={img}
                                                        alt={`Gallery image ${index + 1}`}
                                                        // preview={{
                                                        //     mask: false, // Hide the preview icon overlay for cleaner look
                                                        // }}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                            objectPosition: 'center',
                                                            transform: 'scale(1)',
                                                            transition: 'transform 0.3s ease'
                                                        }}
                                                        className="group-hover:scale-102"
                                                        wrapperClassName="w-full h-full"
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {total > pageSize && (
                                            <div className="flex justify-center mt-10">
                                                <Pagination
                                                    current={currentPage}
                                                    pageSize={pageSize}
                                                    total={total}
                                                    onChange={handlePageChange}
                                                    showSizeChanger={false}
                                                    showQuickJumper
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
}

export default Patches
