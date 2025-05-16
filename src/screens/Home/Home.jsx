import React from 'react';
import image from '../../assets/hero.png';
import image1 from '../../assets/hproduct.png';
import image2 from '../../assets/zippers.png';
import image3 from '../../assets/ptrim.png';
import image4 from '../../assets/patches.png';
import { Link } from 'react-router-dom';


const categoriesCard = [
    { image: image1, title: 'High Level Product', route: '/highlevel' },
    { image: image2, title: 'Zippers', route: '/zippers' },
    { image: image3, title: 'Paper Trim', route: '/papertrim' },
    { image: image4, title: 'Patches', route: '/patches' },
    { image: image1, title: 'Patches', route: '/patches' },
    { image: image3, title: 'Patches', route: '/patches' },
    { image: image2, title: 'Patches', route: '/patches' },
    { image: image4, title: 'Patches', route: '/patches' },
    { image: image1, title: 'Patches', route: '/patches' },
    { image: image3, title: 'Patches', route: '/patches' },
];

const Home = () => {
    return (
        <div className='py-8  bg-gray-50 min-h-screen'>
            <div className='flex flex-col items-center gap-2'>
                <div>
                    <img src={image} alt="Main Banner" />
                </div>
                <div className='w-full px-12'>
                    <div className='w-full  rounded-xl bg-white min-h-100'>
                        <div className='flex flex-col py-2 px-5'>
                            <div className='flex flex-row items-center justify-between border-b-2 border-gray-300 pb-3 gap-2 '>
                                <h1 className='text-xl font-medium'>Select Category</h1>
                                <div>
                                    <button className='px-2 py-1 text-xs bg-gray-200 rounded-lg'>
                                        Filter By Category
                                    </button>
                                </div>
                            </div>

                            {/* Cards Mapping */}
                            <div className='grid lg:grid-cols-5 items-center gap-3  py-2'>
                                {categoriesCard.map((category, index) => (
                                    <Link to={category.route} key={index} className="relative w-64">
                                        <div className="group  overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-gray-50">
                                            <img
                                                src={category.image}
                                                alt={category.title}
                                                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>

                                    </Link>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
