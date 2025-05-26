import { Heart } from 'lucide-react';
import { Image } from 'antd';
import { FaHeart } from 'react-icons/fa6';
import { IoImageOutline } from 'react-icons/io5';

const GalleryGridItem = ({
    img,
    index,
    isSaved,
    handleSave,
    currentPage,
    pageSize
}) => {
    <div className="group aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 bg-gray-100 relative">
        <Image
            src={img}
            alt={`Gallery image ${index + 1 + ((currentPage - 1) * pageSize)}`}
            className="w-full h-full object-cover object-center rounded-xl group-hover:scale-105 transition-transform duration-700"
            preview={{
                mask: (
                    <div className="flex items-center justify-center">
                        <IoImageOutline size={20} className="text-white" />
                    </div>
                )
            }}
        />
        <button
            onClick={() => handleSave(img)}
            className="absolute z-[999] cursor-pointer top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
            {isSaved ? (
                <FaHeart size={20} className='text-red-500' />
            ) : (
                <Heart size={20} className="text-gray-700 cursor-pointer" />
            )}
        </button>
    </div>
};

export default GalleryGridItem