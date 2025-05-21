import React, { useState } from "react";
import { auth, googleProvider } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, photo, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match!", "error");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photo,
      });
      Swal.fire("Success", "Account created successfully!", "success");
      navigate("/");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      Swal.fire("Success", "Signed up with Google!", "success");
      navigate("/");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-400 to-indigo-400 p-6">
      <div className="bg-white rounded-xl w-full max-w-md p-8 space-y-6 shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>
        <form className="space-y-4" onSubmit={handleSignup}>
          <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required className="input input-bordered w-full" />
          <input type="email" name="email" placeholder="you@example.com" onChange={handleChange} required className="input input-bordered w-full" />
          <input type="text" name="photo" placeholder="Photo URL" onChange={handleChange} required className="input input-bordered w-full" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="input input-bordered w-full" />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required className="input input-bordered w-full" />
          <button type="submit" className="btn btn-primary w-full mt-2">
            Sign Up
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">or</div>

        <button
          onClick={handleGoogleSignup}
          className="btn bg-white text-black border w-full flex items-center justify-center gap-2 hover:bg-gray-100"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" width="20" />
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
