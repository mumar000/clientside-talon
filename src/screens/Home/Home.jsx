import React from "react";
import { Link } from "react-router-dom";
// Assuming these imports are still relevant, otherwise they can be removed
// import image4 from "../../assets/boxes4.png";
import { useGetPicturesQuery } from "../../store/features/uploadSlice";
import { CardSkeleton } from "../../components/components";

// Consider if these static image imports are necessary if data comes from API
// const zippersImg =
//   "https://taloninternational.com/wp-content/uploads/2018/11/Homepage-Products-Zippers.jpg";
// const patchImg =
//   "https://taloninternational.com/wp-content/uploads/2018/08/Trim-Patches-Silicone2.jpg";
// const highLevel =
//   "https://taloninternational.com/wp-content/uploads/2018/10/Trim-Heat-Transfer-Hero--750x730.png";

const Home = () => {
  const { data: getCategories, isLoading: loading } = useGetPicturesQuery();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 font-sans antialiased">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-66 md:h-[500px] lg:h-[300px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10"></div>
        <img
          src="https://taloninternational.com/wp-content/uploads/2018/06/Home-Page-Creative-1-1-1920x1080.png"
          alt="Hero Banner"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="relative z-20 text-center text-white p-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-3 sm:mb-4 tracking-tight leading-tight">
            EVERY. DETAIL. MATTERS.
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light opacity-90 max-w-xl mx-auto">
            OVER 128 YEARS OF QUALITY SERVICE
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Our Collections
          </h2>
          <div className="w-20 h-0.5 bg-gray-400 mx-auto mb-5"></div>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Explore our carefully curated categories, each designed to inspire
            and elevate your creative projects.
          </p>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <CardSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-0">
            {getCategories?.category.map((category, index) => (
              <Link
                to={category.slug}
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-500 bg-white"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={category?.types[0]?.uploaded_Pictures?.[0]}
                    alt={category.title}
                    className="w-full  h-46 sm:h-72 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                    {category.name}
                  </h3>

                  <div className="flex items-center text-black group-hover:text-gray-800 transition-colors">
                    <span className="text-sm font-medium">
                      Explore Collection
                    </span>
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>

                {/* Hover Line */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gray-800 to-gray-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </Link>
            ))}
          </div>
        )}

        {/* Bottom CTA Section */}
        <section className="mt-20 sm:mt-24 lg:mt-32 text-center bg-gray-900 rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 text-white shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-5">
            Need Something Custom?
          </h3>
          <p className="text-gray-300 text-base sm:text-lg mb-7 sm:mb-8 max-w-xl mx-auto leading-relaxed">
            Our team specializes in creating bespoke solutions tailored to your
            unique requirements.
          </p>
          <Link
            to="/inquiry"
            className="inline-flex items-center justify-center bg-white text-gray-900 px-7 py-3 sm:px-8 sm:py-3.5 rounded-full font-bold text-base hover:bg-gray-200 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Get in Touch
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Home;
