import React from "react";
import { useState } from "react";
import TalonLogo from "../../assets/logo.png";
import { useEffect } from "react";
import { useLoginMutation } from "../../store/features/userApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCrendentials } from "../../store/features/authSlice";
import { toast } from "react-toastify";
const LoginForm = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Data", email, password);
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCrendentials({ ...res }));
      toast.success(res?.data?.message || "Login Successfully");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center md:-translate-y-20 2xl:-translate-y-40">
        <img src={TalonLogo} />
      </div>
      <div className="w-full max-w-md">
        <div className="text-center mb-12 ">
          <h2 className="text-2xl font-medium mb-8">Welcome Back!</h2>
        </div>

        <form onSubmit={handleLogin} className="w-full">
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 text-lg rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black cursor-pointer text-white py-3 rounded-xl flex items-center justify-center"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-7 h-7 rounded-full border-b-2 border-t-2 border-blue-500 animate-spin"></div>
              </div>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="text-center mt-6 mb-6">or</div>

          <div className="text-center">
            Don't have an account?{" "}
            <a
              href="#"
              className="underline"
              onClick={(e) => {
                e.preventDefault();
                onSwitchToRegister();
              }}
            >
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
