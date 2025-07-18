import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import Swal from "sweetalert2";
import bgsignup from "../assets/images/bgsingup.jpg";
import { Typewriter } from "react-simple-typewriter";
import { FaHome } from "react-icons/fa";

const Register = () => {
  useEffect(()=>{
    document.title="Register || Hobby Hood";
  },[]);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      Swal.fire("Success", "Account created successfully!", "success");
      navigate("/");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      Swal.fire("Success", "Google Sign-Up successful!", "success");
      navigate("/");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen p-6"
      style={{
        backgroundImage: `url(${bgsignup})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 w-full max-w-md p-8 text-center shadow-lg bg-white/10 backdrop-blur-sm rounded-xl">
        <h2 className="mb-4 text-4xl font-extrabold text-white">Join Us!</h2>
        <p className="mb-6 text-indigo-200">
          <Typewriter
            words={[
              "Create your account.",
              "Discover new hobbies.",
              "Connect with passionate people.",
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </p>

        <form onSubmit={handleRegister} className="text-left">
          <input
            type="text"
            className="w-full mb-4 input input-bordered"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="w-full mb-4 input input-bordered"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full mb-6 input input-bordered"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full mb-4 btn btn-primary">
            Register
          </button>
        </form>

        <p className="mb-4 text-white">or</p>

        <button
          onClick={handleGoogleRegister}
          className="flex items-center justify-center w-full gap-2 text-black bg-white border btn hover:bg-gray-100"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="G"
            width="20"
          />
          Sign up with Google
        </button>

        <div className="mt-6">
          <p className="text-white">
            Already have an account?{" "}
            <NavLink to="/login" className="underline hover:text-gray-300">
              Login Here
            </NavLink>
          </p>
          <NavLink
            to="/"
            className="inline-flex items-center gap-2 mt-4 text-white underline transition hover:text-gray-300"
          >
            <FaHome />
            Return to Homepage
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
