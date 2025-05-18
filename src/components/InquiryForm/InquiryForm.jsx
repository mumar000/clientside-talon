import { useState } from 'react';
import { useSubmitInquiryMutation } from '../../store/features/userApiSlice';
import { toast } from 'react-toastify';
// Form Component
const InquiryForm = () => {
    const [formData, setFormData] = useState({
        areaOfInterest: '',
        fullName: '',
        company: '',
        companyEmail: '',
        phone: '',
        comments: ''
    });

    const [submitForm, { isLoading }] = useSubmitInquiryMutation()

    const reset = () => {
        setFormData({
            areaOfInterest: '',
            fullName: '',
            company: '',
            companyEmail: '',
            phone: '',
            comments: ''
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        try {
            const res = await submitForm(formData).unwrap()
            toast.success(res?.message)
            reset()
        } catch (err) {
            console.log("Error", err?.data?.message)
        }
    };

    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-normal mb-2">
                    Area of interest
                </label>
                <div className="relative">
                    <select
                        name="areaOfInterest"
                        value={formData.areaOfInterest}
                        onChange={handleChange}
                        className="appearance-none w-full bg-white  -gray-300 py-2 px-3 text-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                        <option value="">Area of interest</option>
                        <option value="sales">Sales</option>
                        <option value="support">Support</option>
                        <option value="other">Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-normal mb-2">
                    Full Name
                </label>
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your First Name"
                    className="appearance-none w-full bg-white  -gray-300 py-2 px-3 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-normal mb-2">
                    Company
                </label>
                <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company"
                    className="appearance-none w-full bg-white  -gray-300 py-2 px-3 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-normal mb-2">
                    Company Email
                </label>
                <input
                    type="email"
                    name="companyEmail"
                    value={formData.companyEmail}
                    onChange={handleChange}
                    placeholder="Company Email"
                    className="appearance-none w-full bg-white  -gray-300 py-2 px-3 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-normal mb-2">
                    Phone
                </label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="appearance-none w-full bg-white  -gray-300 py-2 px-3 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-normal mb-2">
                    Comments / Questions
                </label>
                <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Comments"
                    rows="4"
                    className="appearance-none w-full bg-white  -gray-300 py-2 px-3 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
            </div>
            <div>
                <button
                    type='submit'
                    className='px-6 hover:bg-gray-800 flex items-center justify-center hover:scale-102 transition-all ease-in-out duration-300 cursor-pointer  py-3  rounded-full  bg-black text-white text-md '>
                    {isLoading ? (<div className='w-8 h-8 rounded-full border-y-4 border-blue-300 animate-spin'></div>) : 'Submit Inquiry'}
                </button>
            </div>
        </form>
    );
};

export default InquiryForm