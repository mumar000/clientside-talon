
import { Image } from 'antd';
import { Heart } from 'lucide-react';
import { FaHeart } from 'react-icons/fa6';
import { IoImageOutline } from 'react-icons/io5';

const GalleryListItem = ({
    img,
    index,
    isSaved,
    handleSave,
    currentPage,
    pageSize,
    category
}) => (
    <div className="group flex items-center bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
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
        </div>

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

            <button
                onClick={() => handleSave(img)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
                {isSaved ? (
                    <FaHeart size={20} className='text-red-500' />
                ) : (
                    <Heart size={20} className="text-gray-700 cursor-pointer" />
                )}
            </button>
        </div>
    </div>
);

export default GalleryListItem