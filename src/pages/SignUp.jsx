import React from 'react';
import { NavLink } from 'react-router-dom';
const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-400 to-indigo-400 p-6">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8 space-y-6 animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>
        <p className="text-center text-gray-500 text-sm">
          Join us to explore amazing content and features!
        </p>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="mt-1 input input-bordered w-full"
              placeholder="Your Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 input input-bordered w-full"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Photo URL</label>
            <input
              type="photo"
              className="mt-1 input input-bordered w-full"
              placeholder="photo URL"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 input input-bordered w-full"
              placeholder="••••••••"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="mt-1 input input-bordered w-full"
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full mt-2">
            Sign Up
          </button>
        </form>
        <div className="text-center text-sm text-gray-600">or</div>
        <button className="btn bg-white text-black border border-gray-300 w-full flex items-center justify-center gap-2 hover:bg-gray-100 transition">
          <svg
            aria-label="Google logo"
            width="20"
            height="20"
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
          Sign up with Google
        </button>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <NavLink to="/sign-in-sign-up" className="text-blue-600 hover:underline">
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
