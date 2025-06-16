import { useEffect, useState } from "react";
import { LoginForm, RegisterForm } from "../../components/components";
import photo3 from "../../assets/authPhoto3.png";
import photo1 from "../../assets/authPhoto1.png";
export default function AuthScreen() {
  const [currentForm, setCurrentForm] = useState("login");

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Left Section - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-white p-8">
        {currentForm === "login" ? (
          <LoginForm onSwitchToRegister={() => setCurrentForm("register")} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setCurrentForm("login")} />
        )}
      </div>

      {/* Right Section - Gray background for images */}
      <div className="hidden md:block md:w-1/2 bg-gray-100 overflow-hidden relative">
        {/* Centered overlay text */}
        {/* <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <h1 className="text-white text-5xl font-extrabold drop-shadow-lg">
                        Talon International
                    </h1>
                </div> */}

        {/* Image stack */}
        <div className="flex flex-col">
          <img
            src="https://taloninternational.com/wp-content/uploads/2018/09/Vintage-Page-Hero-1.png"
            className="w-full object-cover"
            alt="Vintage"
          />
          <img
            src="https://taloninternational.com/wp-content/uploads/2018/10/Trim-Hardware-Hero-.png"
            className="w-full h-auto object-cover"
            alt="Trim Hardware"
          />
          <img
            src="https://taloninternational.com/wp-content/uploads/2018/08/Patches-HERO-Background-3-.png"
            className="w-full h-auto object-cover"
            alt="Patches"
          />
          <img
            src="https://taloninternational.com/wp-content/uploads/2018/10/Packaging-Boxes-Hero-.png"
            className="w-full object-cover"
            alt="Packaging Boxes"
          />
        </div>
      </div>
    </div>
  );
}
