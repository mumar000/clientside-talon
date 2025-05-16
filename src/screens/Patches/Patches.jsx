import React from 'react'
import image from '../../assets/image-2.png'
import { Link } from 'react-router-dom'
import { useGetPicByCategoryQuery } from '../../store/features/uploadSlice'
import { useState } from 'react'
import { Image, Pagination, Spin, Empty, Dropdown, Button } from 'antd';
import { DownOutlined, FilterOutlined, ArrowLeftOutlined } from '@ant-design/icons';
const Patches = () => {
    const [category, setCategory] = useState('Patches');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 50;
    const { data, isLoading, error } = useGetPicByCategoryQuery(category);

    // Calculate pagination values
    const total = data?.pictures?.length || 0;
    const paginatedData = data?.pictures?.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    ) || [];

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Scroll to top of grid when changing page
        document.getElementById('gallery-grid').scrollIntoView({ behavior: 'smooth' });
    };

    // const filterItems = [
    //     {
    //         key: '1',
    //         label: 'All Patches',
    //         onClick: () => setCategory('Patches'),
    //     },
    //     {
    //         key: '2',
    //         label: 'Metal Zippers',
    //         onClick: () => setCategory('Metal Zippers'),
    //     },
    //     {
    //         key: '3',
    //         label: 'Plastic Zippers',
    //         onClick: () => setCategory('Plastic Zippers'),
    //     },
    //     {
    //         key: '4',
    //         label: 'Invisible Zippers',
    //         onClick: () => setCategory('Invisible Zippers'),
    //     },
    // ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Banner */}
            <div className="w-full relative mb-8">
                <img
                    src={image}
                    alt="Zippers Banner"
                    className="w-full h-64 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center">
                    <div className="container mx-auto px-8">
                        <h1 className="text-4xl font-bold text-white mb-2">Patches Collection</h1>
                        <p className="text-white/80 max-w-xl">
                            Browse our complete collection of high-quality Patches for all your manufacturing needs
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className=" px-4 mb-12">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-center justify-between px-8 py-6 border-b border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
                            {category} <span className="text-gray-400 text-lg ml-2 font-normal">({total} items)</span>
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {/* <Dropdown
                                // menu={{ items: filterItems }}
                                placement="bottomRight"
                            // trigger={['click']}
                            >
                                <Button
                                    className="flex items-center px-5"
                                    icon={<FilterOutlined />}
                                >
                                    Filter <DownOutlined className="ml-2 text-xs" />
                                </Button>
                            </Dropdown> */}
                            <Link to="/">
                                <Button
                                    type="primary"
                                    className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-600"
                                    icon={<ArrowLeftOutlined />}
                                >
                                    Back
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Gallery Grid with Pagination */}
                    <div className="p-8" id="gallery-grid">
                        {isLoading ? (
                            <div className="flex justify-center items-center py-20">
                                <Spin size="large" />
                            </div>
                        ) : error ? (
                            <Empty
                                description="Failed to load images"
                                className="py-16"
                            />
                        ) : paginatedData.length === 0 ? (
                            <Empty
                                description="No images found"
                                className="py-16"
                            />
                        ) : (
                            <>
                                {/* Image Grid */}
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

                                {/* Pagination */}
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

            {/* Footer Information */}

        </div>
    );
}

export default Patches
