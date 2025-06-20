//Local Import
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ScreenLoader from "../../components/ScreenLoader/ScreenLoader";
import banner from "../../assets/banner.jpg";
import {
  CustomImagePreview,
  GalleryViewMode,
} from "../../components/components";

import { useParams } from "react-router-dom";
//Icons
import { IoImageOutline } from "react-icons/io5";
import { ChevronDown, Heart, List, Maximize2, ZoomIn } from "lucide-react";
import { Toaster, toast } from "sonner";

//Ant Design
import { Image, Pagination, Spin } from "antd";

//Api Calls
import { useGetCategorySlugQuery } from "../../store/features/uploadSlice";
import { useGetPicturesQuery } from "../../store/features/uploadSlice";
import { useSavePictureMutation } from "../../store/features/userApiSlice";
import {
  useGetSavePicturesQuery,
  useUnsavePictureMutation,
} from "../../store/features/userApiSlice";
import { FaHeart } from "react-icons/fa6";

const HighLevelProduct = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropDown, setIsDropDown] = useState(false);
  const toggleDropDown = () => setIsDropDown((prev) => !prev);
  const { slug } = useParams();
  const [viewMode, setViewMode] = useState("grid");
  const pageSize = 50;
  const {
    data: getCategory,
    isLaoding: loadingSlug,
    error: errorSlug,
  } = useGetCategorySlugQuery(slug);
  const {
    data: getAllCategories,
    isLoading: loadingCat,
    error: catError,
  } = useGetPicturesQuery();

  const pictures = getCategory?.allDetail?.types?.flatMap(
    (p) => p.uploaded_Pictures
  );

  const [savePicture, { isLoading: isLoadings }] = useSavePictureMutation();
  const [unsavePicture, { isLoading, loadingUnsave }] =
    useUnsavePictureMutation();
  const {
    data: getPic,
    isLoading: isSavePicLoading,
    refetch,
  } = useGetSavePicturesQuery();
  const savedImage = getPic?.pictures?.flatMap((p) => p.pictureUrl);

  const total = pictures?.length || 0;
  const paginatedData =
    pictures?.slice((currentPage - 1) * pageSize, currentPage * pageSize) || [];

  const totalPages = Math.ceil(total / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document
      .getElementById("gallery-grid")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <ScreenLoader />;
  }

  const handleSave = async (img) => {
    try {
      const res = await savePicture({
        categoryId: getCategory?.allDetail?._id,
        pictureUrl: img,
      }).unwrap();
      toast.success("Picture Saved!");
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleUnsave = async (img) => {
    try {
      const res = await unsavePicture({
        categoryId: getCategory?.allDetail?._id,
        pictureUrl: img,
      }).unwrap();
      toast.info(res?.message);
    } catch (error) {
      console.log(error?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Main Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent z-10"></div>
        <img
          src="https://taloninternational.com/wp-content/uploads/2018/10/Trim-Labels-Hero-.png"
          alt="High Level Product Banner"
          className="w-full lg:h-96 md:h-86 h-70  object-cover"
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
                  <h1 className="lg:text-6xl md:text-5xl text-4xl font-bold text-white mb-3 tracking-wide">
                    {getCategory?.allDetail?.name}
                  </h1>
                  <div className="flex items-center space-x-4">
                    <span className="text-white/90 text-lg font-light"></span>
                  </div>
                </div>
              </div>
              <p className="text-white/80 lg:text-xl md:text-lg text-md font-bold md:font-medium leading-relaxed max-w-2xl">
                Discover our curated collection of high-quality products,
                meticulously designed for excellence and crafted with precision.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Gallery */}
      <div className="max-w-8xl mx-auto md:px-8 px-2 py-16">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/50">
          {/* Gallery Header */}
          <div className="px-10 py-8 border-b border-gray-100/80">
            <div className="flex md:flex-row flex-col gap-2  items-center justify-between">
              <div>
                <h2 className="md:text-4xl text-3xl font-light text-gray-800 mb-2">
                  Gallery Overview
                </h2>
                <p className="text-gray-600 font-light">
                  Page {currentPage} of {totalPages} • Showing{" "}
                  {paginatedData.length} of {total} items
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <GalleryViewMode
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                />
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
                                ${
                                  isDropDown
                                    ? "scale-100 opacity-100 visible"
                                    : "scale-95 opacity-0 invisible delay-100" // Added delay-100 here
                                }`}
                  >
                    {getAllCategories?.category?.map((item, idx) => (
                      <Link
                        to={`/${item?.slug}`}
                        index={idx}
                        className="block px-4 py-2 z-[9999] text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {item?.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="p-10" id="gallery-grid">
            {loadingSlug ? (
              <div className="flex justify-center items-center py-32">
                <div className="text-center">
                  <div className="inline-block w-10 h-10 border-3 border-gray-200 border-t-gray-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-500 font-light">Loading images...</p>
                </div>
              </div>
            ) : errorSlug ? (
              <div className="text-center py-32">
                <div className="text-6xl text-gray-300 mb-4">⚠</div>
                <h3 className="text-xl text-gray-600 font-light mb-2">
                  Unable to load images
                </h3>
                <p className="text-gray-500">Please try refreshing the page</p>
              </div>
            ) : paginatedData.length === 0 ? (
              <div className="text-center py-32">
                <div className="text-6xl text-gray-300 mb-4">📷</div>
                <h3 className="text-xl text-gray-600 font-light mb-2">
                  No images found
                </h3>
                <p className="text-gray-500">
                  This collection is currently empty
                </p>
              </div>
            ) : (
              <>
                {/* Ant Design Image Gallery */}
                <CustomImagePreview viewMode={viewMode} images={paginatedData}>
                  {viewMode === "grid" && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                      {pictures.map((img, index) => {
                        const isSaved = savedImage?.includes(img);
                        return (
                          <div
                            key={index}
                            className="group aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 bg-gray-100 relative"
                          >
                            <Image
                              src={img}
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
                            {/* Heart button overlay */}
                            <div className="absolute z-[888] top-3 left-3  transition-opacity duration-300">
                              {isSaved ? (
                                <button
                                  onClick={() => handleUnsave(img)}
                                  className="p-2 rounded-full cursor-pointer bg-white/30 backdrop-blur-sm shadow-md hover:bg-white/50 hover:shadow-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center"
                                  aria-label="Unsave Image" // Good for accessibility
                                >
                                  <FaHeart
                                    size={22} // Slightly smaller for a more refined look, adjust as needed
                                    className="text-red-500" // Always red when saved
                                  />
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleSave(img)}
                                  className="p-2 rounded-full bg-white/30 cursor-pointer  backdrop-blur-sm shadow-md hover:bg-white/50 hover:shadow-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center"
                                  aria-label="Save Image" // Good for accessibility
                                >
                                  <Heart
                                    size={22} // Consistent size
                                    className="text-gray-700 cursor-pointer hover:text-red-500  transition-colors duration-300" // Grey by default, turns red on hover (for unsaved)
                                  />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {viewMode === "list" && (
                    <div className="space-y-4">
                      {paginatedData.map((img, index) => {
                        const isSaved = savedImage?.includes(img);
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
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                                preview={{
                                  mask: (
                                    <div className="flex items-center justify-center">
                                      <IoImageOutline
                                        size={20}
                                        className="text-white"
                                      />
                                    </div>
                                  ),
                                }}
                              />
                            </div>

                            {/* Image details */}
                            <div className="p-4 flex-grow flex justify-between items-center">
                              <div>
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="text-sm font-medium text-gray-900">
                                    Image{" "}
                                    {index + 1 + (currentPage - 1) * pageSize}
                                  </span>
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-800">
                                    {getCategory?.allDetail?.name}
                                  </span>
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleSave(img)}
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                  {isSaved ? (
                                    <FaHeart
                                      size={20}
                                      className="text-red-500 "
                                    />
                                  ) : (
                                    <Heart
                                      size={20}
                                      className="text-gray-700 cursor-pointer"
                                    />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CustomImagePreview>

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
  );
};

export default HighLevelProduct;
