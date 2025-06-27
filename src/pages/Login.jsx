import React, { useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase/firebase.config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate, NavLink } from "react-router-dom";
import bgsignin from "../assets/images/bgsignin.jpg";
import { Typewriter } from "react-simple-typewriter";
import { FaHome } from "react-icons/fa";


const Login = () => {
  useEffect(()=>{
    document.title="Log In || Hobby Hood";
  },[]);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire("Success", "Logged in successfully!", "success");
      navigate("/");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      Swal.fire("Success", "Google Sign-In successful!", "success");
      navigate("/");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen p-6"
      style={{
        backgroundImage: `url(${bgsignin})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-sm rounded-xl">
        <h2 className="mb-6 text-3xl font-bold text-center text-white">
          Welcome Back!
        </h2>
        <p className="mb-4 font-semibold text-center text-indigo-200">
          <Typewriter
            words={[
              "Log in to continue exploring.",
              "Your hobbies await!",
              "Start where you left off.",
            ]}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={1800}
          />
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="w-full mb-4 input input-bordered"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full mb-6 input input-bordered"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full mb-4 btn btn-primary">
            Login
          </button>
        </form>

        <p className="mb-4 text-center text-white">or</p>
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full gap-2 text-black bg-white border btn hover:bg-gray-100"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="G"
            width="20"
          />
          Sign in with Google
        </button>

        <div className="mt-6 text-center">
          <p className="text-white">
            Don't have an account?{" "}
            <NavLink to="/register" className="underline hover:text-gray-300">
              Register Here
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

export default Login;
