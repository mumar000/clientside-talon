import React from 'react'
import { InquiryForm } from '../../components/components'
const InquiryPage = () => {
    return (
        <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
            <div className="w-full md:w-1/2 p-6 md:p-12">
                <InquiryForm />
            </div>

            <div className="w-full md:w-1/2 bg-gray-100 p-6 md:p-12">
                <div className="mb-12">
                    <h2 className="text-xl font-semibold mb-4">USA WORLD HEADQUARTERS</h2>
                    <p className="text-gray-600">
                        21900 BURBANK BOULEVARD SUITE 101<br />
                        WOODLAND HILLS, CA 91367
                    </p>
                    <div className="mt-6">
                        <p className="text-gray-600">E USA@TALONZIPPERS.COM</p>
                        <p className="text-gray-600">T 818 444 4100</p>
                        <p className="text-gray-600">F 818 444 4105</p>
                    </div>
                </div>

                <div className="border-t border-gray-300 pt-8 mb-12"></div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">ASIA HEADQUARTERS</h2>
                    <p className="text-gray-600">
                        UNIT 108, 1/F., SUNBEAM CENTRE<br />
                        27 SHING YIP STREET, KWUN TONG,<br />
                        HONG KONG
                    </p>
                    <div className="mt-6">
                        <p className="text-gray-600">E ASIA@TALONZIPPERS.COM</p>
                        <p className="text-gray-600">T 852 2947 0888</p>
                        <p className="text-gray-600">F 852 2947 7973</p>
                    </div>
                </div>

                <div className="mt-8 flex justify-center space-x-4">
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-sm">
                        &lt;
                    </button>
                    <span className="flex items-center text-gray-600">8 / 22</span>
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-sm">
                        &gt;
                    </button>
                </div>
            </div>
        </div>

    )
}

export default InquiryPage
