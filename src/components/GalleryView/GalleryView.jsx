import { Image } from 'antd';
import { GalleryGridItem, GalleryListItem } from '../components';

const GalleryView = ({
    viewMode,
    data,
    currentPage,
    pageSize,
    category,
    savedImages,
    handleSave
}) => (
    <Image.PreviewGroup>
        {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {data.map((img, index) => (
                    <GalleryGridItem
                        key={index}
                        img={img}
                        index={index}
                        isSaved={savedImages.includes(img)}
                        handleSave={handleSave}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        category={category}
                    />
                ))}
            </div>
        ) : (
            <div className="space-y-4">
                {data.map((img, index) => (
                    <GalleryListItem
                        key={`list-${index}`}
                        img={img}
                        index={index}
                        isSaved={savedImages.includes(img)}
                        handleSave={handleSave}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        category={category}
                    />
                ))}
            </div>
        )}
    </Image.PreviewGroup>
);

export default GalleryView