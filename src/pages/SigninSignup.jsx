import React, { useState } from "react";
import { auth, googleProvider } from "../firebase/firebase.config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate, NavLink } from "react-router-dom";
import bgsignin from "../assets/images/bgsignin.jpg";
import bgsignup from "../assets/images/bgsingup.jpg";
import { Typewriter } from "react-simple-typewriter";
import { FaHome } from "react-icons/fa";
const SigninSignup = () => {
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
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sign Up Banner */}
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
          <h2 className="text-4xl font-extrabold mb-4">Hey, Buddy</h2>
          <p className="mb-6">
            <Typewriter
              words={[
                "Join the fun!",
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
          <NavLink
            to="/signup"
            className="bg-white text-black font-semibold py-2 px-6 rounded-full shadow hover:bg-gray-200 transition"
          >
            Go to Sign Up
          </NavLink>
        </div>
      </div>

      {/* Sign In */}
      <div
        className="w-full md:w-1/2 flex items-center justify-center p-6 relative"
        style={{
          backgroundImage: `url(${bgsignin})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-sm p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            Welcome Back!
          </h2>
          <p className="text-center text-indigo-200 mb-4 font-semibold">
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
              className="input input-bordered w-full mb-4"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="input input-bordered w-full mb-6"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary w-full mb-4">
              Login
            </button>
          </form>

          <p className="text-center text-white mb-4">or</p>
          <button
            onClick={handleGoogleLogin}
            className="btn bg-white text-black w-full flex items-center justify-center gap-2 border hover:bg-gray-100"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="G"
              width="20"
            />
            Sign in with Google
          </button>

          <div className="text-center mt-6">
            <NavLink
              to="/"
              className="inline-flex items-center gap-2 text-white underline hover:text-gray-300 transition"
            >
              <FaHome />
              Return to Homepage
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninSignup;
