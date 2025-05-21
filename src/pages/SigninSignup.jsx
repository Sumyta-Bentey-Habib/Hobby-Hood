import React from "react";
import { NavLink } from "react-router-dom";
import bgsignin from "../assets/images/bgsignin.jpg";
import bgsignup from "../assets/images/bgsingup.jpg";

const SigninSignup = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sign Up Section */}
      <div
        className="w-full md:w-1/2 flex items-center justify-center text-white p-6 relative"
        style={{
          backgroundImage: `url(${bgsignup})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center max-w-md bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Hey, Buddy</h2>
          <p className="mb-6 text-base md:text-lg">
            Enter your personal information and start your journey with us.
          </p>
          <NavLink
            to="/signup"
            className="inline-block bg-white text-black font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-gray-200 transition"
          >
            Go to Sign Up
          </NavLink>
        </div>
      </div>

      {/* Sign In Section */}
      <div
        className="w-full md:w-1/2 flex items-center justify-center text-white p-6 relative"
        style={{
          backgroundImage: `url(${bgsignin})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Sign In</h2>
          <form>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="input input-bordered w-full mb-4"
              placeholder="Enter your email"
              required
            />

            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              className="input input-bordered w-full mb-6"
              placeholder="Enter your password"
              required
            />

            <button type="submit" className="btn btn-primary w-full mb-4">
              Login
            </button>
          </form>

          <p className="text-center mb-4">or</p>

          <button className="btn bg-white text-black w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 transition">
            <svg
              aria-label="Google logo"
              width="18"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path fill="#fff" d="M0 0h512v512H0z" />
                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                <path fill="#4285f4" d="M386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                <path fill="#fbbc02" d="M90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                <path fill="#ea4335" d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
              </g>
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};
export default SigninSignup;
