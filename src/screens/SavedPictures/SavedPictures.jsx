import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useGetSavePicturesQuery } from "../../store/features/userApiSlice";
import { Image, Pagination, Spin, Empty } from "antd";
import { Download } from "lucide-react";
import { CustomImagePreview } from "../../components/components";
const SavedPictures = () => {
  const { data: getSavePic, isLoading: loading } = useGetSavePicturesQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const pictureUrl = getSavePic?.pictures?.flatMap((p) => p.pictureUrl) || [];

  // Pagination logic
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return pictureUrl.slice(startIndex, endIndex);
  }, [pictureUrl, currentPage, pageSize]);

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
    // Smooth scroll to top of gallery
    document.getElementById("gallery-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent z-10"></div>
        <img
          src="https://taloninternational.com/wp-content/uploads/2018/10/Trim-Labels-Hero-.png"
          alt="High Level Product Banner"
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-7xl mx-auto px-8 w-full">
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                </Link>
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 tracking-wide">
                    Saved Images
                  </h1>
                </div>
              </div>
              <p className="text-white/80 text-xl font-medium leading-relaxed max-w-2xl">
                Discover your curated collection of high-quality images,
                meticulously saved for your inspiration and projects.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Controls */}
      <div id="gallery-section" className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex justify-end items-center mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">Show:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
            >
              <option value={15}>15 per page</option>
              <option value={30}>30 per page</option>
              <option value={45}>45 per page</option>
              <option value={60}>60 per page</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Spin size="large" />
              <p className="mt-4 text-gray-600 font-medium">
                Loading your saved images...
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && pictureUrl.length === 0 && (
          <div className="flex justify-center items-center py-20">
            <Empty
              description={
                <div className="text-center">
                  <p className="text-gray-600 text-lg mb-2">
                    No saved images yet
                  </p>
                  <p className="text-gray-500">
                    Start saving images to see them here
                  </p>
                </div>
              }
            />
          </div>
        )}

        {/* Image Gallery */}
        {!loading && paginatedData.length > 0 && (
          <CustomImagePreview images={paginatedData}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {paginatedData.map((url, index) => (
                <div
                  key={`${currentPage}-${index}`}
                  className="group aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 bg-gray-100 relative"
                >
                  <Image
                    src={url}
                    alt={`Gallery image`}
                    className="w-full h-full object-cover object-center rounded-xl group-hover:scale-105 transition-transform duration-700"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      borderRadius: "12px",
                    }}
                    wrapperClassName="w-full h-full"
                  />
                </div>
              ))}
            </div>
          </CustomImagePreview>
        )}

        {/* Pagination */}
        {!loading && pictureUrl.length > 0 && (
          <div className="flex justify-center mt-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
              <Pagination
                current={currentPage}
                total={pictureUrl.length}
                pageSize={pageSize}
                onChange={handlePageChange}
                showSizeChanger={false}
                showQuickJumper
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} of ${total} images`
                }
                className="modern-pagination"
              />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .modern-pagination .ant-pagination-item {
          border-radius: 8px !important;
          border: 1px solid #e5e7eb !important;
          margin: 0 4px !important;
        }
        .modern-pagination .ant-pagination-item-active {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
          border-color: #3b82f6 !important;
        }
        .modern-pagination .ant-pagination-item-active a {
          color: white !important;
        }
        .modern-pagination .ant-pagination-prev,
        .modern-pagination .ant-pagination-next,
        .modern-pagination .ant-pagination-jump-prev,
        .modern-pagination .ant-pagination-jump-next {
          border-radius: 8px !important;
          border: 1px solid #e5e7eb !important;
        }
      `}</style>
    </div>
  );
};

export default SavedPictures;
