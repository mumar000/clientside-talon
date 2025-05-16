import React from "react";
import { useState } from "react";
import TalonLogo from "../../assets/logo.png";
import { useRegisterMutation } from "../../store/features/userApiSlice";
import { toast } from "react-toastify";

const RegisterForm = ({ onSwitchToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [register, { isLoading }] = useRegisterMutation()


    const handleRegister = async (e) => {
        e.preventDefault()
        console.log("Register", name, password)
        try {
            if (confirmPassword !== password) {
                toast.error("Password is Not Match")
                return
            }
            const res = await register({ name, email, password }).unwrap()
            toast.success(res?.data?.message || 'Successfully Registerd')
            navigate('/login')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    return (
        <>
            <div className='flex items-center justify-center '>
                <img src={TalonLogo} />
            </div>
            <div className="w-full max-w-md">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-medium mb-8">Create Account</h2>
                </div>

                <form onSubmit={handleRegister} className="w-full">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm mb-2">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm mb-2">Email address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm mb-2">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-lg flex items-center justify-center"
                    >

                        {isLoading ? (<div className="flex items-center justify-center w-8 h-8 rounded-full border-y-6 border-teal-500 animate-spin     "></div>) : 'Sign Up'}
                    </button>

                    <div className="text-center mt-6 mb-4">or</div>

                    <div className="text-center">
                        Already have an account? <a href="#" className="underline" onClick={(e) => {
                            e.preventDefault();
                            onSwitchToLogin();
                        }}>Sign In</a>
                    </div>
                </form>
            </div>
        </>
    );
};


export default RegisterForm