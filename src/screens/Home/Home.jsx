import React from "react";
import { Link } from "react-router-dom";
import image4 from "../../assets/boxes4.png";
import { useGetPicturesQuery } from "../../store/features/uploadSlice";

const zippersImg =
  "https://taloninternational.com/wp-content/uploads/2018/11/Homepage-Products-Zippers.jpg";
const patchImg =
  "https://taloninternational.com/wp-content/uploads/2018/08/Trim-Patches-Silicone2.jpg";
const highLevel =
  "https://taloninternational.com/wp-content/uploads/2018/10/Trim-Heat-Transfer-Hero--750x730.png";

const categoriesCard = [
  {
    image: highLevel,
    title: "High Level Product",
    route: "/highlevel",
    description: "Premium quality materials",
  },
  {
    image: zippersImg,
    title: "Zippers",
    route: "/zippers",
    description: "Durable & stylish closures",
  },
  {
    image: image4,
    title: "Paper Trim",
    route: "/papertrim",
    description: "Elegant finishing touches",
  },
  {
    image: patchImg,
    title: "Patches",
    route: "/patches",
    description: "Creative design elements",
  },
];

const Home = () => {
  const { data: getCategories, isLaoding: loading } = useGetPicturesQuery();
  console.log(getCategories?.category);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10"></div>
        <img
          src="https://taloninternational.com/wp-content/uploads/2018/06/Home-Page-Creative-1-1-1920x1080.png"
          alt="Hero Banner"
          className="w-full h-72 object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-7xl font-bold mb-4 tracking-wide">
              EVERY. DETAIL. MATTERS.
            </h1>
            <p className="text-2xl font-medium opacity-90">
              OVER 128 YEARS OF QUALITY SERVICE
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Collections
          </h2>
          <div className="w-24 h-0.5 bg-gray-400 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Explore our carefully curated categories, each designed to inspire
            and elevate your creative projects
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {getCategories?.category.map((category, index) => (
            <Link
              to={category._id}
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={category?.types[0]?.uploaded_Pictures?.[0]}
                  alt={category.title}
                  className="w-full h-77 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Floating Badge */}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-medium text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                  {category.name}
                </h3>
                {/* <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {category.description}
                </p> */}

                {/* CTA */}
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

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center bg-gray-900 rounded-3xl p-12 text-white">
          <h3 className="text-3xl font-light mb-4">Need Something Custom?</h3>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Our team specializes in creating bespoke solutions tailored to your
            unique requirements
          </p>
          <Link
            to="/inquiry"
            className="bg-white text-gray-900  px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
    </div>
  );
};

export default Home;
