import React from "react";
import { useState } from "react";
import TalonLogo from "../../assets/logo.png";
import { useRegisterMutation } from "../../store/features/userApiSlice";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
const RegisterForm = ({ onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async (e) => {
    e.preventDefault();
    // Email validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return;
    }

    // Password validation
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    if (!/[0-9]/.test(password)) {
      toast.error("Password must contain at least one number");
      return;
    }
    if (confirmPassword !== password) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await register({ name, email, password }).unwrap();
      toast.success(res?.data?.message || "Successfully Registered");
      if (res?.success) onSwitchToLogin();
      setEmail("");
      setName("");
      setPassword("");
    } catch (err) {
      const errorMessage =
        err?.data?.message ||
        err.error ||
        "Network error, please try again later.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md">
      <img src={TalonLogo} alt="Talon Logo" className="mb-12" />
      <h2 className="text-2xl font-medium mb-8 text-center">Create Account</h2>
      <form onSubmit={handleRegister} className="w-full">
        {[
          {
            label: "Full Name",
            type: "text",
            value: name,
            onChange: setName,
            id: "name",
          },
          {
            label: "Email address",
            type: "email",
            value: email,
            onChange: setEmail,
            id: "email",
          },
          {
            label: "Password",
            type: "password",
            value: password,
            onChange: setPassword,
            id: "password",
          },
          {
            label: "Confirm Password",
            type: "password",
            value: confirmPassword,
            onChange: setConfirmPassword,
            id: "confirmPassword",
          },
        ].map(({ label, type, value, onChange, id }) => (
          <div key={id} className="mb-4">
            <label htmlFor={id} className="block text-sm mb-2">
              {label}
            </label>
            <input
              type={type}
              id={id}
              aria-label={label}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg flex items-center justify-center"
        >
          {isLoading ? (
            <div className="flex items-center justify-center w-8 h-8 rounded-full border-y-6 border-teal-500 animate-spin"></div>
          ) : (
            "Sign Up"
          )}
        </button>
        <div className="text-center mt-6 mb-4">or</div>
        <div className="text-center">
          Already have an account?{" "}
          <a
            href="#"
            className="underline"
            onClick={(e) => {
              e.preventDefault();
              onSwitchToLogin();
            }}
          >
            Sign In
          </a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
