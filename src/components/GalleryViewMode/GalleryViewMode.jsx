// components/GalleryViewMode.js
import { IoGridOutline } from "react-icons/io5";
import { List } from 'lucide-react';

const GalleryViewMode = ({ viewMode, setViewMode }) => {
    return (
        <div className='bg-gray-100 rounded-lg p-1 flex'>
            <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 cursor-pointer rounded-md flex items-center transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-600'
                    }`}
            >
                <IoGridOutline size={20} />
                <span className="ml-2">Grid</span>
            </button>
            <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-md cursor-pointer flex items-center transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'
                    }`}
            >
                <List size={20} />
                <span className="ml-2">List</span>
            </button>
        </div>
    );
};

export default GalleryViewMode;