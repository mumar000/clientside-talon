import { useEffect, useState } from 'react';
import { LoginForm, RegisterForm } from '../../components/components';
import photo3 from '../../assets/authPhoto3.png'
import photo1 from '../../assets/authPhoto1.png'
export default function AuthScreen() {

    const [currentForm, setCurrentForm] = useState('login')

    return (
        <div className="flex flex-col md:flex-row h-screen w-full">
            {/* Left Section - Login Form */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-white p-8">
                {currentForm === 'login' ? (
                    <LoginForm onSwitchToRegister={() => setCurrentForm('register')} />
                ) : (
                    <RegisterForm onSwitchToLogin={() => setCurrentForm('login')} />
                )}
            </div>

            {/* Right Section - Gray background for images */}
            <div className="hidden md:block md:w-1/2 bg-gray-100 overflow-hidden">
                {/* You can add your images here */}
                <div className='flex flex-row items-center px-8 gap-4'>
                    <img src={photo1} className='max-w-full ' />
                    <img src={photo3} className='max-w-full ' />
                    <img src={photo1} className='max-w-full ' />
                </div>
            </div>
        </div>
    );
}



